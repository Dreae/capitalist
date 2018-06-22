<template>
    <div class="box" @click="$emit('showType')">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img :src="type.getIcon()">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                        <div class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <strong>{{ type.name }}</strong>
                                </div>
                                <div class="level-item">
                                    <Sparkline class="sparkline" :data="priceHistory" />
                                </div>
                            </div>
                        </div>
                        <span v-html="type.desc"></span>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import Sparkline from './charts/Sparkline';
import ESI from '../ESI';

import { normalizeMarketHistoryByWeek } from '../MarketUtil';

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

<style>
.box {
    cursor: pointer;
}

font[color="yellow"] {
    color: hsl(48, 100%, 67%);
}

.sparkline {
    margin-left: 12px;
}
</style>
