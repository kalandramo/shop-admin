import {ref} from 'vue';

//商品ID
export const goodsId = ref(0)

//规格选项列表
export const sku_card_list = ref([])

//初始化规格选项列表
export function initSkuCardList(d){
    // console.log(d);
    sku_card_list.value = d.goodsSkusCard.map(item=>{
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v=>{
            v.text = v.value || "属性值"
            return v
        })
        return item
    })
}

