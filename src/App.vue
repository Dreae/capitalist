<template>
    <MarketBrowser :staticData="staticData" />
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

