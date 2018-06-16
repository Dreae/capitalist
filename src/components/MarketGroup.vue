<template>
    <li>
        <a @click="loadGroup()">{{ group.name }}</a>
        <ul v-if="this.expanded && this.loaded">
            <MarketGroup @showTypes="showTypes" @showType="showType" :group="subGroup" :staticData="staticData" v-for="subGroup in children" :key="subGroup.id" />
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
            if (this.group.isType) {
                this.$emit('showType', this.group.id);
                return;
            }

            this.expanded = !this.expanded;


            if (!this.loaded) {
                const onLoaded = (children) => {
                    this.children = children;
                    this.loaded = true;

                    if (this.expanded && this.group.hasTypes) {
                        this.$emit('showTypes', this.children);
                    }
                }
                if (this.group.hasChildren) {
                    this.staticData.getChildMarketGroups(this.group.id).then(onLoaded);
                } else if(this.group.hasTypes) {
                    this.staticData.getMarketGroupTypes(this.group.id).then(onLoaded);
                }
            } else if (this.expanded && this.group.hasTypes) {
                this.$emit('showTypes', this.children);
            }
        },
        showTypes: function(types) {
            this.$emit('showTypes', types);
        },
        showType: function(typeId) {
            this.$emit('showType', typeId);
        }
    }
}
</script>

