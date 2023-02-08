import * as THREE from "three";

// ---- 주제: Fog (안개)

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 안티알리아싱
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("blue", 3, 7);

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1,
    1000,
  );
  // camera.position.x = 2;
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1); // 직육면체
  const meterial = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const meshes = [];
  let mesh;

  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  let time = Date.now();

  // 그리기
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw); // requestAnimationFrame 와 같은 동작을 하는 ThreeJS 빌트인 함수
  }

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
