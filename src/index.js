import "@/bulma/css/bulma.css";
import "file-loader?name=main.js!#/main.js";
import Vue from "@/vue/dist/vue";
import App from "#/App";
import StaticData from './static_data';

const data = new StaticData();
data.getTopLevelMarketGroups().then((groups) => console.log(groups));

new Vue({
    el: '#app',
    components: { App },
    data: function() {
        return { }
    },
    template: '<App />'
});
