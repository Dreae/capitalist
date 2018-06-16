<template>
    <div class="container-fluid">
        <Navbar />
        <div class="container-fluid app">
            <div class="tabs is-centered">
                <ul>
                    <li><a>Character</a></li>
                    <li><a>Statistics</a></li>
                    <li><a>Assets</a></li>
                    <li><a>Orders</a></li>
                    <li><a>Journal</a></li>
                    <li><a>Transactions</a></li>
                    <li class="is-active"><a>Market Browser</a></li>
                </ul>
            </div>
            <div class="active-tab">
                <MarketBrowser :staticData="staticData" />
            </div>
        </div>
    </div>
</template>

<script>
import MarketBrowser from "./components/MarketBrowser";
import SDE from "./static_data";
import Navbar from './components/Navbar';

export default {
    name: "App",
    components: { MarketBrowser, Navbar },
    data: function() {
        return {
            staticData: SDE
        };
    }
}
</script>

<style>
.app {
    margin-top: 52px;
}
.active-tab {
    padding-left: 24px;
    padding-right: 24px;
}
</style>
