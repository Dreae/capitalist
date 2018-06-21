import ESI from './ESI';
import SDE from './static_data';

export function getLocationNameForId(locationId) {
    if (locationId < 4294967295) {
        return SDE.getStationById(locationId).then((station) => {
            if (station) {
                return station.name;
            }

            return locationId.toString();
        });
    } else {
        return ESI.getStructureById(locationId).then((structure) => {
            if (structure) {
                return structure.name;
            }

            return locationId.toString();
        });
    }
}

export function formatOrderRange(range) {
    const jumps = parseInt(range);
    if (isNaN(jumps)) {
        if (range === 'region') {
            return 'Region';
        } else if (range === 'solarsystem') {
            return 'Solar System';
        } else {
            return 'Station';
        }
    } else {
        return `${jumps} Jumps`;
    }
}