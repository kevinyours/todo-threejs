import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: MeshMatcapMaterial

/**
 * Vertex: 점
 * Edge: 선
 * Face: 면
 */

export default function example() {
  // 텍스처 이미지 로드
  const loadingManage = new THREE.LoadingManager();
  loadingManage.onStart = () => {
    console.log("로드 시작");
  };
  loadingManage.onProgress = (img) => {
    console.log(img + " 로드");
  };
  loadingManage.onLoad = () => {
    console.log("로드 완료");
  };
  loadingManage.onError = () => {
    console.log("에러");
  };

  const textureLoader = new THREE.TextureLoader();
  const matcapTex = textureLoader.load("/textures/matcap/bokeh.png");

  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.set(1, 1, 2);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  // const geometry = new THREE.BoxGeometry(2, 2, 2);
  const geometry = new THREE.ConeGeometry(1, 2, 128);
  // const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTex,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  function draw() {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
