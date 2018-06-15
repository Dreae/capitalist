import { getTypeIcon } from '../EveImageServer';

export default class InvType {
    constructor(row) {
        this.id = row.typeID;
        this.groupId = row.groupID;
        this.name = row.typeName;
        this.desc = row.description;
        this.published = row.published;
        this.faction = row.faction === 1;
        this.deadspace = row.deadspace === 1;
        this.officer = row.officer === 1;
    }

    getIcon() {
        return getTypeIcon(this.typeID);
    }
}