<template>
    <div>
        <!-- 标签页 -->
        <el-tabs v-model="searchForm.tab" @tab-change="getData(1)">
            <el-tab-pane v-for="(item, index) in tabbars" :key="index" :label="item.name" :name="item.key"></el-tab-pane>
        </el-tabs>

        <el-card shadow="never" class="border-0">
            <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
                <el-row :gutter="20">
                    <el-col :span="8" :offset="0">
                        <el-form-item label="关键词">
                            <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="8">
                        <div class="flex items-center justify-end">
                            <el-button type="primary" @click="getData">搜索</el-button>
                            <el-button @click="resetSearchForm">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>


            <!-- 新增和刷新 -->
            <ListHeader @create="handleCreate" @refresh="getData" />

            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column label="商品" width="300">
                    <template #default="{ row }">
                        <div class="flex">
                            <el-image :src="row.cover" fit="fill" :lazy="true" style="width:50px;height:50px;"></el-image>
                            <div class="flex-1">
                                <p>{{row.title}}</p>
                                <div>
                                    <span>¥{{row.min_price}}</span>
                                    <el-divider direction="vertical" />
                                    <span>¥{{row.min_oprice}}</span>
                                </div>
                                <p>分类:{{row.category ? row.category.name : "未分类"}}</p>
                                <p>创建时间:{{row.create_time}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="所属角色" align="center">
                    <template #default="{ row }">
                        {{ row.role?.name || "-" }}
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="120">
                    <template #default="{ row }">
                        <el-switch :modelValue="row.status" :loading="row.statusLoading" :active-value="1"
                            :inactive-value="0" :disabled="row.super == 1" @change="handleStatusChange($event,row)">
                        </el-switch>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <small v-if="scope.row.super == 1" class="text-gray-500 text-sm">暂无操作</small>
                        <div v-else>
                            <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                            <el-popconfirm title="是否要删除该管理员?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(scope.row.id)">
                                <template #reference>
                                    <el-button text type="primary" size="small">删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="flex items-center justify-center mt-4">
                <el-pagination background layout="prev,pager, next" :total="totalCount" :current-page="currentPage"
                    :page-size="limit" @current-change="getData" />
            </div>
            <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
                <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <ChooseImage v-model="form.avatar" />
                    </el-form-item>
                    <el-form-item label="所属角色" prop="role_id">
                        <el-select v-model="form.role_id" placeholder="选择所属角色">
                            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                        </el-switch>

                    </el-form-item>
                </el-form>

            </FormDrawer>
        </el-card>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import ListHeader from '~/components/ListHeader.vue';
import ChooseImage from '~/components/ChooseImage.vue';
import { getGoodsList, updateGoodsStatus, createGoods, updateGoods, deleteGoods } from '~/api/goods.js';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';

const roles = ref([])
const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    totalCount,
    limit,
    getData,
    handleDelete,
    handleStatusChange
} = useInitTable({
    searchForm: {
        title: "",
        tab: "delete",
        category_id: null,
    },
    getList: getGoodsList,
    onGetListSuccess: (res) => {
        roles.value = res.roles
        tableData.value = res.list.map((o) => {
            //修改状态时开启loading
            o.statusLoading = false
            return o
        })
        totalCount.value = res.totalCount
    },
    delete: deleteGoods,
    updateStatus: updateGoodsStatus
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
    update: updateGoods,
    create: createGoods,
    form: {
        username: "",
        password: "",
        role_id: null,
        status: 1,
        avatar: ""
    }
})


const tabbars = [
    {
        key: "all",
        name: "全部"
    },
    {
        key: "checking",
        name: "审核中"
    },
    {
        key: "saling",
        name: "出售中"
    },
    {
        key: "off",
        name: "已下架"
    },
    {
        key: "min_stock",
        name: "库存预警"
    },
    {
        key: "delete",
        name: "回收站"
    },
]
</script>