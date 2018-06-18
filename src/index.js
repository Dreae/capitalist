import "@/bulma/css/bulma.css";
import "@/ionicons/dist/css/ionicons.min.css";
import "file-loader?name=main.js!#/main.js";
import Vue from "@/vue/dist/vue";
import App from "#/App";

new Vue({
    el: '#app',
    components: { App },
    data: function() {
        return { }
    },
    template: '<App />'
});
