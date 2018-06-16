<template>
    <div class="columns">
        <div class="column is-one-quarter card">
            <aside class="menu">
                <p class="menu-label">
                    The Forge Market
                </p>
                <ul class="menu-list">
                    <MarketGroup @showTypes="showTypes" :group="group" :staticData="staticData" v-for="group in topGroups" :key="group.id"/>
                </ul>
            </aside>
        </div>
        <div class="column card">
            <template v-if="shownTypes">
                <MarketTypeSummary :type="type" v-for="type in shownTypes" :key="type.id" />
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import MarketGroup from './MarketGroup';
import MarketTypeSummary from './MarketTypeSummary';

export default {
    name: "MarketBrowser",
    props: ["staticData"],
    data: function() {
        return {
            topGroups: [],
            shownTypes: []
        }
    },
    created: function() {
        this.staticData.getTopLevelMarketGroups().then((groups) => {
            this.topGroups.push(...groups);
        });
    },
    methods: {
        showTypes: function(types) {
            this.shownTypes = types;
        }
    },
    components: { MarketGroup, MarketTypeSummary }
}
</script>

