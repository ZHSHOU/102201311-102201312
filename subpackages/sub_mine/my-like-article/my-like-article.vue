<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { timestampToDateTime } from "@/utils"
import { ApiResponse } from '@/types/globle';

const db = uniCloud.database()
let pageTitle = "";
const articList = ref<{ 
	article_id: any;
	_id: string
}[]>([]);
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
	
	const likeTemp = db.collection("travel-like")
		.where(`user_id == $cloudEnv_uid`)
		.field("article_id")
		.getTemp();
	
	// 当前临表查询会过滤掉不符合条件的数据，但这样会导致联表查询时article_id 为 空数组
	const artTemp = db.collection("travel-articles")
		.where(`article_status == 1 && delete_status == 1 && is_open == true`)
		.field("title, publish_date, user_id, _id")
		.orderBy("publish_date", "asc")
		.getTemp();
	
	// 二次过滤，只查询article_id不为空的数据 并分页
	db.collection(likeTemp, artTemp)
		.where(`article_id != []`)
		.skip((page - 1) * pageSize)
		.limit(pageSize)
		.get({ getCount: true })
		.then((response : ApiResponse) => {
			queryParams.total = response.result?.count || 0
			if (page === 1) {
				articList.value = response.result?.data || [];
			} else {
				articList.value = articList.value.concat(response.result.data)
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
 * 查看详情
 */
const gotoDetail = (id: string) => {
	uni.navigateTo({
		url: "/subpackages/sub_home/article-details/article-details?id=" + id
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

onLoad((option) => {
	pageTitle = option?.title
	
	getData()
})
</script>

<template>
	<view class="content">
		<view class="list">
			<view class="li" v-for="item in articList" :key="item['_id']" @click="gotoDetail(item.article_id[0]._id)">
				<view class="li-title">{{ item.article_id[0].title }}</view>
				<view class="li-foot">
					<view class="li-time">{{ timestampToDateTime(item.article_id[0].publish_date) }}</view>
					<!-- <view 
						v-if="store.userInfo._id == item.article_id[0].user_id"
						class="more-action" 
						@click.stop="moreOperations(item.article_id[0]._id)"
					>···</view> -->
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