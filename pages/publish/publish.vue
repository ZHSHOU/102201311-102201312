<script lang="ts" setup>
import { ref, reactive, computed, nextTick } from "vue"
import { onShow, onUnload } from "@dcloudio/uni-app"
import { storage } from "@/utils/storage";
import { getImgList, getProvince, curHasLogin } from "@/utils"
import { ArticleType } from "@/types/publish.d"
import { ApiResponse } from "@/types/globle.d"
import { ClassifyItem } from "@/types/categories.d"

const db = uniCloud.database();
const articleParams = reactive<ArticleType>({
	title: "", // 标题
	is_open: true, // 是否公开
	classify_id: "", // 分类
	content: "", // 内容
	excerpt: "", // 摘要
	picurls: [], // 富文本中摘取的图片
	province: "" ,// 发布人省份
	// 更新------------------------------------tag
	tag: "", // 新增的标签字段
})
const editerContent = ref<string>("");
const showContainer = ref<boolean>(true);
const loading = ref<boolean>(false);
const isEdit = storage.checkCache("acticleId");
const artId = ref<string>("");
let classifyList = ref<ClassifyItem[]>([]);
const editComp = ref();

/**
 * 计算确认按钮是否可操作
 */
const isOperable = computed(() => {
	// 发布中不可操作
	if (loading.value) {
		return true
	}
	// 标题跟内容为空不可操作
	if (!articleParams.title || !articleParams.content) {
		return true
	}
	return false
})

/**
 * 页面初始化加载时
 */
const init = async () => {
	if (!curHasLogin().hasLogin) {
		return
	}
	
	// 隐藏tabbar
	uni.hideTabBar({ animation: true })
	// 设置手势滑动返回弹框，防止直接推出应用
	showContainer.value = true;
	// 获取当前省份
	// @ts-ignore
	articleParams.province = await getProvince();
	
	// 获取分类
	db.collection("travel-classify")
		.where(`user_id == $cloudEnv_uid && delete_status == 1`)
		.get().then((response: ApiResponse) => {
			if (response.result.data.length > 0) {
				classifyList.value = response.result.data
			}
		})
}

/**
 * 获取富文本中输入的内容
 */
const setEditerValue = (e : { html: string; text: string}) => {
	articleParams.content = e.html;
	articleParams.excerpt = e.text.slice(0, 160)
}

/**
 * 手动实现返回上个tabbar页面
 */
const handleBack = () => {
	const pageName = storage.get("currentRoute");
	storage.remove("acticleId");
	if (pageName.includes("my-article")) {
		// 从我的文章跟草稿进来的特殊处理
		uni.reLaunch({ url: `${pageName}` })
	}
	uni.reLaunch({
		url: `/pages/${pageName}/${pageName}`,
		success() {
			uni.showTabBar()
		}
	})
}

/**
 * 返回首页
 */
const handleBackHome = () => {
	uni.reLaunch({
		url: "/pages/home/home",
		success() {
			storage.remove("acticleId");
			uni.showTabBar()
		}
	})
}

/**
 * 手势滑动返回时判断是有内容，有则提醒是否需要存草稿
 */
const onBeforeleave = () => {
	const { title, content } = articleParams;
	if (!title || !content) {
		// 标题或内容为空时直接返回
		return handleBack()
	}
	
	uni.showModal({
		content: '是否存为草稿？',
		cancelText: "不保存",
		confirmText: "保存",
		success: (res) => {
			res.confirm && onSubmit(0);
			res.cancel && handleBack();
		}
	})
}

/**
 * 跳转AI生成界面
 */
const gotoChart = () => {
	uni.navigateTo({
		url: "/subpackages/sub_publish/chat/chat"
	})
}

/**
 * 从我的文章跟草稿进来的查询详情
 */
