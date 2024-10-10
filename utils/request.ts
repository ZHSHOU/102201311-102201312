import { RequestOption, CloudRequsetOption } from "@/types/globle.d"

/**
 * 简单封装 uni.request请求
 */
export const request = (options : RequestOption) => {
	return new Promise((resolve, reject) => {
		// 设置请求头
		const header = {
			'Content-Type': 'application/json',
			...options.header
		}
		// 在发送请求之前执行拦截操作
		uni.request({
			url: options.url,
			method: options.method || 'GET',
			//接收请求的data,不传默认为空
			data: options.data || {},
			header,
			success(res) {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

/**
 * 简单封装uniCloud调用第三方服务
 */
export const cloudRequest = (options : CloudRequsetOption) => {
	return new Promise((resolve, reject) => {
		// 设置请求头
		const header = {
			'Content-Type': 'application/json',
			...options.header
		}
		
		uniCloud.request({
			url: options.url,
			method: options.method || 'GET',
			//接收请求的data,不传默认为空
			data: options.data || {},
			header,
			dataType: "json",
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}