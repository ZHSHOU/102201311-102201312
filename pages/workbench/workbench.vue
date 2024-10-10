<script lang="ts" setup>
import { onHide } from "@dcloudio/uni-app";
import { storage } from "@/utils/storage";
import { hasRole } from "@/utils"

const generalMenu = {
	title: "通用",
	menuIcon: "app",
	gridList: [
		{ icon: "general-xuqiu.png", text: "需求采集", path: 'feed-back' },
		{ icon: "general-yijian.png", text: "意见反馈", path: 'feed-back' }
	]
}

const adminMenu = {
	title: "管理员",
	menuIcon: "laptop",
	gridList: [
		{ icon: "", text: "待处理留言", path: "pend-message" },
		{ icon: "", text: "发布版本", path: 'renew-version' },
	]
}


/**
 * 页面hide时设置缓存，主要用于发布页面返回时所需参数
 */
onHide(() => {
	storage.set("currentRoute", "workbench")
})
</script>

<template>
	<view class="content">
		<view class="workbench-model">
			<!-- 通用菜单 -->
			<workbench-item
				:title="generalMenu.title"
				:menuIcon="generalMenu.menuIcon"
				:gridList="generalMenu.gridList"
			/>
			
			<!-- 管理员能看到的菜单 -->
			<workbench-item 
				v-if="hasRole()"
				:title="adminMenu.title"
				:menuIcon="adminMenu.menuIcon"
				:gridList="adminMenu.gridList"
			/>
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
