<template>
    <div class="flex items-center justify-between mb-4">
        <div>
            <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增
            </el-button>

            <el-popconfirm v-if="btns.includes('delete')" title="是否要删除选中记录?" confirm-button-text="确认"
                cancel-button-text="取消" @confirm="$emit('delete')">
                <template #reference>
                    <el-button type="danger" size="small">批量删除
                    </el-button>
                </template>
            </el-popconfirm>
            <slot/>
        </div>

        <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新" placement="top">
            <el-button>
                <el-icon :size="20">
                    <Refresh @click="$emit('refresh')" />
                </el-icon>
            </el-button>
        </el-tooltip>

        <el-tooltip v-if="btns.includes('download')" effect="dark" content="下载" placement="top">
            <el-button>
                <el-icon :size="20">
                    <Refresh @click="$emit('refresh')" />
                </el-icon>
            </el-button>
        </el-tooltip>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    layout: {
        type: String,
        default: "create,refresh"
    }
})

const btns = computed(() => props.layout.split(","))

defineEmits(["create", "delete", "refresh",])
</script>