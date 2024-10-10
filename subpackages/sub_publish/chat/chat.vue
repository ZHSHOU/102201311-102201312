<script lang="ts" setup>
import { nextTick, ref, computed } from "vue";
import config from "@/utils/config.defalut"
import { MessageType } from "@/types/publish.d";
import { store } from "@/uni_modules/uni-id-pages/common/store";

const travelUtils = uniCloud.importObject("travel-utils", {
	customUI: true
});
const userInfo = computed(() => {
	return store.userInfo
});

const curLogin = 
	userInfo.value.nickname || userInfo.value.username || userInfo.value.mobile;
const watermark = `${curLogin}@${config.SYSTEM_TITLE}`

const inputValue = ref<string>("");
const scrollIntoView = ref<string>("");
const messages = ref<MessageType[]>([]);
const loading = ref<boolean>(false);

const sendMessage = async () => {
	if (inputValue.value.trim()) {
		// 添加消息到列表
		messages.value.push({
			// 消息类型：发送-send 或 接收-received
			type: 'send',
			content: inputValue.value,
			create_time: Date.now()
		});
		const inpMsg = inputValue.value;
		showLastMsg();
		// 清空输入
		inputValue.value = '';
		loading.value = true

		messages.value.push({
			type: "load",
			content: "",
			create_time: Date.now()
		})

		await getAIanswerContent(inpMsg)
	}
}

/**
 * 通过接口获取AI返回内容
 */
const getAIanswerContent = async (inpMsg : string) => {
	const lastIdx = messages.value.length - 1;
	await travelUtils.getAIAnswer(inpMsg).then((response : any) => {
		messages.value[lastIdx].type = "received"
		messages.value[lastIdx].content =
			response.code === 0 ? response.message : "系统出错，请稍后再试！"
	}).catch(() => {
		messages.value[lastIdx].type = "received"
		messages.value[lastIdx].content = "系统出错，请稍后再试！"
	}).finally(() => {
		loading.value = false;
		showLastMsg();
		
		if (messages.value.length === 2) {
			setTimeout(() => {
				uni.showToast({ title: "可长按复制哦！", duration: 2000, icon: "none" })
			}, 800)
		}
	})
}

/**
 * 滚动窗口以显示最新的一条消息
 */
const showLastMsg = () => {
	nextTick(() => {
		scrollIntoView.value = "last-msg-item"
		// 等待DOM更新，即：滚动完成
		nextTick(() => {
			scrollIntoView.value = ""
		})
	})
}

const copyText = (e: any, content: string) => {
	if (e.type === 'longpress') {
		wx.setClipboardData({
			data: content,
			success: function () {
				wx.showToast({
					title: '复制成功',
					icon: 'none',
				});
			}
		});
	}
}
</script>

<template>
	<view class="container">
		<wd-watermark :content="watermark" :width="120" :height="120" :opacity="0.2"
			:size="12"></wd-watermark>
		<scroll-view :scroll-into-view="scrollIntoView" class="chat-list" scroll-y="true" :enable-flex="true">
			<!-- 消息列表 -->
			<view class="message" v-for="(msg, index) in messages" :key="index">
				<view 
					class="message-content" 
					:class="{ 'right-message': msg.type === 'send' }" 
					@longpress="copyText($event, msg.content)"
				>
					<view v-if="msg.type === 'load'" class="loader"></view>
					
					<view v-else>{{ msg.content }}</view>
				</view>
			</view>

			<view class="tip-ai-ing" v-if="!messages.length">
				<view>
					<image src="../../../static/image/default-avatar.png"></image>
					灵感涌现时，让AI助您妙笔生花。分享您的灵感，共创精彩篇章！
				</view>
				<view class="tip-text custom-text">富强、民主、文明、和谐</view>
				<view class="tip-text">自由、平等、公正、法制</view>
				<view class="tip-text">爱国、敬业、诚信、友善</view>
			</view>

			<view id="last-msg-item" style="height: 1px;"></view>
		</scroll-view>

		<!-- 输入区域 -->
		<view class="input-wrapper">
			<input type="text" placeholder="请输入消息" v-model="inputValue" maxlength="50" :cursorSpacing="20" />
			<button :disabled="!inputValue.trim().length || loading" @click="sendMessage">发送</button>
		</view>
	</view>
	
</template>

<style lang="scss" scoped>
	@import "./index.scss"
</style>