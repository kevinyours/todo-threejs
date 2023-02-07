import * as THREE from "three";

// ----- 주제: 기본 장면

export default function example() {
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각
  //   window.innerWidth / window.innerHeight, // 종횡비(aspect)
  //   0.1, // near
  //   1000, // far
  // );
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;

  // Orthographic Camera: 직교 카메라
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1,
    1000,
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();
  scene.add(camera);

  // Mesh: geometry + material
  // geometry: 모양
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 직육면체
  // material: 재질
  const meterial = new THREE.MeshBasicMaterial({
    color: 0xff0000, // red
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);
}
