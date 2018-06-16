<template>
    <div class="columns">
        <div class="column is-one-quarter card">
            <aside class="menu">
                <p class="menu-label">
                    The Forge Market
                </p>
                <ul class="menu-list">
                    <MarketGroup @showTypes="showTypes" :group="group" :staticData="staticData" v-for="group in topGroups" :key="group.id" @showType="showType"/>
                </ul>
            </aside>
        </div>
        <div class="column card">
            <template v-if="shownType !== null">
                <MarketTypeDetail :typeId="shownType" />
            </template>
            <template v-else-if="shownTypes">
                <MarketTypeSummary :type="type" v-for="type in shownTypes" :key="type.id" @showType="showType(type.id)" />
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import MarketGroup from './MarketGroup';
import MarketTypeSummary from './MarketTypeSummary';
import MarketTypeDetail from './MarketTypeDetail';

export default {
    name: "MarketBrowser",
    props: ["staticData"],
    data: function() {
        return {
            topGroups: [],
            shownTypes: [],
            shownType: null
        }
    },
    created: function() {
        this.staticData.getTopLevelMarketGroups().then((groups) => {
            this.topGroups.push(...groups.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                } else {
                    return 1;
                }
            }));
        });
    },
    methods: {
        showTypes: function(types) {
            this.shownTypes = types;
            if (this.shownType) {
                this.shownType = null;
            }
        },
        showType: function(typeId) {
            this.shownType = typeId;
        }
    },
    components: {
        MarketGroup,
        MarketTypeSummary,
        MarketTypeDetail
    }
}
</script>

