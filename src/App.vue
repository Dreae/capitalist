<template>
    <div class="container-fluid">
        <Navbar />
        <div class="container-fluid app">
            <MarketBrowser :staticData="staticData" />
        </div>
    </div>
</template>

<script>
import MarketBrowser from "./components/MarketBrowser";
import StaticData from "./static_data";
import Navbar from './components/Navbar';

export default {
    name: "App",
    components: { MarketBrowser, Navbar },
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
