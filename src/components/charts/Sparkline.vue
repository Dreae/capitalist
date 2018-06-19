<template>
    <div class="sparkline">
        <canvas :id="id" height="20" width="80"/>
    </div>
</template>

<script>
import { Chart } from 'chart.js';
import * as uuid from 'uuid/v4';

export default {
    name: "Sparkline",
    props: ["data"],
    data: function() {
        return {
            id: uuid(),
            chart: null,
        }
    },
    mounted: function() {
        const ctx = document.getElementById(this.id).getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [...this.data.keys()],
            datasets: [
              {
                data: this.data,
                spanGaps: true
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            elements: {
              line: {
                borderColor: '#888888',
                borderWidth: 1,
                fill: false
              },
              point: {
                radius: 0
              }
            },
            tooltips: {
              enabled: false
            },
            scales: {
              yAxes: [
                {
                  display: false
                }
              ],
              xAxes: [
                {
                  display: false
                }
              ]
            }
          }
        });
    },
    watch: {
        data: function() {
            this.chart.data.labels = [...this.data.keys()];
            this.chart.update();
        }
    }
}
</script>

<style>
.sparkline {
    width: 80px;
    height: 20px;
    display: inline-block;
}
</style>
