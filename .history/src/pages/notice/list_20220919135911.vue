<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增和刷新 -->
        <ListHeader @create="handleCreate" @refresh="getData" />

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除该公告?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-4">
            <el-pagination background layout="prev,pager, next" :total="totalCount" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>

        </FormDrawer>
    </el-card>

</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { toast } from '~/composables/utils';
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '~/api/notice.js';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';

const {
    tableData,
    loading,
    currentPage,
    totalCount,
    limit,
    getData,
    handleDelete,
} = useInitTable({
    getList: getNoticeList,
    delete: deleteNotice
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
    update: updateNotice,
    create: createNotice,
    form: {
        title: "",
        content: ""
    },
    rules: {
        title: [
            { required: true, message: '公告标题必填', trigger: 'blur' }
        ],
        content: [
            { required: true, message: '公告内容必填', trigger: 'blur' }
        ]
    }
})
</script>