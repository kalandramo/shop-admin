<template>
    <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
        
    </el-drawer>
</template>

<script setup>
    import { ref } from "vue";
const showDrawer = ref(false);
</script>