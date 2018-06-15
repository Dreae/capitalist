<template>
    <div class="columns">
        <div class="column is-one-third">
            <aside class="menu">
                <p class="menu-label">
                    The Forge Market
                </p>
                <ul class="menu-list">
                    <MarketGroup @showTypes="showTypes" :group="group" :staticData="staticData" v-for="group in topGroups" :key="group.id"/>
                </ul>
            </aside>
        </div>
        <div class="column">
            <template v-if="shownTypes">
                <article class="media" v-for="type in shownTypes" :key="type.id">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img :src="type.getIcon()">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ type.name }}</strong>
                                <br>
                                {{ type.desc }}
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import MarketGroup from './MarketGroup';

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
    components: { MarketGroup }
}
</script>

