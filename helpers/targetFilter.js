export class TargetFilter {
    constructor(property, targetValue) {
        this.property = property;
        this.targetValue = targetValue;
    }

    filterData(data) {
        return data.filter((e) => e[this.property] === this.targetValue);
    }
}
