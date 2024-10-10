<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ApiResponse } from '@/types/globle';

const db = uniCloud.database();
const richText = ref<string>("");
const loadState = ref<boolean>(true);

/**
 * 获取最新版本内容
 */
const getData = () => {
	db.collection("travel-version")
		.orderBy("publish_date", "desc")
		.get({ 
			getOne: true ,
		}).then((response: ApiResponse) => {
			richText.value = response.result.data?.version_content || ''
		}).finally(() => {
			loadState.value = false
		})
}

onLoad(() => {
	getData()
})
</script>

<template>
	<view class="content">
		<view class="skeleton" v-if="loadState">
			<wd-skeleton animation="gradient" theme="paragraph" />
		</view>
		
		<view class="rich-wrap">
			<mp-html :content="richText" />
		</view>
	</view>
</template>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	
	.rich-wrap {
		font-size: 28rpx;
		line-height: 1.5;
	}
}
</style>
