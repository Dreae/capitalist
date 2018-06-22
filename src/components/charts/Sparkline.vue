<template>
    <div class="sparkline" :id="id"></div>
</template>

<script>
import * as Highcharts from 'highcharts/highstock';
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
      this.chart = Highcharts.chart(this.id, {
        chart: {
          animation: false,
          backgroundColor: null,
          borderWidth: 0,
          type: 'line',
          margin: [2, 0, 2, 0],
          width: 80,
          height: 20,
          style: {
            overflow: 'visible'
          },
          skipClone: true
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          lineWidth: 0,
          tickPositions: []
        },
        yAxis: {
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false,
          },
          title: {
            text: null
          },
          tickPositions: [0]
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: false,
            lineWidth: 1,
            shadow: false,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            marker: {
              radius: 0,
              states: {
                hover: {
                  radius: 0
                }
              }
            },
          }
        },
        series: [{
          data: this.data,
          color: '#949494'
        }]
      });
    },
    watch: {
        data: function() {
          this.chart.series[0].remove(false);
          this.chart.addSeries({
            data: this.data,
            color: '#949494'
          });
          
          this.chart.redraw();
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
