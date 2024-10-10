<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { ApiResponse } from "@/types/globle.d";

const db = uniCloud.database();
const rowId = ref<string>("")
const model = reactive<{
	categoryName : string
	remark: string,
}>({
	categoryName: '', // 类别名称
	remark: "", // 备注
})
const uploadComp = ref();
const form = ref();
const loading = ref<boolean>(false);

const rules : FormRules = {
	categoryName: [
		{
			required: true,
			message: '请输入分类名称',
			validator: (value) => {
				if (value) {
					return Promise.resolve()
				} else {
					return Promise.reject('请输入分类名称')
				}
			}
		}
	]
}

/**
 * 查询分类详情
 */
const getCategoriesDetail = () => {
	db.collection("travel-classify").doc(rowId.value).get({ getOne: true }).then((response: ApiResponse) => {
		if (response.result.errCode === 0) {
			const { categoryName, remark, fileList } = response.result.data;
			model.categoryName = categoryName;
			model.remark = remark;
			
			uploadComp.value.updateFileList(fileList)
		}
	}).catch(() => {
		uni.showToast({
			title: '系统错误，请联系管理员',
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
	})
}

/**
 * 计算确认按钮是否可操作
 */
const isOperable = computed(() => {
	// 发布中 或 分类名称为空时 不可操作
	if (loading.value || !model.categoryName) {
		return true
	}
	return false
})

/**
 * 提交表单 查询分类名称是否存在
 */
const handleSubmit = () => {
	// @ts-ignore
	form.value.validate().then(async ({ valid }) => {
		if (valid) {
			loading.value = true;
			// 查询当前登陆人未删除的
			await db.collection("travel-classify")
				.where(`categoryName == "${model.categoryName}" && user_id == $cloudEnv_uid && delete_status == 1`)
				.get().then((response: ApiResponse) => {
					const result = response.result.data;
					if (!result.length) {
						return saveClassify()
					}
					
					if (rowId.value && result[0]._id === rowId.value) {
						// 更新的情况下 有可能只改了别的字段
						saveClassify()
					} else {
						loading.value = false;
						return uni.showToast({ title: "当前分类名称已存在！", icon: "none" })
					}
				}).catch((error) => {
					loading.value = false;
					return uni.showToast({
						title: "保存失败，请联系管理员",
						icon: "none",
					})
				})
		}
	})
}

/**
 * 保存分类
 */
const saveClassify = () => {
	// 过滤掉图片列表无用的参数
	let fileList = uploadComp.value.fileList.map((item: any) => {
		return {
			url: item.url
		}
	});
	const params = {
		categoryName: model.categoryName,
		remark: model.remark,
		fileList
	}
	const dbCollection = db.collection("travel-classify"); 
	// 根据isEdit的值决定是更新还是添加文章
	const operation = rowId.value ? 
		dbCollection.doc(rowId.value).update(params) : 
		dbCollection.add(params);  

	operation.then((response: ApiResponse) => {
		console.log("==== 分类", response)
		uni.showToast({
			title: rowId.value ? '更新成功': '保存成功',
			icon: "none",
		})
		setTimeout(() => {
			loading.value = false;
			uni.reLaunch({
				url: "/pages/categories/categories",
			})
		}, 1500)
	}).catch((error) => {
		loading.value = false;
		uni.showToast({
			title: "保存失败，请联系管理员",
			icon: "none",
		})
	})
}

onLoad((option) => {
	if (option?.id) {
		rowId.value = option?.id;
		
		// 获取分类详情
		getCategoriesDetail()
	}
})
</script>

<template>
	<view>
		<wd-form ref="form" :model="model" :rules="rules">
			<wd-cell-group custom-class="group" title="基础信息" border>
				<wd-input 
					label="分类名称" 
					label-width="100px" 
					:maxlength="20" 
					show-word-limit 
					prop="categoryName" 
					required
					clearable 
					v-model="model.categoryName" 
					placeholder="请输入分类名称"
				/>
				<wd-textarea 
					label="备注" 
					label-width="100px" 
					type="textarea" 
					v-model="model.remark" 
					:maxlength="300"
					show-word-limit 
					placeholder="请输入备注信息"
					clearable 
				/>
				
				<wd-cell title="轮播图" title-width="100px">
					<custom-upload ref="uploadComp" />
				</wd-cell>
			</wd-cell-group>

			<view class="footer">
				<wd-button 
					type="primary" 
					size="large"
					:disabled="isOperable"
					@click="handleSubmit" 
					block
				>保存</wd-button>
			</view>
		</wd-form>
	</view>
</template>

<style>
	@import "index.scss"
</style>