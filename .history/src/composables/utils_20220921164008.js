import { ElNotification,ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

// 消息提示
export function toast(message, type = "success", dangerouslyUseHTMLString = true) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

export function showModal(content = "提示内容",type="warning",title=""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type,
        }
      )
}

//弹出输入框
export function showPrompt(tip,value=""){
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
})
}

// 显示全局loading
export function showFullLoading(){
  nprogress.start()
}

// 隐藏全局loading
export function hideFullLoading(){
  nprogress.done()
}

//将query对象转为url参数
export function queryParams(query){
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join("&")
  r = r ? ("?" + r) : ""
  return r
}