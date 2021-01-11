import { Scene } from '../scene';
import { GAME_WIDTH, GAME_HEIGTH } from '../constants';
export class Menu extends Scene{
    constructor(game){
        super(game);
    }
    init(){
        super.init();
    }
    update(time){
        if(this.game.control.fire){
            this.finish(Scene.START_GAME);
        }
    }
    render(time){
        this.update(time)
        this.game.screen.drawImage(0,0,`title`);
        this.game.screen.print(200, GAME_HEIGTH*2/3, `#FFFFFF`,`KOMIKAX_cyr`, `Press space`);
        super.render(time);
    }
}