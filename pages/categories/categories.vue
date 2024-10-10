<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { onLoad, onShow, onHide, onPullDownRefresh } from "@dcloudio/uni-app";
import { storage } from "@/utils/storage";
import { curHasLogin, timestampToDateTime } from "@/utils"
import { FabType, ClassifyItem } from "@/types/categories.d"
import { ApiResponse } from '@/types/globle.d';
import { ArticleType } from "@/types/publish.d"

const db = uniCloud.database();
const active = ref<string>("")
const scrollTop = ref<number>(0);
const fabRef = ref();
const currentRemark = ref<string>("");
let subCategories = ref<ArticleType[]>([]);
let classifyList = reactive<ClassifyItem[]>([]);
const swiperList = ref<{ url: string}[]>([]);
const loadText = ref<string>("");
const pageSize = ref<number>(10);
const isMore = ref<boolean>(true);

const pattern = {
	color: '#7A7E83',
	backgroundColor: '#fff',
	selectedColor: '#00bcff',
	buttonColor: '#00bcff',
	iconColor: '#fff'
};
const defalutObj: ClassifyItem[] = [
	{
		categoryName: "其他",
		delete_status: 1,
		last_modify_date: Date.now(),
		publish_date: Date.now(),
		publish_ip: "",
		remark: "系统提示：其他类型下所有数据皆未分类",
		user_id: "",
		_id: "-1"
	}
];
const fabMenu = ref<FabType[]>([{
		iconPath: '/static/image/categories/leibie.png',
		selectedIconPath: '/static/image/categories/leibie-s.png',
		text: '分类',
		active: false,
		path: "/subpackages/sub_categories/categories-add/categories-add"
	},
	{
		iconPath: '/static/image/categories/article.png',
		selectedIconPath: '/static/image/categories/article-s.png',
		text: '文章',
		active: false,
		path: "/pages/publish/publish"
	},
	// {
	// 	iconPath: '/static/image/categories/lunbotu.png',
	// 	selectedIconPath: '/static/image/categories/lunbotu-s.png',
	// 	text: '轮播图',
	// 	active: false,
	// 	path: ""
	// }
])

/**
 * 查询当前登陆人分类列表
 */
const getClassifyList = async () => {
	if (!curHasLogin().hasLogin) {
		return uni.stopPullDownRefresh()
	}
	uni.showLoading({
		title: "加载中..."
	})
	await db.collection("travel-classify")
		.where(`user_id == $cloudEnv_uid && delete_status == 1`)
		.get().then((response: ApiResponse) => {
			classifyList = response.result.data.length ? 
				[...response.result.data, ...defalutObj] : defalutObj;
				
			active.value = classifyList[0]._id;
			currentRemark.value = classifyList[0].remark;
			swiperList.value = (classifyList[0]?.fileList || []).map((item: { url: string}) => item.url)
			// 获取当前分类下的文章
			getCurrentArtList()
		}).finally(() => uni.hideLoading())
}

/**
 * 获取当前分类下的文章列表
 */
const getCurrentArtList = async () => {
	loadText.value = "加载中..."
	const classifyId = active.value == "-1" ? "" : active.value;
	await db.collection("travel-articles")
		.where(`user_id == $cloudEnv_uid && article_status == 1 && delete_status == 1 && classify_id == "${classifyId}"`)
		.field("classify_id, user_id, title, excerpt, publish_date")
		.orderBy("publish_date", "desc")
		.skip(subCategories.value.length)
		.limit(pageSize.value)
		.get().then((response: ApiResponse) => {
			const result = response.result.data;
			if (!subCategories.value.length && result.length < pageSize.value) {
				// 第一页且数据不足pageSize的长度时，直接返回暂无更多数据
				isMore.value = false
			}
			if (result.length === 0) {
				// 没更多数据
				return isMore.value = false
			}
			
			subCategories.value = [...subCategories.value, ...result]
		}).finally(() => {
			loadText.value = isMore.value ?  "上拉加载更多" : "暂无更多数据"
			uni.stopPullDownRefresh()
		})
}

