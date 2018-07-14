<template>
  <v-app>
    <head-bar></head-bar>
    <v-content></v-content>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import HeadBar from "./pages/layout/Headbar.vue";
import FooterBar from "./pages/layout/Footer.vue";
export default {
    name: "App",
    components: {
        HelloWorld,
        HeadBar,
        FooterBar
    },
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                {
                    icon: "bubble_chart",
                    title: "Inspire"
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "Vuetify.js"
        };
    }
};
</script>
