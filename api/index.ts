import { request } from "@/utils/request";
import config from "@/utils/config.defalut";

/**
 * 通过高德API获取当前位置信息
 */
export const getProvinceByGaode = () => {
	return request({
		url: `${config.AMAP_BASE_URL}/v3/ip?key=` + config.AMAP_KEY,
	})
}
