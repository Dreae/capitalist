<template>
    <div class="line-area-bar-combo">
        <canvas :id="id" />
    </div>
</template>

<script>
import { Chart } from 'chart.js';
import * as uuid from 'uuid/v4';

export default {
    name: "LineAreaBarComboChart",
    props: ["lineData", "barData", "labels"],
    data: function() {
        return {
            id: uuid(),
            chart: null,
        }
    },
    mounted: function() {
        const ctx = document.getElementById(this.id).getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [{
                    label: this.barData.label,
                    data: this.barData.data,
                    backgroundColor: '#3273dc',
                    yAxisID: 'barChart'
                }, {
                    label: this.lineData.label,
                    data: this.lineData.data,
                    type: 'line',
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    borderColor: '#00d1b2',
                    yAxisID: 'lineChart'
                }],
                labels: this.labels,
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        id: 'barChart',
                        type: 'linear',
                        display: false,
                        ticks: {
                            max: Math.max(...this.barData.data) * 4
                        }
                    }, {
                        id: 'lineChart',
                        type: 'linear',
                        offset: false,
                        position: 'left',
                        ticks: {
                            min: 0
                        }
                    }]
                },
                tooltips: {
                    intersect: false,
                    mode: 'nearest'
                }
            }
        });
    }
}
</script>

