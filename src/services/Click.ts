export default class Click {
    private _strength: number = 1;
    private _time: number = 0;

    constructor(time: number, strength: number = 1) {
        this._strength = strength;
        this._time = time;
    }

    public get time(): number {
        return this._time;
    }

    public get strength(): number {
        return this._strength;
    }
}