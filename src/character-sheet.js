import { SpriteSheet } from "./sprite-sheet";
import {WIDTH_ANIMATION, HEIGHT_ANMATION} from './constants';
const WIDTH_OLD = 832;
const HEIGHT_OLD = 1344;


export class CharacterSheet extends SpriteSheet{
    constructor({imageName}){
        super({
            imageName,
            imageWidth: WIDTH_ANIMATION,
            imageHeight: HEIGHT_ANMATION
        });
        this.sequences = this.getSequences();
    }
    getSequences(){
        const data = require(`./maps/animations.json`);
        const sequences  = {};
        data.layers.forEach((layer) => {
            sequences[layer.name] = layer.data.filter((i) => i>0);
        });
        return sequences;
    };
    getAnimation(name, speed = 100, repeat = true, autorun = true){
        return super.getAnimation(this.sequences[name],speed, repeat, autorun);
    }
}