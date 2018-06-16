export default class MarketGroup {
    constructor(row) {
        this.name = row.marketGroupName;
        this.id = row.marketGroupID;
        this.parent = row.parentGroupID;
        this.desc = row.description;
        this.hasTypes = row.hasTypes;
        this.hasChildren = row.hasChildren;
        this.isGroup = true;
    }
}