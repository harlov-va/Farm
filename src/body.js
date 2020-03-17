import { Vector } from "./vector";
import {CharacterSheet} from './character-sheet';
export class Body{
    constructor({imageName, speed}){
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.lastTime = 0;
        this.animations = {};
        
        const animationsSheet = new CharacterSheet({imageName});
        `spell_on_cage,spell_gives_product,stand,birth,action,eat`.split(`,`).forEach((name) => {
            this.animations[name] = animationsSheet.getAnimation(name);
        });
        this.stand();
    }
    stand(){        
        this.view = this.animations[`stand`];
        this.view.stop();
    }
    birth(){
        this.view = this.animations[`birth`];
        this.view.run();
    }
    actionOn(){
        this.view = this.animations[`action`];
        this.view.stop();
    }
    update(time){
        if(this.lastTime === 0){
            this.lastTime = time;
            return;
        }
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x),Math.trunc(this.y));
        this.view.update(time);
    }
}