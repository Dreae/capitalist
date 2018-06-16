import * as axios from 'axios';

export class ESIClient {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://esi.evetech.net/latest/',
            timeout: 3000
        });
        this.authorized = false;
    }

    getRegionTypeMarketHistory(regionId, typeId) {
        return this.axios.get(`markets/${regionId}/history?type_id=${typeId}`).then((response) => {
            if (response.status === 200) {
                return response.data;
            }

            return [];
        });
    }

    getRegionTypeMarketOrders(regionId, typeId) {
        return this.axios.get(`markets/${regionId}/orders?type_id=${typeId}`).then((response) => {
            if (response.status === 200) {
                return response.data;
            }

            return [];
        })
    }

    getStructureById(structureId) {
        if (!this.authorized) {
            return Promise.resolve(undefined);
        } else {
            return this.axios.get(`universe/structures/${structureId}/`).then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                return undefined;
            });
        }
    }
}

const ESI = new ESIClient();
export default ESI;