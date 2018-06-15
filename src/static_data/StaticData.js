import * as sqlite from 'sqlite3';
import InvType from './InvType';
import MarketGroup from './MarketGroup';

export default class StaticData {
    constructor() {
        this.db = new sqlite.Database('data/sqlite-latest.sqlite');
    }

    getTopLevelMarketGroups() {
        return new Promise((resolve, reject) => {
            this.db.all(`
                SELECT invMarketGroups.*, COUNT(p1.marketGroupID) > 0 as hasChildren
                FROM invMarketGroups
                LEFT JOIN invMarketGroups as p1 ON p1.parentGroupID = invMarketGroups.marketGroupID
                WHERE invMarketGroups.parentGroupID IS NULL
                GROUP BY invMarketGroups.marketGroupID
            `, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => new MarketGroup(row)));
                }
            });
        });
    }

    getChildMarketGroups(parentGroup) {
        return new Promise((resolve, reject) => {
            this.db.all(`
                SELECT invMarketGroups.*, COUNT(p1.marketGroupID) > 0 as hasChildren
                FROM invMarketGroups
                LEFT JOIN invMarketGroups as p1 ON p1.parentGroupID = invMarketGroups.marketGroupID
                WHERE invMarketGroups.parentGroupID = ?
                GROUP BY invMarketGroups.marketGroupID
            `, [parentGroup], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => new MarketGroup(row)));
                }
            });
        });
    }

    getMarketGroupTypes(marketGroup) {
        const stmt = this.db.prepare(`
            SELECT
                invTypes.*,
                invMetaTypes.metaGroupID = 4 AS faction,
                invMetaTypes.metaGroupID = 5 AS officer,
                invMetaTypes.metaGroupID = 6 AS deadspace
            FROM invTypes LEFT JOIN invMetaTypes on invMetaTypes.typeID = invTypes.typeID WHERE marketGroupID = ?
        `);
        return new Promise((resolve, reject) => {
            stmt.all(marketGroup, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => new InvType(row)));
                }
            });
        });
    }
}