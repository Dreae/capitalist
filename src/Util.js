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

export function calculateMovingAvg(data, period = 5) {
    return windowAndReduce(data, period, (dataWindow) => dataWindow.reduce((sum, next) => sum + next, 0) / dataWindow.length);
}

export function calculateDonchianMax(data, period = 5) {
    return windowAndReduce(data, period, (dataWindow) => Math.max(...dataWindow));
}

export function calculateDonchianMin(data, period = 5) {
    return windowAndReduce(data, period, (dataWindow) => Math.min(...dataWindow));
}

function windowAndReduce(data, period, reducer) {
    const dataClone = data.slice();
    dataClone.reverse();

    const collector = [];

    for (let i = dataClone.length; i >= 0; i--) {
        const dataWindow = dataClone.slice(i, i + period);
        const reduced = reducer(dataWindow);

        collector.push(reduced);
    }

    return collector;
}