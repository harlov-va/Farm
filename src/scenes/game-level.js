import { Scene } from "../scene";
import { SpriteSheet } from "../sprite-sheet";
import { Player } from "../player";
import { HudItem } from "../hud-item";
import Mouse from "../mouse";
import { runInThisContext } from "vm";


export class GameLevel extends Scene {
    constructor(game) {
        super(game);
        this.tiles = new SpriteSheet({
            imageName: `tiles`,
            imageWidth: 640,
            imageHeight: 640
        });        
        //рождение всех персонажей и элементов хада
        //специально использую присвоение, чтобы можно было отслеживать общее
        //состояние в control-state
        this.characters = [];
        this.game.control.states.forEach((item) => {
            if (item.type === `character`) {
                const character = new Player(`${item.name}`, item);
                character.x = item.x;
                character.y = item.y;
                character.needAction = this.game.control.play.bind(this.game.control);
                this.characters.push(character);
            } else if (item.type === `object`) {
                const hudItem = new HudItem(`${item.name}`, item);
                hudItem.x = item.x;
                hudItem.y = item.y;                
                this.characters.push(hudItem);
            }
        }); 
        this.characters.sort((prev, next) => prev.constructor.name.charCodeAt(0) - next.constructor.name.charCodeAt(0));

        this.mouse = new Mouse(this.characters,this.game.control);
    }
    init() {
        super.init();
        const mapData = require(`../maps/level1.json`);
        this.map = this.game.screen.createMap(`level1`, mapData, this.tiles)
    }
    update(time) {
        this.characters.forEach((character) => {
            character.update(time);
        });
    }
    render(time) {
        this.update(time);
        this.game.screen.fill(`#000000`);
        this.game.screen.drawSprite(this.map);
        this.characters.forEach((elem) => {
            if (elem instanceof Player) {
                this.game.screen.drawSprite(elem.view);
            } else {
                this.game.screen.drawHud(elem);
            }
        });
        super.render(time);
    }    
}