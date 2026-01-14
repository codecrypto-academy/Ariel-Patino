'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { ethers } from 'ethers'

// RPC URL for local Anvil (derived wallets are computed inside the provider)
const RPC_URL = 'http://localhost:8545'

interface MetaMaskContextType {
  account: string | null
  isConnected: boolean
  isConnecting: boolean
  provider: ethers.JsonRpcProvider | null
  error: string | null
  connect: (walletIndex?: number) => Promise<void>
  disconnect: () => void
  signMessage: (message: string) => Promise<string>
  getSigner: () => Promise<ethers.Wallet>
  switchWallet: (walletIndex: number) => Promise<void>
  currentWalletIndex: number
  availableWallets: Array<{ index: number; address: string }>
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined)

export function MetaMaskProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0)

  // Debug logging for state changes
  useEffect(() => {
    console.log('🔄 MetaMask Context state changed:', {
      account,
      isConnected,
      isConnecting,
      hasProvider: !!provider,
      error,
      currentWalletIndex
    })
  }, [account, isConnected, isConnecting, provider, error, currentWalletIndex])

  useEffect(() => {
    // Initialize provider for local Anvil
    const jsonRpcProvider = new ethers.JsonRpcProvider(RPC_URL)
    setProvider(jsonRpcProvider)
    console.log('🌐 Provider initialized:', RPC_URL)
  }, [])

  // Derive Anvil wallets on client at mount (avoid top-level side-effects)
  const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC || ''
  const anvilWallets = useMemo(() => {
    if (!MNEMONIC) return []
    try {
      return Array.from({ length: 20 }, (_, i) => {
        const path = `m/44'/60'/0'/0/${i}`
        const wallet = ethers.HDNodeWallet.fromPhrase(MNEMONIC, undefined, path)
        return { address: wallet.address, privateKey: wallet.privateKey, index: i }
      })
    } catch (err) {
      console.error('Error deriving anvil wallets', err)
      return []
    }
  }, [MNEMONIC])

  useEffect(() => {
    console.log('MM provider mounted')
  }, [])

  const connect = async (walletIndex: number = 0) => {
    console.log('🔌 MetaMask Context connect called with walletIndex:', walletIndex)
    
    try {
      setIsConnecting(true)
      setError(null)
      
      if (walletIndex < 0 || walletIndex >= anvilWallets.length) {
        throw new Error('Invalid wallet index')
      }

      const wallet = anvilWallets[walletIndex]
      console.log('📝 Wallet data:', { address: wallet.address, index: walletIndex })
      
      const jsonRpcProvider = new ethers.JsonRpcProvider(RPC_URL)
      
      console.log('🔧 Provider created')
      
      // Update all states - React will batch these updates
      setCurrentWalletIndex(walletIndex)
      setAccount(wallet.address)
      setProvider(jsonRpcProvider)
      setIsConnected(true)
      setIsConnecting(false)
      
      console.log(`✅ Connected to Anvil wallet ${walletIndex}: ${wallet.address}`)
      console.log('📊 Expected state:', {
        account: wallet.address,
        isConnected: true,
        walletIndex
      })
    } catch (error: any) {
      console.error('❌ Connection error:', error)
      setError(error.message || 'Failed to connect to Anvil wallet')
      setIsConnecting(false)
      setIsConnected(false)
      setAccount(null)
    }
  }

  const disconnect = () => {
    console.log('🔌 Disconnecting wallet')
    setAccount(null)
    setIsConnected(false)
    setError(null)
  }

  const switchWallet = async (walletIndex: number) => {
    console.log('🔄 Switching to wallet:', walletIndex)
    await connect(walletIndex)
  }

  const signMessage = async (message: string) => {
    console.log('✍️ signMessage called:', { 
      account, 
      isConnected,
      currentWalletIndex,
      message: message.substring(0, 50) + '...'
    })
    
    if (!account || !isConnected) {
      console.error('❌ Cannot sign - not connected:', { 
        account,
        isConnected,
        currentWalletIndex
      })
      throw new Error('Not connected to wallet')
    }

    try {
      console.log('🔧 Creating signer from wallet data...')
      // Create signer dynamically to avoid React state timing issues
      const wallet = anvilWallets[currentWalletIndex]
      const jsonRpcProvider = new ethers.JsonRpcProvider(RPC_URL)
      const walletSigner = new ethers.Wallet(wallet.privateKey, jsonRpcProvider)
      
      console.log('📝 Calling signer.signMessage...')
      const signature = await walletSigner.signMessage(message)
      console.log('✅ Signature generated successfully:', signature.substring(0, 20) + '...')
      return signature
    } catch (error: any) {
      console.error('❌ Error in signMessage:', error)
      throw new Error(error.message || 'Failed to sign message')
    }
  }

  const getSigner = async () => {
    if (!account || !isConnected) {
      throw new Error('Not connected to wallet')
    }
    // Create signer dynamically to avoid React state timing issues
    const wallet = anvilWallets[currentWalletIndex]
    const jsonRpcProvider = new ethers.JsonRpcProvider(RPC_URL)
    const walletSigner = new ethers.Wallet(wallet.privateKey, jsonRpcProvider)
    return walletSigner
  }

  const value: MetaMaskContextType = {
    account,
    isConnected,
    isConnecting,
    provider,
    error,
    connect,
    disconnect,
    signMessage,
    getSigner,
    switchWallet,
    currentWalletIndex,
    availableWallets: anvilWallets.map((w, i) => ({
      index: i,
      address: w.address
    }))
  }

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export function useMetaMask() {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider')
  }
  return context
}

