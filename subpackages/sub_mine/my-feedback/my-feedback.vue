<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
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

	db.collection("travel-feed-back")
		.where(`user_id == $cloudEnv_uid`)
		.field("_id, type, excerpt, publish_date, process_status")
		.orderBy("publish_date", "desc")
		.skip((page - 1) * pageSize)
		.limit(pageSize)
		.get({ getCount: true })
		.then((response : ApiResponse) => {
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
		url: "/subpackages/sub_mine/feedback-detail/feedback-detail?id=" + id
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

onLoad(() => {
	getData()
})
</script>

<template>
	<view class="content">
		<view class="list">
			<view class="li" v-for="item in feedbackList" :key="item['_id']" @click="gotoDetail(item._id)">
				
				<view class="li-header">
					<view>{{ convertText(item.type) }}</view>
					<view class="li-tag">
						<wd-tag
							v-if="item.process_status === 1"
							type="primary" 
							mark 
							plain
						>待处理</wd-tag>
						<wd-tag
							v-if="item.process_status === 2"
							type="success" 
							mark 
							plain
						>已处理</wd-tag>
						<wd-tag
							v-if="item.process_status === 3"
							type="danger" 
							mark 
							plain
						>不予处理</wd-tag>
					</view>
				</view>
				<view class="li-content">{{ item.excerpt }}</view>
				<view class="li-foot">
					<view class="li-time">{{ timestampToDateTime(item.publish_date) }}</view>
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