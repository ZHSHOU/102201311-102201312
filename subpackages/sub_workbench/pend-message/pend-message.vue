<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onShow, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { timestampToDateTime } from "@/utils"
import { ApiResponse } from '@/types/globle';
import { FeedbackItem } from "@/types/workbench"

const db = uniCloud.database()
const feedbackList = ref<FeedbackItem[]>([]);
const loadText = ref<string>("");
const queryParams = reactive({
	page: 1,
	pageSize: 20,
	total: 0
})

/**
 * 获取列表数据 
 */
const getData = () => {
	const { pageSize, page } = queryParams;
	loadText.value = "加载中..."
	const feedTemp = db.collection("travel-feed-back")
		.where(`process_status == 1`)
		.field("_id, user_id, type, excerpt, publish_date, publish_ip")
		.skip((page - 1) * pageSize)
		.limit(pageSize)
		.getTemp()
	
	const userTemp = db.collection("uni-id-users")
		.field("_id, nickname, username")
		.getTemp();
	

	db.collection(feedTemp, userTemp)
		.get({ getCount: true })
		.then((response : ApiResponse) => {
			console.log(response, "返回值")
			queryParams.total = response.result?.count || 0
			if (page === 1) {
				feedbackList.value = response.result?.data || [];
			} else {
				feedbackList.value = feedbackList.value.concat(response.result.data)
			}
		}).finally(() => {
			if (pageSize * page < queryParams.total) {
				loadText.value = "上拉加载更多"
			} else {
				loadText.value = "暂无更多数据"
			}
			uni.stopPullDownRefresh()
		})
}

/**
 * 通过type类型转换文本
 */
const convertText = (type: number): string => {
    const textMap: { [key: number]: string } = {
        1: '产品使用问题',
        2: '系统BUG',
        3: '投诉',
        4: '需求',
        5: '其他',
    };

    // 检查type是否在映射表中，如果不在则抛出错误
    if (!textMap.hasOwnProperty(type)) {
        throw new Error(`无效的类型编号: ${type}, 请确保type在1到5之间.`);
    }

    return textMap[type];
};

/**
 * 查看详情
 */
const gotoDetail = (id: string) => {
	uni.navigateTo({
		url: "/subpackages/sub_workbench/hand-message/hand-message?id=" + id
	})
}

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
	queryParams.page = 1;
	getData()
})

/**
 * 上拉加载
 */
onReachBottom(() => {
	const { total, page, pageSize } = queryParams;
	
	if (total > (page * pageSize)) {
		queryParams.page++
		getData()
	}
})

onShow(() => {
	getData()
})
</script>

<template>
	<view class="content">
		<view class="list">
			<view class="li" v-for="item in feedbackList" :key="item['_id']" @click="gotoDetail(item._id)">
				
				<view class="li-header">
					<view>{{ convertText(item.type) }}</view>
				</view>
				<view class="li-content">{{ item.excerpt }}</view>
				<view class="li-foot">
					<view><text>提交人：</text>{{ item.user_id[0].nickname || item.user_id[0].username || '微信用户' }}</view>
					<view><text>提交时间：</text>{{ timestampToDateTime(item.publish_date) }}</view>
				</view>
			</view>
			<view class="load-text">{{ loadText }}</view>
		</view>
	</view>
</template>
<style lang="scss">
page {
	background: $uni-bg-color-grey;
}
</style>
<style lang="scss" scoped>
@import "index.scss";
</style>