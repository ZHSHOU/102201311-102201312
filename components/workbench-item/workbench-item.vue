<script setup lang="ts" name="workbench-item">
import { guid, hasOnline } from "@/utils"

const { title, gridList, menuIcon } = defineProps<{ 
	menuIcon: string;
	title: string;
	gridList: {
		icon: string;
		text: string
	}[]
}>();
const uuid = guid();

/**
 * 跳转详情
 */
const gotoDetails = (item: { icon: string; path?: string; text: string}) => {
	if (!hasOnline()) {
		return
	}
	
	if (!item.path) {
		return uni.showToast({ title: '开发中...', icon: 'none' })
	}
	
	uni.navigateTo({
		url: `/subpackages/sub_workbench/${item.path}/${item.path}?title=` + item.text
	})
}

</script>
<template>
	<view class="workbench-content">
		<view class="workbench-title">
			<wd-icon v-if="menuIcon" :name="menuIcon" size="17px"></wd-icon>
			{{ title }}
		</view>
		<wd-grid :column="4">
			<view 
				v-for="item in gridList"
				:key="item.text + uuid"
				@click="gotoDetails(item)"
			>
				<wd-grid-item
					:text="item.text" 
					use-slot
				>
					<image 
						v-if="item.icon"
						class="workbench-icon" 
						:src="'../../static/image/workbench/' + item.icon"
						mode="aspectFill" 
					/>
					<view>{{ item.text }}</view>
				</wd-grid-item>
			</view>
		</wd-grid>
	</view>
</template>

<style lang="scss" scoped>
@import "index.scss";
</style>
