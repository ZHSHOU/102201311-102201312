<script setup lang="ts">
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { ApiResponse } from '@/types/globle';
import { FeedbackItem } from "@/types/workbench"

const db = uniCloud.database();
const loadState = ref<boolean>(true);
const rowId = ref<string>("");
const result = ref<FeedbackItem>();
const loading = ref<boolean>(false);

const feedList = reactive<{ 
	label: string; 
	value: number }[]
>([
	{ label: "确认处理", value: 2 },
	{ label: "不予处理", value: 3 },
])

const process_status = ref<number>(2);
const process_result = ref<string>("");


/**
 * 获取当前留言内容
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
 * 提交
 */
const onSubmit = () => {
	loading.value = true;
	db.collection("travel-feed-back")
		.doc(rowId.value)
		.update({
			process_status: process_status.value,
			process_result: process_result.value
		}).then(() => {
			uni.showToast({ title: "保存成功", icon: "none" })
			setTimeout(() => {
				loading.value = false;
				uni.navigateBack()
			}, 1500)
		}).catch((error) => {
			console.log("保存失败error----", error)
			uni.showToast({ title: "保存失败，请联系管理员", icon: "none" });
			loading.value = false
		})
}


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
			<view class="header">
				<button
					class="submit-btn" 
					:disabled="loading"
					@click="onSubmit()"
				>
					<wd-icon name="file-paste" size="28rpx"></wd-icon> 确认
				</button>
			</view>
			
			<view class="feed-type">
				<wd-radio-group v-model="process_status" shape="button">
					<wd-radio 
						v-for="(item, index) in feedList" 
						:key="'feed' + index" 
						:value="item.value"
					>
						{{ item.label }}
					</wd-radio>
				</wd-radio-group>
			</view>
			<wd-textarea v-model="process_result" placeholder="请填写处理结果" />
			
			<wd-divider>留言详情</wd-divider>
			<mp-html :content="result.feedback_content" />
		</view>
	</view>
	
</template>

<style lang="scss" scoped>
@import "index.scss"
</style>
