<script setup lang="ts" name="unregistered-page">
const domains = [
	"福大帮，这是福大人自己的项目管理应用！",
	"富文本创作，让每个项目都独一无二",
	"智能助手助力，灵感涌动，文字如泉涌！",
	"个性化设置，打造你的专属空间"
]

/**
 * 去登录
 */
const gotoLogin = () => {
	uni.navigateTo({
		// #ifdef MP-WEIXIN
		url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
		// #endif
		
		// #ifndef MP-WEIXIN
		url: "/uni_modules/uni-id-pages/pages/login/login-withpwd",
		// #endif
	})
}
</script>

<template>
	<view class="unregistered-content">
		<view class="title">您还未登录或登录状态已过期，登录后将开启更多精彩体验：</view>
		<view class="domains">
			<view v-for="(item, index) in domains" :key="'domains' + index">
				{{ index + 1 }}、{{ item}}
			</view>
		</view>
		<view class="login-btn">
			<wd-button plain @click="gotoLogin">去登录</wd-button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
@import "index.scss"
</style>