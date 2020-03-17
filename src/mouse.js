import { WORKING_WIDTH, WORKING_HEIGTH, MENU_HEIGTH, SPRITE_WIDTH, SPRITE_HEIGTH } from "./constants";
export default class Mouse{
    constructor(characters, control){
        this.characters = characters;
        this.control = control;
        this.clickHandler = this.onClick.bind(this);
        this.mouseMoveHandler = this.onMouseMove.bind(this);
        this.mouseUpHandler = this.onMouseUp.bind(this);
        window.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.findedCharacter = null;
        this.startCoords = { x: 0, y: 0 };
        this.beginCoords = { x: 0, y: 0 };
        this.dragged = false;
    }
    //работа с мышью и реакцией на нажатие
    onMouseDown(evt) {
        evt.preventDefault();
        this.dragged = false;
        this.startCoords = {
            x: evt.clientX,
            y: evt.clientY
        }
        window.addEventListener('mousemove', this.mouseMoveHandler);
        window.addEventListener('mouseup', this.mouseUpHandler);
    }
    onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        this.dragged = true;

        if (!this.findedCharacter) {
            for (let item of this.characters) {
                if (!item.state.draggable) continue;
                if ((item.view.x <= moveEvt.clientX && (item.view.x + item.view.width) >= moveEvt.clientX) &&
                    (item.view.y <= moveEvt.clientY && (item.view.y + item.view.height) >= moveEvt.clientY)) {
                    this.findedCharacter = item;
                    this.beginCoords = {
                        x: this.findedCharacter.x,
                        y: this.findedCharacter.y
                    }
                    break;
                }
            }
        } else {
            const indentX = this.findedCharacter.x + SPRITE_WIDTH - moveEvt.clientX;
            const indentY = this.findedCharacter.y + SPRITE_HEIGTH - moveEvt.clientY;
            if ((moveEvt.clientX >= indentX && moveEvt.clientX <= WORKING_WIDTH - (indentX)) &&
                (moveEvt.clientY >= indentY && moveEvt.clientY <= WORKING_HEIGTH - (indentY))) {
                let shift = {
                    x: this.startCoords.x - moveEvt.clientX,
                    y: this.startCoords.y - moveEvt.clientY
                };
                this.startCoords = {
                    x: moveEvt.clientX,
                    y: moveEvt.clientY
                };
                let newCoords = {
                    x: this.findedCharacter.x - shift.x,
                    y: this.findedCharacter.y - shift.y
                };
                this.findedCharacter.x = newCoords.x
                this.findedCharacter.y = newCoords.y
            }

        }
    };
    toPreviousPlace() {
        this.findedCharacter.x = this.beginCoords.x;
        this.findedCharacter.y = this.beginCoords.y;
        this.findedCharacter.state.draggable = true;
    }
    onMouseUp(upEvt) {
        if (this.findedCharacter) {
            if (upEvt.clientY > MENU_HEIGTH) {
                this.toPreviousPlace();
            }
            if (upEvt.clientX < WORKING_WIDTH && upEvt.clientY < MENU_HEIGTH) {
                this.findedCharacter.x = (Math.trunc(upEvt.clientX / SPRITE_WIDTH)) * SPRITE_WIDTH;
                this.findedCharacter.y = (Math.trunc(upEvt.clientY / SPRITE_HEIGTH)) * SPRITE_HEIGTH;
                this.findedCharacter.state.draggable = false;
                for (let item of this.characters) {
                    if (item == this.findedCharacter) continue;
                    if ((item.view.x <= this.findedCharacter.x && (item.view.x + item.view.width) >= this.findedCharacter.x) &&
                        (item.view.y <= this.findedCharacter.y && (item.view.y + item.view.height) >= this.findedCharacter.y)) {
                        this.toPreviousPlace();
                        break;
                    }
                }
                //и в логику игры
                if (!this.findedCharacter.state.draggable) this.control.play(this.findedCharacter.state, `mouseup`);
            }
        }
        if (!this.dragged) {
            window.addEventListener('click', this.clickHandler);
        }
        this.findedCharacter = null;
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        window.removeEventListener('mouseup', this.mouseUpHandler);
    };
    onClick(evt) {
        evt.preventDefault();
        for (let item of this.characters) {
            if ((item.view.x <= evt.clientX && (item.view.x + item.view.width) >= evt.clientX) &&
                (item.view.y <= evt.clientY && (item.view.y + item.view.height) >= evt.clientY)) {
                //и в логику игры
                this.control.play(item.state, `click`);
                break;
            }
        }
        window.removeEventListener(`click`, this.clickHandler);
    }
}