<script lang="ts" setup>
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { store } from "@/uni_modules/uni-id-pages/common/store";
import { ApiResponse } from '@/types/globle';
import { ArticleType } from "@/types/publish.d";
import { timestampToDateTime, processImageWidth, hasOnline } from "@/utils"
import { executeLikeOperation } from "@/utils/commonCloud";
import defalutAvatar from "@/static/image/default-avatar.png"

const db = uniCloud.database();
const travelUtils = uniCloud.importObject("travel-utils", {
	customUI: true
});
const loadState = ref<boolean>(true);
const artId = ref<string>("");
const detailData = ref<ArticleType>();
const richText = ref<string>("");
const isLike = ref<boolean>(false);
const lastTime = ref<number>(0);

/**
 * 查询详情
 */
const getData = async () => {
	loadState.value = true
	const artTemp = db.collection("travel-articles").where(`_id == "${artId.value}"`).getTemp();
	const userTemp = db.collection("uni-id-users").field(
		"_id, username, nickname, avatar_file"
	).getTemp();
	const likeTemp = db.collection("travel-like")
		.where(`article_id == "${artId.value}" && user_id == $cloudEnv_uid`)
		.getTemp();
	
	// 未登录也可查看详情
	const tempList = [artTemp, userTemp];
	if (store.hasLogin) {
		tempList.push(likeTemp)
	}
	
	await db.collection(...tempList).get({
		getOne: true // 获取单条 
	}).then((response : ApiResponse) => {
		if (!response.result.data) {
			return checkParams()
		}
		detailData.value = response.result.data;
		richText.value = processImageWidth(response.result.data.content);
		
		if (store.hasLogin) {
			// 登录状态才查看是否点赞过该内容
			isLike.value = response.result.data._id["travel-like"].length ? true : false
		}
	}).catch((err) => {
		console.log("查询详情err---", err)
	}).finally(() => {
		loadState.value = false
	})
}

/**
 * 更新阅读量
 */
const readUpdate = async () => {
	await travelUtils.customOperation("travel-articles", "view_count", artId.value)
}

/**
 * 点赞，处理页面展示和防频繁操作
 */
const onLike = async () => {
	if (!hasOnline()) {
		return
	}
	
	const curTime = Date.now();
	if (curTime - lastTime.value < 2000) {
		return uni.showToast({ title: '操作太频繁，请稍后...', icon: "none" })
	}
	// @ts-ignore
	isLike.value ? detailData.value.like_count-- : detailData.value.like_count++
	isLike.value = !isLike.value;
	lastTime.value = curTime
	
	executeLikeOperation(artId.value)
}

/**
 * 参数检验，防止页面报错
 */
const checkParams = () => {
	uni.showToast({ title: "参数有误", icon: "none" });
	setTimeout(() => {
		uni.reLaunch({
			url: "/pages/home/home"
		})
	}, 1500)
}

onShareAppMessage(() => {
	return {
		title: detailData.value?.title || '福大帮，这是福大人自己的项目管理应用！',
		path: '/subpackages/sub_home/article-details/article-details?id=' + artId.value
	}
})

onLoad((option) => {
	if (!option?.id) {
		return checkParams()
	}
	artId.value = option?.id
	getData();
	readUpdate()
})
</script>

<template>
	<view class="content">
		<view class="skeleton" v-if="loadState">
			<wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
			<wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="gradient" theme="paragraph" />
		</view>
		<view v-else>
			<!-- 标题区 -->
			<view class="title-bar">
				<text class="title">{{ detailData.title }}</text>
			</view>

			<!-- 作者区 -->
			<view class="author-bar">
				<image class="avatar"
					:src="detailData.user_id[0]?.avatar_file?.url ?? defalutAvatar" />
				<view class="author-info">
					<text class="username">{{ detailData.user_id[0].nickname || detailData.user_id[0].username }}</text>
					<text class="bio">{{ timestampToDateTime(detailData.publish_date) }} · 发布于{{ detailData.province }}</text>
				</view>
			</view>

			<!-- 内容区 -->
			<view class="content-area">
				<mp-html :content="richText" />
			</view>

			<!-- 点赞按钮区 -->
			<view class="like-button-bar">
				<button class="like-button" :class="isLike ? 'like-active' : ''" @click="onLike">
					<wd-icon name="thumb-up" size="34rpx"></wd-icon>
					<text v-if="detailData.like_count > 0">{{ detailData.like_count }}</text>
				</button>
			</view>

			<!-- 看过的人数区 -->
			<view class="view-count-bar">
				<text class="view-count">{{ detailData.view_count }}人看过</text>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	@import "./index.scss"
</style>