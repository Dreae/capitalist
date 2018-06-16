<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="type.getIcon()">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ type.name }}</strong>
                    <Sparkline :data="priceHistory" />
                    <br>
                    {{ type.desc }}
                </p>
            </div>
        </div>
    </article>
</template>

<script>
import { Chart } from 'chart.js';
import Sparkline from './charts/Sparkline';
import ESI from '../ESI';

import { normalizeMarketHistoryByWeek } from '../DateUtil';

export default {
    name: "MarketTypeSummary",
    props: ["type"],
    components: { Sparkline },
    data: function() {
      return {
        priceHistory: []
      };
    },
    created: function() {
      ESI.getRegionTypeMarketHistory(10000002, this.type.id).then((data) => {
        this.priceHistory.push(...normalizeMarketHistoryByWeek(data).map(p => p.average));
      });
    }
}
</script>
