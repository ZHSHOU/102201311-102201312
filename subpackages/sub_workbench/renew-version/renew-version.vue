<script lang="ts" setup>
import { ref, reactive } from "vue";

const db = uniCloud.database();
const state = reactive({
	version_content: "",
	excerpt: ""
})
const editComp = ref();
const loading = ref<boolean>(false);

/**
 * 获取富文本中输入的内容
 */
const setEditerValue = (e : { html: string; text: string}) => {
	state.version_content = e.html;
	state.excerpt = e.text.slice(0, 160)
}

/**
 * 提交版本
 */
const onSubmit = () => {
	loading.value = true;
	db.collection("travel-version").add({ ...state }).then(() => {
		uni.showToast({ title: "版本发布成功", icon: "none" })
		setTimeout(() => {
			loading.value = false;
			uni.navigateBack()
		}, 1500)
	}).catch((error) => {
		console.log("发布失败error----", error)
		uni.showToast({ title: "发布失败，请联系管理员", icon: "none" });
		loading.value = false
	})
}
</script>

<template>
	<view class="content">
		<view class="header">
			<button
				class="submit-btn" 
				:disabled="loading || !state.version_content"
				@click="onSubmit()"
			>
				<wd-icon name="file-paste" size="28rpx"></wd-icon> 确认
			</button>
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
