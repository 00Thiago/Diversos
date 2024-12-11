# REPOSITÓRIO DE MODELOS 3D: ACERVO DO MUSEU GILBERTO GERLACH

## Objetivo
Criar e armazenar modelos 3D do acervo histórico do museu para acesso via o site oficial.

---

## Processos

1. **Observação e captura:**
   - Captura de imagens dos objetos do acervo em diferentes ângulos.

2. **Geração do modelo:**
   - Processamento das imagens utilizando o software **Meshroom** para gerar o modelo 3D inicial.

3. **Refinamento:**
   - Redução de polígonos e refinamento do modelo com o software **Blender**.
   - Garantir que o ponto de perspectiva do modelo esteja centralizado para uma experiência de rotação mais satisfatória no visualizador web.

4. **Carregamento no visualizador:**
   - Conversão do modelo para os formatos `.obj` ou `.glb/.gltf` e carregamento no visualizador web usando **Three.js**.

---

## Webviewer Three.js: Passo a Passo

### 1. Instalar Node.js
- Faça o download e instale o [Node.js](https://nodejs.org/).
- Isso permitirá o uso do gerenciador de pacotes `npm`, necessário para instalar dependências.

### 2. Instalar dependências no terminal
- Execute os comandos abaixo para instalar os requisitos:
```bash
npm install --save three
npm install --save-dev vite
```
- Com tudo instalado e os arquivos `.html` e `.js`, você pode abrir o servidor com o Vite da seguinte forma:
```bash
npx vite
```
- O Vite deve retornar algo semelhante a isso:
```bash
  VITE v6.0.3  ready in 289 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3. Criar o arquivo HTML (`index.html`)
Inclua o seguinte conteúdo dentro da tag `<head>` do arquivo:
```html
<style>body { margin: 0; }</style>
<script type="module" src="/main.js" defer></script>
```

### 4. Criar o arquivo JavaScript (`main.js`)
Adicione os imports necessários para carregar os modelos e configurar a cena:
```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
```

### 5. Estrutura básica de uma cena
Um exemplo de código para criar uma cena simples será adicionado futuramente neste repositório.

---

Contribuições são bem-vindas! Por favor, crie um *pull request* com melhorias ou sugestões.
