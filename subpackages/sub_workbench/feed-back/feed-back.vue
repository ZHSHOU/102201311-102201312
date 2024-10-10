<script lang="ts" setup>
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const db = uniCloud.database();
const state = reactive({
	feedback_content: "",
	excerpt: "",
	type: 1,
})
const editComp = ref();
const loading = ref<boolean>(false);
const feedList = ref<{ 
	label: string; 
	value: number }[]
>([
	{ label: "产品使用问题", value: 1 },
	{ label: "系统BUG", value: 2 },
	{ label: "投诉", value: 3 },
	{ label: "其他", value: 5 }
])

/**
 * 获取富文本中输入的内容
 */
const setEditerValue = (e : { html: string; text: string}) => {
	state.feedback_content = e.html;
	state.excerpt = e.text.slice(0, 160)
}

/**
 * 提交版本
 */
const onSubmit = () => {
	loading.value = true;
	db.collection("travel-feed-back").add({ ...state }).then(() => {
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
	if (option?.title === '需求采集') {
		feedList.value = [
			{ label: "提交需求", value: 4 },
		]
		state.type = 4
	}
	uni.setNavigationBarTitle({
		title: option?.title || ''
	})
})
</script>

<template>
	<view class="content">
		<view class="header">
			<button
				class="submit-btn" 
				:disabled="loading || !state.feedback_content"
				@click="onSubmit()"
			>
				<wd-icon name="file-paste" size="28rpx"></wd-icon> 确认
			</button>
		</view>
		
		<view class="feed-type">
			<wd-radio-group v-model="state.type" shape="button">
				<wd-radio 
					v-for="(item, index) in feedList" 
					:key="'feed' + index" 
					:value="item.value"
				>
					{{ item.label }}
				</wd-radio>
			</wd-radio-group>
		</view>
		
		<view class="footer-editor">
			<custom-editor
				ref="editComp"
				@setEditerValue="setEditerValue"
			/>
		</view>
	</view>
</template>

<style lang="scss" scoped>
@import "index.scss"
</style>
