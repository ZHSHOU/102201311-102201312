<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onLoad, onHide, onPullDownRefresh, onReachBottom, onShareAppMessage } from "@dcloudio/uni-app";
import { store } from "@/uni_modules/uni-id-pages/common/store";
import { storage } from "@/utils/storage";
import { TabType } from "@/types/home.d"
import { ApiResponse } from '@/types/globle';
import { ArticleType } from "@/types/publish.d"

const db = uniCloud.database();
const dbCmb = db.command;
let articList = ref<ArticleType[]>([]);
const navList = reactive<TabType[]>([
	{ title: "最新", name: "latest" },
	{ title: "热门", name: "hot" },
	{ title: "竞赛", name: "competition" },
	{ title: "科研", name: "science" },
	{ title: "创业", name: "job" },
])
const active = ref<string>("latest");
const currentTabName = ref<string>("latest");
const loadText = ref<string>("");
const queryParams = reactive({
	page: 1,
	pageSize: 10,
	total: 0
});
const isMore = ref<boolean>(true);

/**
 * 获取列表数据 临表查询
 */
const getDataList = async () => {
	const { pageSize } = queryParams;
	loadText.value = "加载中..."
	
	// 更新------------------------------------------------------------
	// 构建标签查询条件  
	// 要在文章的数据表中添加 tag 字段
	// 要在发布文章时增加 tag属性，传给数据库
	    let tagCondition = null;  
	    switch (currentTabName.value) {  
	        case 'competition':  
	            tagCondition = "tag == '竞赛'";  
	            break;  
	        case 'science':  
	            tagCondition = "tag == '科研'";  
	            break;  
	        case 'job':  
	            tagCondition = "tag == '创业'";  
	            break;  
	        case 'latest':  
	            tagCondition = ""; // 按时间排序，不加标签条件  
	            break;  
	        case 'hot':  
	            tagCondition = ""; // 按热门排序，不加标签条件  
	            break;  
	    }  
	// ------------------------------------------------------------------
	
	// 查询状态为已发布且未删除且公开的文章
	// 并根据 tagCondition 的值决定是否添加额外的查询条件
	const artTemp = db.collection("travel-articles")
		// .where("article_status == 1 && delete_status == 1 && is_open == true")
		.where(`article_status == 1 && delete_status == 1 && is_open == true ${tagCondition ? `&& ${tagCondition}` : ''}`)
		.field("user_id, view_count, like_count, comment_count, title, excerpt, picurls, publish_date")
		.orderBy(currentTabName.value === 'latest' ? "publish_date" : "view_count", "desc")
		// .skip((page - 1) * pageSize)
		.skip(articList.value.length)
		.limit(pageSize)
		.getTemp();
	
	// 获取当前文章对应发布人的信息
	const userTemp = db.collection("uni-id-users").field(
		"_id, username, nickname, avatar_file"
	).getTemp();
	
	// 查询列表 getCount-返回总数
	await db.collection(artTemp, userTemp).get({ getCount: true }).then(async (response : ApiResponse) => {
		const result = response.result.data;
		
		if (!articList.value.length && result.length < pageSize) {
			// 第一页且数据不足pageSize的长度时，直接返回暂无更多数据
			isMore.value = false
		}
		
		if (result.length === 0) {
			// 没更多数据
			return isMore.value = false
		}
		
		// 登录后获取点赞详情
		if (store.hasLogin) {
			const { uid } = uniCloud.getCurrentUserInfo();
			let idArr: string[] = [];
			
			// 获取当前用户点赞的文章列表
			result.forEach((item: ArticleType) => idArr.push(item._id as string));
			const likeRes: ApiResponse = await db.collection("travel-like").where({
				"article_id": dbCmb.in(idArr),
				"user_id": uid
			}).get();
			
			// 给点赞过的文章添加isLike属性，用于点赞高亮
			likeRes.result.data.forEach((ele: any) => {
				let findIdx = result.findIndex((likeItem: any) => ele.article_id == likeItem._id);
				result[findIdx].isLike = true
			})
		}
		
		// 赋值
		queryParams.total = response.result?.count || 0;
		articList.value = [...articList.value, ...result]
	}).catch(() => {
		isMore.value = false;
	}).finally(() => {
		loadText.value = isMore.value ?  "上拉加载更多" : "暂无更多数据"
		uni.stopPullDownRefresh()
	})
}

/**
 * tab change时查询数据
 */
const tabsChange = (e : TabType) => {
	currentTabName.value = e.name;
	articList.value = [];
	isMore.value = true;
	getDataList()
}

/**
 * 删除数据后进行列表刷新 做无感操作，直接将页面上的当条数据移除
 * @param delId 被删除的那条id
 */
const updateList = (delId: string | undefined) => {
	const findIdx = articList.value.findIndex((item: ArticleType) => item._id === delId)
	if (findIdx !== -1) {
		articList.value.splice(findIdx, 1)
	}
}

/**
 * 跳转详情
 */
const gotoDetail = (id: string | undefined) => {
	uni.navigateTo({
		url: "/subpackages/sub_home/article-details/article-details?id=" + id
	})
}

onShareAppMessage(() => {
	return {
		title: '福大帮，这是福大人自己的项目管理应用！',
		path: '/pages/home/home',
	}
})

/**
 * 页面加载完成
 */
onLoad(() => {
	uni.showTabBar();
	getDataList()
})

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
	articList.value = [];
	isMore.value = true;
	getDataList()
})

/**
 * 上拉加载
 */
onReachBottom(() => {
	isMore.value &&	getDataList()
})

/**
 * 页面hide时设置缓存，主要用于发布页面返回时所需参数
 */
onHide(() => {
	storage.set("currentRoute", "home")
})
</script>

<template>
	<view class="content">
		<wd-tabs v-model="active" animated swipeable @change="tabsChange">
			<block v-for="item in navList" :key="item.name">
				<wd-tab :title="item.title" :name="item.name">
					<scroll-view scroll-y="true">
						<view class="main">
							<wd-gap height="85rpx"></wd-gap>
							
							<view class="alone" v-for="item in articList" :key="item._id" @click="gotoDetail(item._id)">
								<blog-item :blog="item" @updateList="updateList(item._id)" />
							</view>
							<view class="load-text">{{ loadText }}</view>
						</view>
					</scroll-view>
				</wd-tab>
			</block>
		</wd-tabs>
	</view>
</template>

<style lang="scss" scoped>
@import "index.scss";
</style>