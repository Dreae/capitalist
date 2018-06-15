<template>
    <aside class="menu">
        <p class="menu-label">
            The Forge Market
        </p>
        <ul class="menu-list">
            <MarketGroup :group="group" :staticData="staticData" v-for="group in topGroups" :key="group.id"/>
        </ul>
    </aside>
</template>

<script>
import Vue from 'vue';
import MarketGroup from './MarketGroup';

export default {
    name: "MarketBrowser",
    props: ["staticData"],
    data: function() {
        return {
            topGroups: []
        }
    },
    created: function() {
        this.staticData.getTopLevelMarketGroups().then((groups) => {
            this.topGroups.push(...groups);
        });
    },
    components: { MarketGroup }
}
</script>