const getArticleDetail = () => {
	artId.value = storage.get("acticleId");
	db.collection("travel-articles")
		.where(`_id == "${artId.value}"`)
		.get({ getOne: true }).then((response: ApiResponse) => {
			const { content, excerpt, title, is_open = '', classify_id = '' } = response.result.data
			articleParams.title = title;
			articleParams.content = content;
			articleParams.excerpt = excerpt;
			articleParams.is_open = is_open;
			articleParams.classify_id = classify_id;
			
			editerContent.value = content;
		}).catch((error) => {
			console.log(error)
			uni.showToast({
				title: "获取内容详情失败，请联系管理员！",
				icon: "none"
			})
		})
}

/**
 * 确认提交
 * @param status 0-草稿箱 1-已发布 2-审核中
 */
const onSubmit = (status: number = 1) => {
	articleParams.picurls = getImgList(articleParams.content, 9);
	loading.value = true;
	
	const dbCollection = db.collection("travel-articles");  
	    
	// 根据isEdit的值决定是更新还是添加文章  
	const operation = isEdit ? 
		dbCollection.doc(artId.value).update({ ...articleParams, article_status: status }) : 
		dbCollection.add({ ...articleParams, article_status: status });  
	
	operation.then((response: ApiResponse) => {
		console.log("==== 发布", response)
		uni.showToast({
			title: "保存成功",
			icon: "none",
		})
		setTimeout(() => {
			loading.value = false;
			handleBackHome();
		}, 1500)
	}).catch(() => {
		uni.showToast({
			title: "保存失败，请联系管理员",
			icon: "none",
		})
		loading.value = false;
	})
}

/**
 * 页面显示时所作操作
 */
onShow(() => {
	init();
	isEdit && getArticleDetail()
})

// 页面卸载时显示tabbar 确保万一
onUnload(() => {
	uni.showTabBar()
})

// 预定义标签选项  
const tagOptions = ref([  
	{ label: "竞赛", value: "competition" },  
	{ label: "科研", value: "science" },  
	{ label: "创业", value: "job" },  
]);  

</script>

<template>
	<!-- #ifdef  MP-WEIXIN -->
	<page-container :show='showContainer' @beforeleave='onBeforeleave' :overlay='false'></page-container>
	<!-- #endif -->

	<wd-navbar title="发布" fixed placeholder :zIndex="100" safeAreaInsetTop custom-style="background-color: #f8f8f8;">
		<template #capsule>
			<wd-navbar-capsule @back="onBeforeleave" @back-home="handleBackHome" />
		</template>
	</wd-navbar>
	
	<!-- 未登录状态显示 -->
	<unregistered-page v-if="!curHasLogin().hasLogin" />
	
	<view class="content" v-else>
		<view class="header-seat">
			<view class="operation-area">
				<view class="ai-btn" @click="gotoChart()"></view>
				<button
					class="submit-btn" 
					:disabled="isOperable"
					@click="onSubmit()"
				><wd-icon name="file-paste" size="28rpx"></wd-icon> 确认</button>
			</view>
			
			<wd-form ref="form" :model="articleParams">
				<wd-input
					label="标题" 
					label-width="100px" 
					:maxlength="100" 
					show-word-limit 
					clearable 
					v-model="articleParams.title" 
					placeholder="请输入标题"
				/>
				<wd-cell title="是否公开" title-width="100px" center>
					<view style="text-align: left">
					  <wd-switch v-model="articleParams.is_open" />
					</view>
				</wd-cell>
				<!-- 标签选择器 -->  
				<wd-picker  
					label="标签"  
					placeholder="请选择标签"  
					label-width="100px"  
					value-key="label"  
					label-key="label"  
					size="large"  
					clearable  
					v-model="articleParams.tag"  
					:columns="tagOptions"  
				  />  
				<wd-picker
					label="我的分类"
					placeholder="请选择分类 (默认为其他)"
					label-width="100px"
					value-key="_id"
					label-key="categoryName"
					size="large"
					clearable
					v-model="articleParams.classify_id"
					:columns="classifyList"
				  />
			</wd-form>
		</view>

		<!-- 富文本编辑器 -->
		<view class="edit-box">
			<custom-editor 
				ref="editComp"
				:editorContent="editerContent"
				@setEditerValue="setEditerValue"
			/>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	@import "./index.scss"
</style>