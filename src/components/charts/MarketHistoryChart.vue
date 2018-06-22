<template>
    <div class="market-history-chart" :id="id"></div>
</template>

<script>
import * as Highcharts from 'highcharts/highstock';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';

import * as indicators from 'highcharts/indicators/indicators';
import * as more from 'highcharts/highcharts-more';
indicators(Highcharts);
more(Highcharts);

import { calculateDonchianMax, calculateDonchianMin } from '../../Util';

function priceHistoryToMarketData(priceHistory) {
    const price = [];
    const donchianChannel = [];
    const volume = [];
    const candlestick = [];

    const donchianLows = calculateDonchianMin(priceHistory.map(p => p.lowest));
    const donchianHighs = calculateDonchianMax(priceHistory.map(p => p.highest));

    priceHistory.forEach((p, index) => {
        const date = moment(p.date).valueOf();
        price.push([date, p.average]);
        candlestick.push([date, p.highest, p.highest, p.lowest, p.lowest]);
        volume.push([date, p.volume]);

        donchianChannel.push([date, donchianLows[index], donchianHighs[index]]);
    });

    return {
        price,
        volume,
        donchianChannel,
        candlestick
    };
}

export default {
    name: "MarketHistoryChart",
    props: ["data"],
    data: function() {
        return {
            id: uuid(),
            chart: null,
            chartData: priceHistoryToMarketData(this.data)
        }
    },
    mounted: function() {
        this.chart = Highcharts.stockChart(this.id, {
            rangeSelector: {
                selected: 0
            },
            title: {
                text: ''
            },
            tooltip: {
                split: true
            },
            credits: {
                enabled: false
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Price History'
                },
                height: '75%',
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '75%',
                height: '25%',
                resize: {
                    enabled: true
                },
                offset: 0
            }],
            series: [{
                type: 'line',
                name: 'Price',
                id: 'price',
                data: this.chartData.price,
                zIndex: 1
            }, {
                type: 'column',
                name: 'Volume',
                yAxis: 1,
                data: this.chartData.volume
            }, {
                name: 'Moving Avg (5d)',
                type: 'sma',
                linkedTo: 'price',
                params: {
                    period: 5
                },
                marker: {
                    enabled: false
                },
                zIndex: 100
            }, {
                name: 'Moving Avg (20d)',
                type: 'sma',
                linkedTo: 'price',
                params: {
                    period: 20
                },
                marker: {
                    enabled: false
                },
                zIndex: 2
            }, {
                name: 'Donchian Channel',
                type: 'arearange',
                linkedTo: 'price',
                data: this.chartData.donchianChannel,
                zIndex: 0
            }, {
                name: 'Min/Max',
                type: 'ohlc',
                data: this.chartData.candlestick,
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Min: {point.low}<br/>Max: {point.high}<br/>'
                }
            }]
        });
    }
}
</script>

<style>
.market-history-chart {
    height: 480px;
}
</style>
