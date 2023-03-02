import { Stuff } from "./Stuff";
import { cm1, geo, mat } from "./common";
import { AnimationMixer, Mesh, BoxGeometry, MeshBasicMaterial } from "three";

export class Player extends Stuff {
  constructor(info) {
    super(info);

    this.width = 0.5;
    this.height = 0.5;
    this.depth = 0.5;

    cm1.gltfLoader.load("/models/ilbuni.glb", (glb) => {
      // shadow
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.set(this.x, this.y, this.z);
      this.modelMesh.rotation.set(
        this.rotationX,
        this.rotationY,
        this.rotationZ,
      );
      this.modelMesh.castShadow = true;
      cm1.scene.add(this.modelMesh);

      this.modelMesh.animations = glb.animations;
      cm1.mixer = new AnimationMixer(this.modelMesh);
      this.actions = [];
      // default
      this.actions[0] = cm1.mixer.clipAction(this.modelMesh.animations[0]);
      // fall
      this.actions[1] = cm1.mixer.clipAction(this.modelMesh.animations[1]);
      // jump
      this.actions[2] = cm1.mixer.clipAction(this.modelMesh.animations[2]);
      this.actions[2].repetitions = 1; // 애니메이션 반복 횟수

      this.actions[0].play();

      this.setCannonBody();
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    cm1.scene.add(this.mesh);
  }
}
