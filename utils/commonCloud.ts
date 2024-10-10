/**
 * 公用操作数据的方法
 */
import { ApiResponse } from '@/types/globle';

const db = uniCloud.database();
const travelUtils = uniCloud.importObject("travel-utils", {
	customUI: true
});

/**
 * 执行点赞操作，操作数据 $cloudEnv_uid - 当前登录人id 
 */
export const executeLikeOperation = async (artId: string) => {
	// 查询当前用户是否点过赞
	const response: ApiResponse = await db.collection("travel-like")
		.where(`article_id == "${artId}" && user_id == $cloudEnv_uid`)
		.count();
	
	if (response.result.total > 0) {
		// 取消点赞
		await db.collection("travel-like")
			.where(`article_id == "${artId}" && user_id == $cloudEnv_uid`)
			.remove()
		// 更新文章表的点赞数-1
		await travelUtils.customOperation("travel-articles", "like_count", artId, -1);
	} else {
		// 点赞
		await db.collection("travel-like").add({
			article_id: artId
		})
		// 更新文章表的点赞数+1
		await travelUtils.customOperation("travel-articles", "like_count", artId);
	}
}