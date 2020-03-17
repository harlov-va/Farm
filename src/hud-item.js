import { Body } from "./body";

export class HudItem extends Body {
    constructor(imageName, state) {
        super({ imageName, speed: 50 });
        this.state = state;
        this.text = `x ${this.state.value}`;
        this.color = this.state.normal ? this.state.normalColor : this.state.dangerColor,        
        this.textX = this.state.textX;
        this.textY = this.state.textY;
    }
    update(time) {
        this.text = `x ${this.state.value}`;
        this.color = this.state.normal ? this.state.normalColor : this.state.dangerColor,        
        this.textX = this.state.textX;
        this.textY = this.state.textY;
        this.stand();
        super.update(time);
    }
    needAction() { }
}