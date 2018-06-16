import * as axios from 'axios';

export class ESIClient {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://esi.evetech.net/latest/',
            timeout: 3000
        });
    }

    getRegionTypeMarketHistory(regionId, typeId) {
        return this.axios.get(`markets/${regionId}/history?type_id=${typeId}`).then((response) => {
            if (response.status === 200) {
                return response.data;
            }

            return [];
        });
    }
}

const ESI = new ESIClient();
export default ESI;