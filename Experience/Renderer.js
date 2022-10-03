import * as THREE from "three";

import Experience from "./Experience";

export default class Renderer{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        //console.log(this.camera,this.camera.perspectiveCamera);

        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize = (this.sizes.width,this.sizes.height,false);
        
        // try to fix this part
        
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

        //this much
    }

    resize(){
        this.renderer.setSize = (this.sizes.width,this.sizes.height,false);
        //this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.renderer.render(this.scene,this.camera.perspectiveCamera)
    }
}