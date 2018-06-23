<template>
    <nav class="navbar is-light is-fixed-top">
        <div class="navbar-brand">
            <a href="https://bulma.io" class="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <i class="ion-md-remove" @click="minimizeApp()"></i>
            </div>
            <div class="navbar-item">
                <i class="ion-md-funnel" @click="maximizeApp()"></i>
            </div>
            <div class="navbar-item">
                <i class="ion-md-close" @click="closeApp()"></i>
            </div>
        </div>
    </nav>
</template>

<script>
import * as electron from 'electron';

export default {
    name: "Navbar",
    methods: {
        closeApp: function() {
            electron.remote.getCurrentWindow().close();
        },
        minimizeApp: function() {
            electron.remote.getCurrentWindow().minimize();
        },
        maximizeApp: function() {
            electron.remote.getCurrentWindow().maximize();
        }
    }
}
</script>

<style>
.navbar {
    -webkit-app-region: drag;
}

.navbar-item {
    -webkit-app-region: no-drag;
    cursor: pointer;
}
</style>

