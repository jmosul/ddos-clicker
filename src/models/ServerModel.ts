import Model from './Model';
import UpgradeModel from '@/models/UpgradeModel';
import ServerMode from '@/types/ServerMode';

export default class ServerModel extends Model {
    public name: string;
    public mode: ServerMode = ServerMode.Receive;
    private _upgrades: Array<UpgradeModel> = [];

    public constructor(id: number, name: string) {
        super(id);

        this.name = name;
    }

    /**
     * @return {number}
     */
    public get strength(): number {
        return super.strength + this._upgrades.reduce((value, upgrade) => value + upgrade.strength, 0);
    }

    /**
     * @return {number}
     */
    public get requestsPerSecond(): number {
        return super.requestsPerSecond + this._upgrades.reduce((value, upgrade) => value + upgrade.requestsPerSecond, 0);
    }

    /**
     * @return {number}
     */
    public get capacity(): number {
        return super.capacity + this._upgrades.reduce((value, upgrade) => value + upgrade.capacity, 0);
    }

    /**
     * @return {number}
     */
    public get researchCost(): number {
        return super.researchCost + this._upgrades.reduce((value, upgrade) => value + upgrade.researchCost, 0);
    }

    /**
     * @return {number}
     */
    public get price(): number {
        return (this.researchCost * this.strength) + (this.requestsPerSecond * this.strength);
    }

    /**
     * @param {UpgradeModel} upgrade
     */
    public addUpgrade(upgrade: UpgradeModel) {
        this._upgrades.push(upgrade);
    }

    /**
     * @param {number} id
     */
    public removeUpgrade(id: number) {
        this._upgrades = this._upgrades.filter(upgrade => upgrade.id !== id);
    }

    /**
     * @param {number} value
     */
    public set strength(value: number) {
        super.strength = value;
    }

    /**
     * @param {number} value
     */
    public set capacity(value: number) {
        super.capacity = value;
    }

    /**
     * @param {number} value
     */
    public set requestsPerSecond(value: number) {
        super.requestsPerSecond = value;
    }

    /**
     * @param {number} value
     */
    public set researchCost(value: number) {
        super.researchCost = value;
    }
}