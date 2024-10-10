import { storage } from "./storage";
import { getProvinceByGaode } from "@/api"
import pagesJson from '@/pages.json'

/**
 * 生成唯一随机串
 */
export const guid = () : string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * 处理富文本，返回固定个数的图片集合
 */
export const getImgList = (richtext : any, num : number = 3) => {
	let imgList : string[] = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture : string) => {
		imgList.push(capture);
	})

	imgList = imgList.splice(0, num)
	return imgList
}

/**
 * 处理富文本内容，将图片的宽度重新设置下 防止rich-text将图片的width="100%" 处理成width="0"  无语。。。。
 */
export const processImageWidth = (richText : string) => {
	return richText.replace(/(<img\b[^>]*?\bsrc=["'].*?["'][^>]*?\bwidth=["']100%["'][^>]*?>)/gi, function (match) {
		return match.replace('width="100%"', 'style="width: 100%; height: auto;"');
	});
}

/**
 * 通过高德地图当前省市
 */
export const getProvince = () => {
	return new Promise((resolve, reject) => {
		// 先从缓存中查找
		const cacheProvince : { province : string, time : number } = storage.get("cacheProvince");
		// 设置过期时间 1h
		const expirationTime = 1000 * 60 * 60;
		if (cacheProvince && (Date.now() - cacheProvince.time < expirationTime)) {
			// 有缓存且缓存没过期时直接返回
			return resolve(cacheProvince.province)
		}

		getProvinceByGaode().then((res : any) => {
			let province : string = "";
			if (res?.province && !Array.isArray(res.province)) {
				province = res.province
			} else {
				province = "开普勒星球"
			}
			resolve(province)
			storage.set("cacheProvince", {
				province,
				time: Date.now()
			})
		}).catch((err) => {
			reject(err)
		})
	})
}

/**
 * 当传入一个时间戳之后返回是多久之前
 */
export const getTimeAgo = (timestamp : number) : string => {
	if (!timestamp) {
		return ""
	}
	const now = Date.now();
	const differenceInMs = now - timestamp;

	// 计算并格式化时间差
	const seconds = Math.floor(differenceInMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const years = Math.floor(days / 365);

	if (years > 0) {
		return `${years}年前`;
	} else if (days > 0) {
		return `${days}天前`;
	} else if (hours > 0) {
		return `${hours}小时前`;
	} else if (minutes > 0) {
		return `${minutes}分钟前`;
	} else {
		return `${seconds}秒前`;
	}
}

/**
 * 将时间戳转换为年月日时分秒的格式
 */
export const timestampToDateTime = (timestamp : number) : string => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 参考uni-id-pages store.js 实现的方法
 * @param userInfo 当前登录人信息
 * @param hasLogin 当前是否为登录状态
 */
export const curHasLogin = () => {
	let hostUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {}
	// console.log( hostUserInfo);

	// 获取到过期时间
	// @ts-ignore
	let customTokenExpired = uniCloud.getCurrentUserInfo().tokenExpired - Date.now();
	if (customTokenExpired <= 0) {
		hostUserInfo = {}
	}

	return {
		userInfo: hostUserInfo,
		hasLogin: Object.keys(hostUserInfo).length != 0 && customTokenExpired > 0
	}
}

/**
 * 封装退出登录功能 用于未登录用户操作需要权限的功能时使用
 */
export const hasOnline = () => {
	if (!curHasLogin().hasLogin) {
		// 未登录
		uni.showModal({
			content: "您尚未登录，请先登录以享受更多功能。",
			success(e) {
				if (e.confirm) {
					uni.navigateTo({
						url: `/${pagesJson.uniIdRouter.loginPage}`
					})
				}
			}
		})
		return false
	}

	return true
}

/**
 * 判断当前用户是否有某些权限 SYSTEM_ADMIN - 管理员
 */
export const hasRole = (name : string = "SYSTEM_ADMIN") => {
	if (!name) {
		return false
	}
	// 当前用户的权限列表
	const { role } = uniCloud.getCurrentUserInfo();
	return role.includes(name)
}