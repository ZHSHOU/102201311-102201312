/**
 * 封装本地缓存，包括存，取，删除，清理跟检测
 */

export const storage = {
	// 设置缓存
	set(key : string, value : any) {
		try {
			uni.setStorageSync(key, value);
		} catch(e) {
			console.log(e);
		}
	},

	// 获取缓存
	get(key : string) {
		try {
			return uni.getStorageSync(key);
		} catch (e) {
			console.log(e);
		}
	},

	// 移除缓存
	remove(key : string) {
		try {
			uni.removeStorageSync(key);
		} catch (e) {
			console.log(e);
		}
	},

	// 清除所有缓存
	clear() {
		try {
			uni.clearStorageSync();
		} catch (e) {
			console.log(e)
		}
	},

	//返回一个布尔值, 表示name是否在本地缓存之中
	checkCache(key: string) {
		try {
			const res = uni.getStorageInfoSync()
			return res.keys.includes(key)
		} catch (e) {
			console.log(e)
		}
	}
};