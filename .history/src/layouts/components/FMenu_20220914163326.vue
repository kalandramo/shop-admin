<template>
    <div class="f-menu" :style="{width:$store.state.asideWidth}">
        <el-menu :collapse="isCollapse" default-active="2" class="border-0" @select="handleSelect">
            <template v-for="(item,index) in asideMenus" :key="index">
                <el-sub-menu v-if="(item.child && item.child.length>0)" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        {{item2.name}}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import store from '~/store';

// 是否折叠菜单
const isCollapse = computed(()=>{
    !(store.state.asideWidth == '250px')
})

const router = useRouter()

const asideMenus = [
    {
        "name": "后台面板",
        "icon": "help",
        "child": [{
            "name": "主控台",
            "icon": "home-filled",
            "frontpath": "/"
        }]
    },
    {
        "name": "商品管理",
        "icon": "shopping-bag",
        "child": [{
            "name": "商品管理",
            "icon": "shopping-cart-full",
            "frontpath": "/goods/list"
        }]
    }
]

const handleSelect = (e) => {
    router.push(e)
}
</script>

<style>
.f-menu {
    top: 64px;
    left: 0px;
    bottom: 0px;
    overflow: auto;
    @apply shadow-md fixed bg-light-50;
}
</style>