<template>
    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
        @close="handleClose(tag)">
        {{ tag }}
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        + 添加值
    </el-button>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const inputValue = ref('')
const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : [])
const inputVisible = ref(false)
const InputRef = ref()

//input list or []
const props = defineProps({
    modelValue:String
})

//监听update事件，动态更新modelValue的值
const emit = defineEmits("update:modelValue")

const handleClose = (tag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
        //通知update:modelValue更新值
        emit('update:modelValue',dynamicTags.value.join(','))
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>
