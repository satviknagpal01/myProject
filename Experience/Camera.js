import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

import Experience from "./Experience";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
            );
        this.perspectiveCamera.position.x = 35.03;
        this.perspectiveCamera.position.y = 12;
        this.perspectiveCamera.position.z = 45;
        this.perspectiveCamera.rotation.x = -0.37197;
        this.perspectiveCamera.rotation.y = 0.3378;
        this.perspectiveCamera.rotation.z = 0.12858;
        this.scene.add(this.perspectiveCamera);
    }
    createOrthographicCamera(){
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum,
            -100,
            100
            );
        this.scene.add(this.orthographicCamera);

        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;
        const gridhelper = new THREE.GridHelper(size,divisions);
        this.scene.add(gridhelper);
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize(){
        //Updating perspective Camera
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        
        //Updating orthograohic Camera
        this.orthographicCamera.left= (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right= (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top=this.sizes.frustrum/2 ;
        this.orthographicCamera.bottom= -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}