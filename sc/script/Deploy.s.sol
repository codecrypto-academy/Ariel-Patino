// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/DocumentRegistry.sol";

contract DeployScript is Script {
    function run() external {
        // Usar la primera cuenta de Anvil por defecto
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        
        // Obtener la dirección del deployer
        address deployer = vm.addr(deployerPrivateKey);
        console.log("Deploying with account:", deployer);
        console.log("Account balance:", deployer.balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        DocumentRegistry documentRegistry = new DocumentRegistry();
        
        console.log("DocumentRegistry deployed at:", address(documentRegistry));
        
        vm.stopBroadcast();
    }
}
