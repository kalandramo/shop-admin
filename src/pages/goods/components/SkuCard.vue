<template>
    <el-form-item label="规格选项">
        <el-card shadow="never" class="w-full mb-3" v-for="(item, index) in sku_card_list" :key="item.id"
            v-loading="item.loading">
            <template #header>
                <div class="flex items-center">
                    <el-input v-model="item.text" placeholder="规格名称" style="width:200px;" @change="handleUpdate(item)">
                        <template #append>
                            <el-icon class="cursor-pointer" @click="handleChooseSku(item)">
                                <more />
                            </el-icon>
                        </template>
                    </el-input>

                    <el-button class="ml-auto" size="small" @click="sortCard('up',index)" :disabled="index == 0">
                        <el-icon>
                            <Top />
                        </el-icon>
                    </el-button>
                    <el-button size="small" @click="sortCard('down',index)" :disabled="index === (sku_card_list.length -1)">
                        <el-icon>
                            <Bottom />
                        </el-icon>
                    </el-button>
                    <el-popconfirm title="是否要删除该选项?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(item)">
                        <template #reference>
                            <el-button size="small">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>

            <SkuCardItem :skuCardId="item.id" />

        </el-card>
        <el-button type="success" size="small" :loading="btnLoading" @click="addSkuCardEvent">添加规格</el-button>

    </el-form-item>

    <ChooseSku ref="chooseSkuRef" />
</template>

<script setup>
    import {ref} from 'vue';
import SkuCardItem from '~/pages/goods/components/SkuCardItem.vue';
import { sku_card_list, addSkuCardEvent, btnLoading, handleUpdate, handleDelete,sortCard,chooseSetGoodsSkuCard } from '~/composables/useSku.js'
import ChooseSku from '~/components/ChooseSku.vue';

const chooseSkuRef = ref(null)
const handleChooseSku = (item)=>{
    chooseSkuRef.value.open((value)=>{
        chooseSetGoodsSkuCard(item.id,{
            name:value.name,
            value:value.list
        })
    })
}
</script>

<style>
.el-card__header {
    @apply p-2 bg-gray-50;
}
</style>