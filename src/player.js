import { Body } from "./body";

export class Player extends Body {
    constructor(imageName, state) {
        super({ imageName, speed: 50 });
        this.state = state;
        this.startTime = -1;
        this.changeTime = true;
    }
    update(time) {
        if (this.state.behavior[this.state.counter] === `birth`) {
            this.birth();
            if (this.changeTime) {
                this.startTime = time / 1000;
                this.changeTime = false;
            }
        } else if (this.state.behavior[this.state.counter] === `actionOn`) {
            this.actionOn();
        } else {
            this.stand();
        }
        if (this.startTime > 0 && (time / 1000) >= (this.startTime + this.state.birthTime)) {
            this.startTime = -1;
            this.changeTime = true;
            this.needAction(this.state, `needAction`);
        }
        super.update(time);
    }
    needAction() { }
}