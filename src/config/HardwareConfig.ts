import ConfigInterface from './ConfigInterface';

class HardwareConfig {
    private capacities: ConfigInterface = {
        micro: 25,
        small: 50,
        medium: 100,
        large: 200,
        xlarge: 400
    };

    private researchMultipliers: ConfigInterface = {
        micro: 3,
        small: 5,
        medium: 7,
        large: 10,
        xlarge: 12
    };

    private strengths: ConfigInterface = {
        z: 4,
        y: 3,
        x: 2,
        t: 1
    };

    private _servers: Array<string> = [
        "t0 micro",
        "t1 micro",
        "t2 micro",
        "t3 micro",
        "t4 micro",
        "x1 micro",
        "x2 micro",
        "x3 micro",
        "x4 micro",
        "y1 micro",
        "y2 micro",
        "y3 micro",
        "y4 micro",
        "z1 micro",
        "z2 micro",
        "z3 micro",
        "z4 micro",
        "t1 small",
        "t2 small",
        "t3 small",
        "t4 small",
        "x1 small",
        "x2 small",
        "x3 small",
        "x4 small",
        "y1 small",
        "y2 small",
        "y3 small",
        "y4 small",
        "z1 small",
        "z2 small",
        "z3 small",
        "z4 small",
        "t1 medium",
        "t2 medium",
        "t3 medium",
        "t4 medium",
        "x1 medium",
        "x2 medium",
        "x3 medium",
        "x4 medium",
        "y1 medium",
        "y2 medium",
        "y3 medium",
        "y4 medium",
        "z1 medium",
        "z2 medium",
        "z3 medium",
        "z4 medium",
        "t1 large",
        "t2 large",
        "t3 large",
        "t4 large",
        "x1 large",
        "x2 large",
        "x3 large",
        "x4 large",
        "y1 large",
        "y2 large",
        "y3 large",
        "y4 large",
        "z1 large",
        "z2 large",
        "z3 large",
        "z4 large",
        "t1 xlarge",
        "t2 xlarge",
        "t3 xlarge",
        "t4 xlarge",
        "x1 xlarge",
        "x2 xlarge",
        "x3 xlarge",
        "x4 xlarge",
        "y1 xlarge",
        "y2 xlarge",
        "y3 xlarge",
        "y4 xlarge",
        "z1 xlarge",
        "z2 xlarge",
        "z3 xlarge",
        "z4 xlarge"
    ];

    private _clicksPerSecondMultiplier: number = 8;

    /**
     * @return {Array<string>}
     */
    public get servers(): Array<string> {
        return this._servers;
    }

    public set servers(servers: Array<string>) {
        this._servers = servers;
    }

    /**
     * @return {number}
     */
    public get clicksPerSecondMultiplier(): number {
        return this._clicksPerSecondMultiplier;
    }

    public set clicksPerSecondMultiplier(cps: number) {
        this._clicksPerSecondMultiplier = cps;
    }

    /**
     * @param {string} index
     * @return {number}
     */
    public getStrength(index: string): number {
        return this.strengths[index];
    }

    /**
     * @param {string} index
     * @return {number}
     */
    public getCapacity(index: string) {
        return this.capacities[index];
    }

    /**
     * @param {string} index
     * @return {number}
     */
    public getResearchMultiplier(index: string) {
        return this.researchMultipliers[index];
    }
}

export default new HardwareConfig();