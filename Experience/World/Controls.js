import * as THREE from "three";

import Experience from "../Experience";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;


        this.progress =0;
        this.dummyVector = new THREE.Vector3(0,0,0);
        this.setPath();
    }

    setPath(){
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ]);
        


        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    resize(){
    }

    update() {
        this.curve.getPointAt(this.progress % 1,this.dummyVector);
        this.progress+=0.001;
        console.log(this.progress);
        this.camera.orthographicCamera.position.copy(this.dummyVector);
    }
}