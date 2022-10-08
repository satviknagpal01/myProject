import * as THREE from "three";

import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.setModel();
    }

    setModel(){
        this.actualRoom.castShadow = true;
        this.actualRoom.receiveShadow = true;

        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            //console.log(child);
        });


        this.scene.add(this.actualRoom);

        //console.log(this.actualRoom.position);
    }


    resize(){
    }

    update() {}
}