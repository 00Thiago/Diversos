// imports statements
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { fill } from 'three/src/extras/TextureUtils.js';

// variável que carrega o modelo 3D com extensão definida
const modelPath = './dunot.glb';



// função que extrai a extensão do modelo 3D adicionado
function getFileExtension(filePath) {
  return filePath.split('.').pop().toLowerCase();
}

// cria um file path com o .mtl
function obj2mtl(filePath) {
  return filePath.substring(0, filePath.lastIndexOf('.')) + '.mtl';
}


// funcção que retorna se o modelo 3D oferecido é OBJ ou GLTF/GLB
function checkFileExtension(fileExtension) {
  switch (fileExtension) {
    case 'obj':
      return true;
    case 'glb':
    case 'gltf':
      return false;
    default:
      console.error('Extensão de arquivo não aceita.')
      console.warn('Por favor, insira um arquivo .obj ou .glb/.gltf.')
      return null;
  }
}

// define se o modelo 3D oferecido é OBJ ou GLTF/GLB
const objModel = checkFileExtension(getFileExtension(modelPath))



// cena e câmera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// define o renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// adiciona uma luz ambiente suave para iluminar a cena uniformemente
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Luz suave
scene.add(ambientLight);

// luz direcional para iluminar a cena de forma geral
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Posição que ilumina o objeto
directionalLight.castShadow = true; // Ativar sombras
directionalLight.shadow.bias = 0.01; // Suaviza as sombras
scene.add(directionalLight);

// cria uma luz focada (spotlight) para destacar o objeto
const spotlight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI / 4, 0.5, 1); // Intensa, com um cone de iluminação
spotlight.position.set(0, 5, 0); // Posicionar a luz acima do objeto
spotlight.target.position.set(0, 0, 0); // Direcionar a luz para o objeto
spotlight.castShadow = true; // Sombras da luz focal
scene.add(spotlight);

// luz de preenchimento suave para suavizar as sombras
const fillLight = new THREE.PointLight(0xffffff, 0.5, 100);
fillLight.position.set(-3, -3, -3); // Posicionar na parte inferior para suavizar sombras
scene.add(fillLight);



// ajuste para suavizar as sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ajuste para melhorar a aparência das sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;



// carregador para o modelo 3D
// por padrão, carrega o loader como GLB/GLTF
let loader;
// carrega o modelo de acordo com seu tipo
if (objModel == true) {
  // carrega arquivos OBJ
  loader = new MTLLoader();
  loader.load(obj2mtl(modelPath), function(materials) {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load(modelPath, function (object) {
      scene.add(object);
    }, undefined, function (error) {
      console.error('Erro ao carregar arquivo OBJ:', error);
    });
  }, undefined, function(error) {
    console.error('Erro ao carregar arquivo MTL:', error);
  });


} else if (objModel == false) {
  // carrega arquivos GLB/GLTF
  loader = new GLTFLoader();
  loader.load(modelPath, function(gltf) {
    scene.add(gltf.scene);
  }, undefined, function(error) {
    console.error('Erro ao carregar arquivo GLB/GLTF:', error);
  });
} else {
  // caso objModel == null é porque ocorreu um erro
  console.error('Arquivo inválido ou não suportado.');
}



// função para criar animação da cena
function animate() {
  requestAnimationFrame(animate);
  directionalLight.position.copy(camera.position);
  renderer.render(scene, camera);
}

// executa função de animar
animate();
// ajusta a posição da camera
camera.position.z = 5;

// garante a responsividade da tela caso seja redimensionada
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});



// ajusta definições de camera após uma mudança de posição da câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
