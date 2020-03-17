export class ControlState {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.fire = false;
        this.amountCharacters = new Map([
            [`wheat`, `amountWheat`], [`cow`, `amountCows`], [`chicken`, `amountChickens`]
        ]);
        this.charactersHud = new Map([
            [`wheat`, `amountFeed`], [`cow`, `amountMilk`], [`chicken`, `amountEggs`]
        ]);
        this.keyMap = new Map([
            [37, `left`], [39, `right`], [38, `up`], [40, `down`], [32, `fire`]
        ])
        document.addEventListener(`keydown`, (event) => this.update(event, true));
        document.addEventListener(`keyup`, (event) => this.update(event, false));
        //общее состояние игры
        this.states = [
            {
                name: `wheat`,
                type: `character`,
                x: 64,
                y: 512,
                draggable: true,
                birthTime: 10,
                repeat: -1,
                counter: 0,
                behavior: [`stand`, `birth`, `actionOn`]
            },
            {
                name: `wheat`,
                type: `character`,
                x: 64,
                y: 512,
                draggable: true,
                birthTime: 10,
                repeat: -1,
                counter: 0,
                behavior: [`stand`, `birth`, `actionOn`]
            },
            {
                name: `cow`,
                type: `character`,
                x: 192,
                y: 512,
                draggable: true,
                birthTime: 20,
                repeat: 1,
                counter: 0,
                behavior: [`stand`, `birth`, `stand`]
            },
            {
                name: `chicken`,
                type: `character`,
                x: 320,
                y: 512,
                draggable: true,
                birthTime: 10,
                repeat: 3,
                counter: 0,
                behavior: [`stand`, `birth`, `stand`]
            },
            {
                name: `amountWheat`,
                type: `object`,
                value: 2,
                textX: 128,
                textY: 556,
                normal: true,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 64,
                y: 512,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            },
            {
                name: `amountCows`,
                type: `object`,
                value: 1,
                textX: 252,
                textY: 556,
                normal: true,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 192,
                y: 512,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            },
            {
                name: `amountChickens`,
                type: `object`,
                value: 1,
                textX: 380,
                textY: 556,
                normal: true,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 320,
                y: 512,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            },
            {
                name: `amountCoins`,
                type: `object`,
                value: 0,
                textX: 576,
                textY: 108,
                normal: false,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 512,
                y: 64,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            },
            {
                name: `amountEggs`,
                type: `object`,
                value: 0,
                textX: 576,
                textY: 236,
                startX: 512,
                startY: 192,
                normal: false,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 512,
                y: 192,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            },
            {
                name: `amountMilk`,
                type: `object`,
                value: 0,
                textX: 576,
                textY: 364,
                startX: 512,
                startY: 320,
                normal: false,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 512,
                y: 320,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            },
            {
                name: `amountFeed`,
                type: `object`,
                value: 0,
                textX: 576,
                textY: 492,
                normal: false,
                normalColor: `#0000FF`,
                dangerColor: `#FF0000`,
                x: 512,
                y: 448,
                draggable: false,
                counter: 0,
                behavior: [`stand`]
            }
        ]
    }
    update(event, pressed) {
        if (this.keyMap.has(event.keyCode)) {
            event.preventDefault();
            event.stopPropagation();
            this[this.keyMap.get(event.keyCode)] = pressed;

        }
    }
    //логика игры
    _changeState(state) {
        if (state.counter === (state.behavior.length - 1)) {
            state.counter = 1;
        } else {
            state.counter++;
        }
    }
    _changeHud(name, value) {
        for (let item of this.states) {
            if (item.name === name) {
                item.value += value;
                item.normal = item.value === 0 ? false : true;
                break;
            }
        }
    }
    _getFeed() {
        for (let item of this.states) {
            if (item.name === `amountFeed`) {
                return item;
            }
        }
    }
    //Механика игры
    play(state, eventOccurred) {
        if (eventOccurred === `needAction`) {
            if (state.name === `wheat`) {
                this._changeState(state);
            } else {
                state.repeat--;
                this._changeHud(this.charactersHud.get(state.name), 1);
                if (state.repeat === 0) {
                    this._changeState(state);
                    if (state.name === `cow`) {
                        state.repeat = 1;
                    } else {
                        state.repeat = 3;
                    }
                }
            }
        } else if (eventOccurred === `mouseup`) {
            this._changeHud(this.amountCharacters.get(state.name), -1)
            if (state.name === `wheat`) this._changeState(state);
        } else if (eventOccurred === `click`) {
            const feed = this._getFeed();
            if (state.name === `wheat` && state.behavior[state.counter] === `actionOn`) {
                this._changeHud(`amountFeed`, 1);
                this._changeState(state);
                return;
            } 
            if ((state.name === `cow` || state.name === `chicken`) && feed.value > 0 && state.behavior[state.counter] === `stand`) {
                this._changeHud(`amountFeed`, -1);
                this._changeState(state);
                return;
            } 
            if (state.name === `amountMilk`) {
                if (state.value > 0) {
                    this._changeHud(`amountCoins`, 2 * state.value);
                    this._changeHud(`amountMilk`, -state.value);
                }
                return;
            } 
            if (state.name === `amountEggs`) {
                if (state.value > 0) {
                    this._changeHud(`amountCoins`, state.value);
                    this._changeHud(`amountEggs`, -state.value);
                }
                return;
            }
        }

    }
}