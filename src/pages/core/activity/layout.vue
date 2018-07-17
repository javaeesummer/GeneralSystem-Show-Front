<template>
    <div>
        <v-layout justify-center>
            <v-flex md10 class="breadcrumbs">
                <v-breadcrumbs divider="/" class="breadcrumbs">
                    <v-breadcrumbs-item v-for="item in items" :key="item.title" :disabled="item.disabled">
                        <div @click="toPage(item)">{{ item.title }}</div>
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
            </v-flex>
        </v-layout>
        <router-view></router-view>
    </div>
</template>
<script>
import { activity } from "@/menu/index.js";
export default {
    data() {
        return {
            items: []
        };
    },
    watch: {
        // 折叠和展开菜单的时候销毁 better scroll
        "$route.matched": {
            handler(val) {
              
                this.items = [];
                let add_item = activity.filter(
                    item => item.title === "首页"
                )[0];
                add_item["disabled"] = false;
                this.items.push(
                    activity.filter(item => item.title === "首页")[0]
                );
                val.forEach(element => {
                    add_item = activity.filter(
                        item => item.router_name === element.name
                    );

                    if (add_item.length > 0) {
                        add_item["disabled"] = false;
                        this.items.push(add_item[0]);
                    }
                });
                console.log("1",this.items);
                this.items[this.items.length - 1].disabled = true;
                console.log("2",this.items);
            },
            immediate: true
        }
    },
    methods: {
        toPage(item) {
            console.log(item)
            this.$router.push({name:item.router_name})
        }
    }
};
</script>

<style>
.breadcrumbs {
    padding-left: 10px;
    padding-bottom: 0px;
}
</style>
