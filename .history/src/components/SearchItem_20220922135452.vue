<template>
    <el-col :span="8" :offset="0">
        <el-form-item label="商品名称">
            <slot/>
        </el-form-item>
    </el-col>
</template>
<script setup>
    defineProps({
        label:String
    })
</script>