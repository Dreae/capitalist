<template>
    <div :class="{modal: true, 'is-active': this.shown}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" aria-label="close" @click="toggle()"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save changes</button>
                <button class="button" @click="toggle()">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsModal',
    props: ['userData'],
    data: function() {
        return {
            shown: false
        };
    },
    methods: {
        toggle: function() {
            this.shown = !this.shown;
        }
    }
}
</script>
