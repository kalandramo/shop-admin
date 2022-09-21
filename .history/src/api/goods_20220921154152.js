import axios from '~/axios'

export function getGoodsList(page, query = {}) {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) : ""
    return axios.get(`/admin/manager/${page}${r}`)
}

export function updateGoodsStatus(id, status) {
    return axios.post(`/admin/manager/${id}/update_status`, { status })
}

export function createGoods(data) {
    return axios.post(`/admin/manager`, data)
}

export function updateGoods(id, data) {
    return axios.post(`/admin/manager/${id}`, data)
}

export function deleteGoods(id) {
    return axios.post(`/admin/manager/${id}/delete`)
}