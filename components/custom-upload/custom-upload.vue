<script setup lang="ts" name="custom-upload">
import { ref } from "vue";
	
// const emit = defineEmits(["setFileList"])
const fileList = ref([]);


/**
 * 文件上传前
 */
const beforeUpload = (file: any) => {
	uni.showLoading({
		title: '上传中...',
		mask: true
	})
	file.files.map(async (item: any) => {
		// 从图片路径中截取图片名称
		let imageName = item.path.substring(item.path.lastIndexOf('/') + 1) 
		// #ifdef H5
		// h5端url中不包含扩展名，可以拼接一下name
		imageName = imageName + item.name
		// #endif
		 
		try {
			let {
				fileID
			} = await uniCloud.uploadFile({
				filePath: item.path,
				cloudPath: `cloudstorage/${imageName}`,
				cloudPathAsRealPath: true,
				fileType: "image"
			});
			
			// 支付宝云跟腾讯云需要将文件id转换
			const tempRes = await uniCloud.getTempFileURL({
				fileList: [fileID]
			});
			console.log(tempRes, "上传后的tempRes")
			
			fileList.value.push({ url: tempRes.fileList[0].tempFileURL })
			// emit("setFileList", fileList.value)
			uni.hideLoading()
		} catch (err) {
			uni.hideLoading()
			console.log("图片上传失败---", err)
		}
	})
}

/**
 * 文件删除前
 */
const beforeRemove = ({ index } : { index: number}) => {
	fileList.value.splice(index, 1)
	
	// emit("setFileList", fileList.value)
}

/**
 * 图片数据回显
 */
const updateFileList = (list: any) => {
	fileList.value = list
}

// 暴露
defineExpose({
	fileList,
	updateFileList
})
</script>

<template>
	<view>
		<wd-upload
			:file-list="fileList" 
			action="#" 
			:limit="5"
			:before-upload="beforeUpload"
			:before-remove="beforeRemove"
		></wd-upload>
	</view>
</template>

<style lang="scss">

</style>