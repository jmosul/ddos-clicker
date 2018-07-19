import Click from "./Click";

export default class ClickRateCounter {
    private clicks: Array<Click> = [];
    private rotateRate: number;
    private rotateInterval: number = 0;

    public constructor(rotateRate: number = 250) {
        this.rotateRate = rotateRate;

        this.logRotate();
    }

    public registerClick(strength: number) {
        const time = ClickRateCounter.now;

        this.clicks.push(new Click(time, strength));
    }

    public countClicks() {
        const second = ClickRateCounter.now - 1000;

        return this.clicks.reduce((total, click) => {
            total += click.time > second ? click.strength : 0;

            return total;
        }, 0);
    }

    private logRotate() {
        window.clearInterval(this.rotateInterval);

        this.rotateInterval = window.setInterval(() => this.rotateClickLog(), this.rotateRate);
    }

    private rotateClickLog() {
        const now = ClickRateCounter.now - this.rotateRate - 1000;

        this.clicks = this.clicks.filter(click => {
            return click.time > now;
        })
    }

    private static get now(): number {
        return Date.now();
    }
}