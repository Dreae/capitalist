<template>
    <li>
        <a @click="loadGroup()">{{ group.name }}</a>
        <ul v-if="this.expanded && this.loaded">
            <MarketGroup :group="subGroup" :staticData="staticData" v-for="subGroup in children" :key="subGroup.id" />
        </ul>
    </li>
</template>

<script>
import Vue from 'vue';

export default {
    name: "MarketGroup",
    props: ["staticData", "group"],
    data: function() {
        return {
            expanded: false,
            loaded: false,
            children: []
        };
    },
    methods: {
        loadGroup: function() {
            this.expanded = !this.expanded;
            if (!this.loaded) {
                if (this.group.hasChildren) {
                    this.staticData.getChildMarketGroups(this.group.id).then((groups) => {
                        this.children = groups;
                        this.loaded = true;
                    });
                } else if(this.group.hasTypes) {
                    this.staticData.getMarketGroupTypes(this.group.id).then((types) => {
                        this.children = types;
                        this.loaded = true;
                    });
                }
            }
        }
    }
}
</script>

