<template>
    <div class="line-area-bar-combo" :id="id"></div>
</template>

<script>
import * as Highcharts from 'highcharts/highstock';
import * as uuid from 'uuid/v4';

export default {
    name: "MarketHistoryChart",
    props: ["lineData", "barData", "labels"],
    data: function() {
        return {
            id: uuid(),
            chart: null,
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
                data: this.lineData
            }, {
                type: 'column',
                name: 'Volume',
                yAxis: 1,
                data: this.barData
            }]
        });
    }
}
</script>

