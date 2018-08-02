export default class Model {
    protected _id: number;
    protected _strength: number = 0;
    protected _requestsPerSecond: number = 0;
    protected _capacity: number = 0;
    protected _researchCost: number = 0;

    /**
     * @param {number} id
     */
    constructor(id: number) {
        this._id = id;
    }

    /**
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * @return {number}
     */
    public get strength(): number {
        return this._strength;
    }

    /**
     * @param {number} value
     */
    public set strength(value: number) {
        this._strength = value;
    }

    /**
     * @return {number}
     */
    public get requestsPerSecond(): number {
        return this._requestsPerSecond;
    }

    /**
     * @param {number} value
     */
    public set requestsPerSecond(value: number) {
        this._requestsPerSecond = value;
    }

    /**
     * @return {number}
     */
    public get capacity(): number {
        return this._capacity;
    }

    /**
     * @param {number} value
     */
    public set capacity(value: number) {
        this._capacity = value;
    }

    /**
     * @return {number}
     */
    public get researchCost(): number {
        return this._researchCost;
    }

    /**
     * @param {number} value
     */
    public set researchCost(value: number) {
        this._researchCost = value;
    }
}