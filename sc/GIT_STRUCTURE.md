# Estructura de Archivos para Git - Smart Contracts

## ✅ Archivos que SÍ se suben al repositorio

### 📝 Código Fuente
```
sc/
├── src/
│   └── DocumentRegistry.sol          ✅ Contrato principal
├── script/
│   └── Deploy.s.sol                  ✅ Script de despliegue
├── test/
│   └── DocumentRegistry.t.sol        ✅ Tests del contrato
```

### ⚙️ Configuración
```
sc/
├── foundry.toml                      ✅ Configuración de Foundry
├── foundry.lock                      ✅ Lock file de dependencias
├── Makefile                          ✅ Comandos útiles
├── README.md                         ✅ Documentación
└── .gitignore                        ✅ Configuración de git
```

---

## ❌ Archivos que NO se suben (en .gitignore)

### 🔨 Archivos Compilados
```
cache/                                ❌ Cache de compilación
out/                                  ❌ Archivos compilados (ABI, bytecode)
```

### 📡 Logs de Despliegue
```
broadcast/                            ❌ Logs de despliegues
```

### 📦 Dependencias
```
lib/                                  ❌ Dependencias de Foundry
├── forge-std/                        (se instala con: forge install)
└── openzeppelin-contracts/           (se instala con: forge install)
```

### 🔐 Archivos Sensibles
```
.env                                  ❌ Variables de entorno (claves privadas)
```

### 🗑️ Otros
```
docs/                                 ❌ Documentación generada
coverage/                             ❌ Reportes de cobertura
node_modules/                         ❌ Dependencias npm (si se usan)
*.log                                 ❌ Archivos de log
.DS_Store                             ❌ Archivos de macOS
```

---

## 🔄 Cómo clonar y configurar el proyecto

### 1. Clonar el repositorio
```bash
git clone <repo-url>
cd 20_eth_database_document/sc
```

### 2. Instalar dependencias de Foundry
```bash
# Opción A: Instalar automáticamente (recomendado)
forge install

# Opción B: Instalar manualmente
forge install foundry-rs/forge-std
forge install OpenZeppelin/openzeppelin-contracts
```

### 3. Compilar
```bash
forge build
```

### 4. Ejecutar tests
```bash
forge test
```

### 5. Desplegar (local)
```bash
# Iniciar Anvil en otra terminal
anvil

# Desplegar
forge script script/Deploy.s.sol \
  --rpc-url http://localhost:8545 \
  --broadcast \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

---

## 📊 Tamaño del Repositorio

```
✅ Con .gitignore correcto:
   - Archivos fuente: ~10 KB
   - Total subido: ~50 KB

❌ Sin .gitignore (NO hacer esto):
   - out/: ~2 MB
   - cache/: ~500 KB
   - lib/: ~50 MB
   - Total: ~52 MB (100x más grande!)
```

---

## ⚠️ Importante

- **NUNCA** subas la carpeta `lib/` - es muy pesada (~50 MB)
- **NUNCA** subas archivos `.env` con claves privadas reales
- **SIEMPRE** regenera `out/` y `cache/` con `forge build`
- **Las dependencias** se instalan automáticamente con `forge install`

---

## 🔍 Verificar qué se subirá

```bash
# Ver archivos trackeados
git ls-files sc/

# Ver archivos ignorados
git status --ignored sc/

# Ver tamaño del repositorio
git count-objects -vH
```

