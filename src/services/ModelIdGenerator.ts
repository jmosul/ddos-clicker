class ModelIdGenerator {
    private idCounter: number = 0;

    public next(): number {
        return this.idCounter ++;
    }
}

export default new ModelIdGenerator();