import axios from '~/axios';

export function getSysconfig(){
    return axios.get(`/admin/sysconfig`)
}

export function setSysconfig(data){
    return axios.post(`/admin/sysconfig`,data)
}

export const uploadAction = "/api/admin/sysconfig/upload"