import * as THREE from "three";
import gsap from "gsap";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 안티알리아싱
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각 (field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1,
    1000,
  );
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

  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  let time = Date.now();

  // 그리기
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw); // requestAnimationFrame 와 같은 동작을 하는 ThreeJS 빌트인 함수
  }

  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
    z: 3,
  });

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
