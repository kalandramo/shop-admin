<template>
    <el-card shadow="never">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-tree :data="tableData" :props="defaultProps" v-loading="loading" node-key="id"
            :default-expanded-keys="defaultExpandedKeys">
            <template #default="{ node, data }">
                <div class="custom-node-tree">
                    <el-tag size="small" :type="data.menu ? '':'info'">{{ data.menu ==1 ? '菜单':'权限' }}</el-tag>
                    <el-icon v-if="data.icon" size="16" class="ml-2">
                        <component :is='data.icon'></component>
                    </el-icon>
                    <span>{{data.name}}</span>
                    <div class="ml-auto">
                        <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0">
                        </el-switch>
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                        <el-button text type="primary" size="small">增加</el-button>
                        <el-button text type="primary" size="small">删除</el-button>
                    </div>
                </div>
            </template>
        </el-tree>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-input v-model="form.rule_id"></el-input>
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-input v-model="form.menu"></el-input>
                </el-form-item>
                <el-form-item label="菜单/权限名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath">
                    <el-input v-model="form.frontpath"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition">
                    <el-input v-model="form.condition"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method">
                    <el-input v-model="form.method"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input v-model="form.order"></el-input>
                </el-form-item>
            </el-form>

        </FormDrawer>
    </el-card>

</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '~/components/ListHeader.vue';
import { getRuleList, createRule, updateRule } from '~/api/rule.js'
import { useInitTable, useInitForm } from '~/composables/useCommon.js';
import FormDrawer from '~/components/FormDrawer.vue';

const defaultExpandedKeys = ref([])
const {
    loading,
    tableData,
    getData
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
    }
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit
} = useInitForm({
    getData,
    update: updateRule,
    create: createRule,
    form: {
        rule_id: 0,
        menu:0,
        name:"",
        condition:"",
        method:"GET",
        status:1,
        order:50,
        icon:"",
        frontpath:""
    },
    rules: {
    }
})


const defaultProps = {
    label: "name",
    children: "child"
}
</script>

<style>
.custom-node-tree {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}

.el-tree-node__content {
    padding: 20px 0;
}
</style>