/**
 * 预览轮播图
 */
const previewSwiperImage = (index: number) => {
	uni.previewImage({
		urls: swiperList.value,
		current: index
	})
}

/**
 * 侧边栏菜单点击时
 */
const handleChange = ({ value }: { value: string }) => {
	const findObj = classifyList.find((e: ClassifyItem) => e._id == value );
	subCategories.value = [];
	loadText.value = "加载中...";
	active.value = value;
	currentRemark.value = findObj?.remark || '';
	swiperList.value = (findObj?.fileList || []).map((item: { url: string}) => item.url)
	
	getCurrentArtList()
}

/**
 * 悬浮按钮内菜单点击时
 */
const uniFabTrigger = (e: { index: number, item: FabType}) => {
	fabMenu.value.forEach((item: FabType, i: number) => item.active = e.index === i);
	
	const path = e.item.path;
	if (!path) {
		return 
	}
	fabRef.value.close();
	fabMenu.value[e.index].active = false;
	path.includes("publish") ?
		uni.switchTab({ url: path }) : uni.navigateTo({ url: path })
}

/**
 * 跳转详情
 */
const gotoDetail = (id: string | undefined) => {
	uni.navigateTo({
		url: "/subpackages/sub_home/article-details/article-details?id=" + id
	})
}

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
	isMore.value = true;
	subCategories.value = []
	getClassifyList()
})

/**
 * scroll-view 区域上拉加载
 */
const scrolltolower = () => {
	isMore.value &&	getCurrentArtList()
}

onLoad(() => {
	getClassifyList();
})

/**
 * 页面hide时设置缓存，主要用于发布页面返回时所需参数
 */
onHide(() => {
	storage.set("currentRoute", "categories")
})
</script>
<template>
	<!-- 未登录状态显示 -->
	<unregistered-page v-if="!curHasLogin().hasLogin" />
	
	<view class="wraper" v-else>
		<wd-sidebar v-model="active" @change="handleChange">
			<wd-sidebar-item 
				v-for="item in classifyList" 
				:key="item._id" 
				:value="item._id" 
				:label="item.categoryName"
			/>
		</wd-sidebar>
		
		<view class="content">
			<scroll-view
				class="category" 
				scroll-y 
				scroll-with-animation
				:show-scrollbar="false"
				:scroll-top="scrollTop" 
				:throttle="false"
				@scrolltolower="scrolltolower"
			>
				<view style="padding: 20rpx;" v-if="swiperList.length">
					<swiper
						class="swiper" 
						circular 
						:indicator-dots="false" 
						:autoplay="true" 
						interval="8000"
					>
						<swiper-item 
							class="banner-item" 
							v-for="(item, index) in swiperList" :key="'ca-banner' + index"
						>
							<image :src="item" mode="" @click="previewSwiperImage(index)"></image>
						</swiper-item>
					</swiper>
				</view>
				<view style="padding: 10rpx 20rpx;" v-if="currentRemark">
					<wd-notice-bar
						:text="currentRemark"
						type="info"
						prefix="notification"
						wrapable 
						:scrollable="false"
					/>
				</view>
				
				<wd-cell-group border>
					<wd-cell 
						v-for="cell in subCategories" 
						:key="cell._id" 
						:title="cell.title" 
						:label="timestampToDateTime(cell.publish_date)"
						clickable
						@click="gotoDetail(cell._id)"
					>
					</wd-cell>
				</wd-cell-group>
				
				<view class="load-text">{{ loadText }}</view>
			</scroll-view>
		</view>
		
		<uni-fab
			ref="fabRef"
			:pattern="pattern"
			:content="fabMenu"
			horizontal="right"
			vertical="bottom"
			direction="horizontal"
			@trigger="uniFabTrigger"
		></uni-fab>
	</view>
</template>

<style lang="scss" scoped>
@import "./index.scss"
</style>