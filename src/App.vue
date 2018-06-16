<template>
    <div class="container-fluid app">
        <MarketBrowser :staticData="staticData" />
    </div>
</template>

<script>
import MarketBrowser from "./components/MarketBrowser";
import StaticData from "./static_data";

export default {
    name: "App",
    components: { MarketBrowser },
    data: function() {
        return {
            staticData: new StaticData()
        };
    }
}
</script>

<style>
.app {
    padding: 24px;
}
</style>
