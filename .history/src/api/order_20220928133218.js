import axios from '~/axios'
import { queryParams } from '~/composables/utils'

export function getOrderList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/order/${page}${r}`)
}

export function deleteOrder(ids) {
    return axios.post(`/admin/order/delete_all`, { ids
})
}

export function exportOrder(query = {}) {
    let r = queryParams(query)
    return axios.post(`/admin/order/excelexport${r}`,{},{
        responseType:"blob"
    })
}