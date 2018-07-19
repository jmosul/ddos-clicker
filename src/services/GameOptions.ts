import Options from '@/services/Options';
import {Money, Currencies, Currency} from 'ts-money';

export default class GameOptions extends Options {
    public resourceRate: Money = new Money(10, Currencies.GBP);
    public updateRate: number = 250;
    public startingResources: Money = new Money(100, Currencies.GBP);
    public startingResearch: Money = new Money(0, Currencies.GBP);
    private resourceCurrency: Currency = Currencies.GBP;

    constructor() {
        super();
    }


    public set currency(currency: Currency) {
        this.resourceCurrency = currency;

        this.resourceRate = Money.fromDecimal(this.resourceRate.toString(), currency);
        this.startingResources = Money.fromDecimal(this.startingResources.toString(), currency);

    }



}