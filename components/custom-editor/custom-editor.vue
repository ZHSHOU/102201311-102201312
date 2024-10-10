<script lang="ts" setup name="custom-editor">
import { reactive, ref, watch } from "vue";

const emit = defineEmits(["setEditerValue", "init"]);
const props = defineProps({
	editorContent: {
		type: String,
		default: ''
	}
});
const content = ref<string>("")

watch(
  () => props.editorContent,
  (val) => {
	content.value = val;
	
	if (editorIns.value) setContent();
  },
  { deep: true }
);

const state = reactive({
	content: '', // 富文本编辑内容
	text: '', // 富文本编辑内容-纯文本
})
// 富文本实例
const editorIns = ref();

/**
 * 富文本编辑器初始化加载完成 
 * editorIns.value.setContents() 用来设置富文本中的内容
 */
const initEditor = (editor : any) => {
	// 保存编辑器实例
	editorIns.value = editor;
	
	setContent();
}

/**
 * 获取富文本中输入的内容
 */
const inputOver = (e : { html: string; text: string}) => {
	state.content = e.html;
	state.text = e.text;
	
	// 通知父页面更新数据
	emit("setEditerValue", {
		html: e.html,
		text: e.text
	})
}

/**
 * 富文本中图片上传
 */
const upinImage = (
	tempFiles : {
		fileType : string;
		size : number | string;
		tempFilePath : string
	}[],
	editorCtx : any
) => {
	/**
	 * 本地临时插入图片预览
	 */
	// // #ifdef MP-WEIXIN
	// // 注意微信小程序的图片路径是在tempFilePath字段中
	// editorCtx.insertImage({
	// 	src: tempFiles[0].tempFilePath,
	// 	width: '80%', // 默认不建议铺满宽度100%，预留一点空隙以便用户编辑
	// 	success: function () { }
	// })
	// // #endif

	// // #ifndef MP-WEIXIN
	// editorCtx.insertImage({
	// 	src: tempFiles[0].path,
	// 	width: '80%', // 默认不建议铺满宽度100%，预留一点空隙以便用户编辑
	// 	success: function () { }
	// })
	// // #endif

	tempFiles.forEach(async (item : any) => {
		uni.showLoading({
			title: '上传中请稍后',
			mask: true
		})
		try {
			// #ifdef APP-PLUS || H5
			
			let {
				fileID
			} = await uniCloud.uploadFile({
				filePath: item.path,
				cloudPath: `cloudstorage/${item.name}`,
				cloudPathAsRealPath: true,
				fileType: "image"
			});
			
			// #endif
			
			// #ifdef MP-WEIXIN
			// 使用 split 和最后一个 split 元素来获取文件名
			const fileName = item.tempFilePath.split('\\').pop().split('/').pop();
			
			let {
				fileID
			} = await uniCloud.uploadFile({
				filePath: item.tempFilePath,
				cloudPath: `cloudstorage/${fileName}`,
				cloudPathAsRealPath: true,
				fileType: "image"
			});
			
			// #endif
			
			// 支付宝云跟腾讯云需要将文件id转换
			const tempRes = await uniCloud.getTempFileURL({
				fileList: [fileID]
			});
			
			editorCtx.insertImage({
				// src: fileID,
				src: tempRes.fileList[0].tempFileURL,
				width: '100%',
				success: function () {
					uni.hideLoading()
				}
			})
		} catch (err) {
			uni.showToast({
				title: "图片上传失败，请联系管理员！",
				icon: "none"
			})
			uni.hideLoading()
			console.log("图片上传失败---", err)
		}
	})
}

/**
 * 超出最大内容限制
 */
const overMax = (e : { html: string; text: string}) => {
	// 若设置了最大字数限制，可在此处触发超出限制的回调
	console.log('==== overMax :', e)
	uni.showToast({
		title: "输入内容超过最大字数限制！",
		icon: 'none'
	})
};


/**
 * 将富文本编辑器内容抛出去
 */
const setContent = () => {
	editorIns.value.setContents({
		html: content.value
	})
}

// 暴露
defineExpose({
	state,
	setContent
})

</script>

<template>
	<!-- 富文本编辑器 -->
	<view style="height: 100%;">
		<sp-editor 
			:toolbar-config="{
			  excludeKeys: ['direction', 'date', 'lineHeight', 'letterSpacing', 'listCheck'],
			  iconSize: '18px'
			}" 
			@init="initEditor" 
			@input="inputOver" 
			@upinImage="upinImage" 
			@overMax="overMax"
		></sp-editor>
	</view>
</template>

<style lang="scss">

</style>