<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ApiResponse } from '@/types/globle';
import { FeedbackItem } from "@/types/workbench"

const db = uniCloud.database();
const loadState = ref<boolean>(true);
const rowId = ref<string>("");
const result = ref<FeedbackItem>();

/**
 * 获取最新版本内容
 */
const getData = () => {
	db.collection("travel-feed-back")
		.where(`_id == "${rowId.value}"`)
		.get({ 
			getOne: true ,
		}).then((response: ApiResponse) => {
			result.value = response.result.data
		}).finally(() => {
			loadState.value = false
		})
}

/**
 * 通过process_status类型转换文本
 */
const convertText = (type: number): string => {
    const textMap: { [key: number]: string } = {
        1: '待处理',
        2: '已处理',
        3: '不予处理',
    };

    // 检查type是否在映射表中，如果不在则抛出错误
    if (!textMap.hasOwnProperty(type)) {
        throw new Error(`无效的类型编号: ${type}, 请确保type在1到5之间.`);
    }

    return textMap[type];
};


onLoad((option) => {
	rowId.value = option?.id || ''
	getData()
})
</script>

<template>
	<view class="content">
		<view class="skeleton" v-if="loadState">
			<wd-skeleton animation="gradient" theme="paragraph" />
		</view>
		
		<view v-else>
			<view class="feed-title">处理进展：<text>{{ convertText(result.process_status) }}</text></view>
			<view class="feed-title">回复内容：<text>{{ result?.process_result || '' }}</text></view>
			<wd-divider>留言详情</wd-divider>
			<mp-html :content="result.feedback_content" />
		</view>
	</view>
	
</template>

<style lang="scss" scoped>
@import "index.scss"
</style>
