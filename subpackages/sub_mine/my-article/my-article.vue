<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { storage } from "@/utils/storage";
import { timestampToDateTime } from "@/utils"
import { ApiResponse } from '@/types/globle';

const db = uniCloud.database()
// article-我的文章(已发布) draft-我的草稿(草稿)
let code : "article" | "draft" = "draft";
let pageTitle = "";
const articList = ref<{ 
	title: string; 
	publish_date: number,
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
	const status = code === 'article' ? 1 : 0;
	db.collection("travel-articles")
		.where(`article_status == ${status} && user_id == $cloudEnv_uid && delete_status == 1`)
		.field("title, publish_date, user_id")
		.orderBy("publish_date", "desc")
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
 * 编辑
 */
const gotoEdit = (id: string) => {
	storage.set("currentRoute", `/subpackages/sub_mine/my-article/my-article?title=${pageTitle}&code=${code}`);
	storage.set("acticleId", id);
	uni.switchTab({
		url: "/pages/publish/publish"
	})
}

/**
 * 删除我的文章或草稿
 */
const deleteArticle = (rowId: string) => {
	uni.showModal({
		title: "是否确认删除？此操作不可逆！",
		success(e) {
			if (e.confirm) {
				db.collection("travel-articles").doc(rowId).remove().then(() => {
					uni.showToast({ title: "删除成功！",icon: "none" })
				}).catch((error) => {
					uni.showToast({ title: error.message || "删除失败，请联系管理员",icon: "none" })
				}).finally(() => {
					queryParams.page = 1;
					getData()
				})
			}
		}
	})
}

/**
 * 从底部向上弹出操作菜单
 */
const moreOperations = (rowId: string) => {
	uni.showActionSheet({
		itemList: ['删除', '编辑'],
		success: function (res) {
			res.tapIndex === 0 && deleteArticle(rowId);
			res.tapIndex === 1 && gotoEdit(rowId)
		},
		fail: function (res) {
			console.log(res.errMsg);
		}
	});
}

const onBack = () => {
	uni.reLaunch({
		url: "/pages/mine/mine",
		success() {
			uni.showTabBar()
		}
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
	<wd-navbar 
		:title="pageTitle" 
		fixed 
		placeholder 
		:zIndex="100" 
		:bordered="false"
		left-arrow 
		safeAreaInsetTop
		custom-style="background-color: #f8f8f8;"
		@click-left="onBack"
	>
	</wd-navbar>
	<view class="content">
		<view class="list">
			<view class="li" v-for="item in articList" :key="item['_id']" @click="gotoDetail(item._id)">
				<view class="li-title">{{ item.title }}</view>
				<view class="li-foot">
					<view class="li-time">{{ timestampToDateTime(item.publish_date) }}</view>
					<view class="more-action" @click.stop="moreOperations(item._id)">···</view>
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