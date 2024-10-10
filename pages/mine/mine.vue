<script lang="ts" setup>
import { computed, reactive } from "vue"
import { onHide, onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { storage } from "@/utils/storage";
import { getTimeAgo, hasOnline } from "@/utils"
import { store } from "@/uni_modules/uni-id-pages/common/store";
import { ApiResponse } from '@/types/globle';
import { menuItemType } from "@/types/mine.d";

const db = uniCloud.database();
const hasLogin = computed(() => {
	return store.hasLogin
})

const userInfo = computed(() => {
	return store.userInfo
})

/**
 * 获取昵称展示
 */
const getNickName = computed(() => {
	return store.userInfo.nickname 
		|| store.userInfo.username 
		|| store.userInfo.mobile
		|| '微信用户'
})

const statistical = reactive({
	artNum: 0, // 发文数
	receivedLikes: 0, // 获赞数
	commentNum: 0, // 评论数
})

const swiperList = reactive<{ image: string; text: string}[]>([
	{ 
		image: "../../static/image/default-notice.jpg",
		text: "福大帮，棒棒棒！"
	},
	{
		image: "../../static/image/default-notice2.jpg",
		text: "AI助手，路书轻松写！世界听你说"
	}
])

const aboutList: menuItemType[] = [
	{
		title: '我的点赞',
		icon: 'thumb-up',
		path: 'my-like-article',
	},
	// {
	// 	title: '评论过的',
	// 	icon: 'edit-1',
	// 	path: 'browse-list'
	// },
	{
		title: '我的分类',
		icon: 'view-module',
		path: 'my-classify',
	},
	{
		title: '我的草稿',
		icon: 'bianjiliebiao',
		path: 'my-article',
	},
	{
		title: '我的留言',
		icon: 'discount',
		path: 'my-feedback',
	}
]

const serverList: menuItemType[] = [
	{
		title: '联系作者',
		icon: 'chat',
		path: "chat"
	},
	// {
	// 	title: '关于',
	// 	icon: 'books',
	// 	path: 'help'
	// },
	// {
	// 	title: '意见反馈',
	// 	icon: 'add-rectangle',
	// 	path: 'help'
	// },
	{
		title: '版本',
		icon: 'chart-bubble',
		path: 'version',
	}
]

/**
 * 获取统计数据
 */
const getStatisticalData = async () => {
	if (!store.hasLogin) {
		return
	}
	
	// 发布文章数 过滤掉删除的（delete_status为0的为已删除）跟 草稿和审核的（article_status 0-草稿 2-审核中）
	let artCount: ApiResponse = await db.collection("travel-articles")
		.where(`user_id == $cloudEnv_uid && delete_status == 1 && article_status == 1`)
		.count();
	const { total } = artCount.result;
	statistical.artNum = total;
	
	// 获赞数
	let likeCount: ApiResponse = await db.collection("travel-articles")
		.where(`user_id == $cloudEnv_uid`)
		.groupBy("user_id")
		.groupField('sum(like_count) as likeTotal')
		.get();
	
	if (likeCount.result.data.length) {
		const { likeTotal } = likeCount.result.data[0];
		statistical.receivedLikes = likeTotal
	}
}


/**
 * 处理菜单点击事件
 */
const processMenuTab = (item: menuItemType) => {
	if (!hasOnline() || !item.path || item.path == 'chat') {
		return
	}
	
	uni.navigateTo({
		url: `/subpackages/sub_mine/${item.path}/${item.path}?title=${item.title}`
	})
}


/**
 * 跳转个人资料 编辑信息
 */
const gotoUserInfo = () => {
	if (!hasOnline()) {
		return
	}
	uni.navigateTo({
		url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
	})
}

onShareAppMessage(() => {
	return {
		title: '福大帮，这是福大人自己的项目管理应用！',
		path: '/pages/mine/mine',
	}
})

onLoad(() => {
	getStatisticalData()
}) 

/**
 * 页面hide时设置缓存，主要用于发布页面返回时所需参数
 */
onHide(() => {
	storage.set("currentRoute", "mine")
})
</script>

<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-wrap">
			<view class="info" @click="gotoUserInfo">
				<image
					v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url"
					class="avatar" 
					mode="aspectFill" 
					:src="userInfo.avatar_file.url"
				></image>
				<image 
					v-else 
					class="avatar" 
					mode="aspectFill" 
					src="../../static/image/default-avatar.png"
				></image>
				
				<view class="info-basic">
					<view v-if="hasLogin">
						<view class="nickname">{{ getNickName }}</view>
						<view class="reg-time">注册于{{ getTimeAgo(userInfo.register_date) }}</view>
					</view>
					<view v-else>
						<view class="nickname">点击登录</view>
						<view class="reg-time">福大帮，这是福大人自己的项目管理应用！</view>
					</view>
				</view>
				
				<view class="chevron-icon">
					<wd-icon name="chevron-right" size="36rpx"></wd-icon>
				</view>
			</view>
			
		</view>

		<view class="swiper-wrap">
			<swiper 
				class="swiper" 
				circular 
				:indicator-dots="false" 
				:autoplay="false" 
				interval="8000"
				duration="600"
			>
				<swiper-item class="banner-item" v-for="(item, index) in swiperList" :key="'banner' + index">
					<image :src="item.image" mode=""></image>
					<text :class="'banner-text' + index">{{ item.text }}</text>
				</swiper-item>
			</swiper>
		</view>


		<!-- 用户功能 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell summary">
					<text>{{ statistical.receivedLikes }}</text>获赞 
					<!-- <text>{{ statistical.commentNum }}</text>评论 -->
					<text>{{ statistical.artNum }}</text>发文
				</view>
				<view class="cell" v-for="(item, index) in aboutList" :key="index" @click="processMenuTab(item)">
					<view class="cell-left">
						<wd-icon class="cell-icon" :name="item.icon" size="36rpx"></wd-icon>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="more-icon">
						<wd-icon name="chevron-right" size="36rpx"></wd-icon>
					</view>
				</view>
			</view>
		</view>

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<button 
					class="cell" 
					v-for="(item, index) in serverList" 
					:key="index"
					:open-type="item.path === 'chat' ? 'contact' : ''"
					@click="processMenuTab(item)"
				>
					<view class="cell-left">
						<wd-icon class="cell-icon" :name="item.icon" size="36rpx"></wd-icon>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="more-icon">
						<wd-icon name="chevron-right" size="36rpx"></wd-icon>
					</view>
				</button>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
@import "./index.scss"
</style>