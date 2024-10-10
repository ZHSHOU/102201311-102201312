<script lang="ts" setup>
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { store } from "@/uni_modules/uni-id-pages/common/store";
import { ApiResponse } from '@/types/globle';
import { ArticleType } from "@/types/publish.d";
import { timestampToDateTime, processImageWidth, hasOnline } from "@/utils"
import { executeLikeOperation } from "@/utils/commonCloud";
import defalutAvatar from "@/static/image/default-avatar.png"

const db = uniCloud.database();
const travelUtils = uniCloud.importObject("travel-utils", {
	customUI: true
});
const loadState = ref<boolean>(true);
const artId = ref<string>("");
const detailData = ref<ArticleType>();
const richText = ref<string>("");
const isLike = ref<boolean>(false);
const lastTime = ref<number>(0);

/**
 * 查询详情
 */
const getData = async () => {
	loadState.value = true
	const artTemp = db.collection("travel-articles").where(`_id == "${artId.value}"`).getTemp();
	const userTemp = db.collection("uni-id-users").field(
		"_id, username, nickname, avatar_file"
	).getTemp();
	const likeTemp = db.collection("travel-like")
		.where(`article_id == "${artId.value}" && user_id == $cloudEnv_uid`)
		.getTemp();
	
	// 未登录也可查看详情
	const tempList = [artTemp, userTemp];
	if (store.hasLogin) {
		tempList.push(likeTemp)
	}
	
	await db.collection(...tempList).get({
		getOne: true // 获取单条 
	}).then((response : ApiResponse) => {
		if (!response.result.data) {
			return checkParams()
		}
		detailData.value = response.result.data;
		richText.value = processImageWidth(response.result.data.content);
		
		if (store.hasLogin) {
			// 登录状态才查看是否点赞过该内容
			isLike.value = response.result.data._id["travel-like"].length ? true : false
		}
	}).catch((err) => {
		console.log("查询详情err---", err)
	}).finally(() => {
		loadState.value = false
	})
}

/**
 * 更新阅读量
 */
const readUpdate = async () => {
	await travelUtils.customOperation("travel-articles", "view_count", artId.value)
}

/**
 * 点赞，处理页面展示和防频繁操作
 */
const onLike = async () => {
	if (!hasOnline()) {
		return
	}
	
	const curTime = Date.now();
	if (curTime - lastTime.value < 2000) {
		return uni.showToast({ title: '操作太频繁，请稍后...', icon: "none" })
	}
	// @ts-ignore
	isLike.value ? detailData.value.like_count-- : detailData.value.like_count++
	isLike.value = !isLike.value;
	lastTime.value = curTime
	
	executeLikeOperation(artId.value)
}

/**
 * 参数检验，防止页面报错
 */
const checkParams = () => {
	uni.showToast({ title: "参数有误", icon: "none" });
	setTimeout(() => {
		uni.reLaunch({
			url: "/pages/home/home"
		})
	}, 1500)
}

onShareAppMessage(() => {
	return {
		title: detailData.value?.title || '福大帮，这是福大人自己的项目管理应用！',
		path: '/subpackages/sub_home/article-details/article-details?id=' + artId.value
	}
})

onLoad((option) => {
	if (!option?.id) {
		return checkParams()
	}
	artId.value = option?.id
	getData();
	readUpdate()
})

// --------------------------------------留言板

import CComment from "@/components/cc-comment/index";
import { ref } from "vue";

// 唤起新评论弹框
let ccRef = ref(null);
function openComment() {
  ccRef.value.newCommentFun();
}

// 点赞回调事件
function likeFun({ params }, callback) {
  console.log("likeFun", params);
  // 当请求失败, 调用callback重置点赞效果;
  // Demo如下:
  // axios.post("http://xxx/like", { id: params }).then((res) => {
  //   if (res.code !== 0) {
  //     callback(res);
  //   }
  // });
}

// 评论回调事件
function replyFun({ params }, callback) {
  console.log("replyFun", params);
  // 当请求成功, 调用callback执行评论插入;
  // Demo如下:
  // axios.post("http://xxx/reply", { ...params }).then((res) => {
  //   if (res.code === 0) {
  //     callback(res);
  //   }
  // });
  const res = { id: Math.random() }; // 很重要的回参! 必须拿到后端返回评论id! 删除需要!
  setTimeout(() => callback(res), 500); // 目前为了展示效果, 直接执行callback
}

/** 删除回调事件
 * mode 删除模式
 * -- bind: 当被删除的一级评论存在回复评论, 那么该评论内容变更显示为[当前评论内容已被移除]
 * -- only: 仅删除当前评论(后端删除相关联的回复评论, 否则总数显示不对)
 * -- all : 删除所有评论包括回复评论
 */
const deleteMode = ref("all");
function deleteFun({ params, mode }, callback) {
  console.log("deleteFun", { params, mode });
  // 当请求成功, 调用callback执行评论删除;
  switch (deleteMode) {
    case "bind":
      // 逻辑: 调用接口进行评论内容修改 update
      setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
      break;
    case "only":
      // 逻辑: 调用接口删除一个评论 delete
      setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
      break;
    default:
      // all
      // 逻辑: 调用接口删除多个评论 [delete]
      // Demo如下:
      // axios.post("http://xxx/delete", { ids: params }).then((res) => {
      //   if (res.code === 0) {
      //     callback(res);
      //   }
      // });
      setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
      break;
  }
}

// ----模拟数据------模拟数据------模拟数据----
// 作者信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
let userInfo = ref({
  id: 120, // 评论id
  user_name: "uesr", // 用户名
  user_avatar:
    "https://s2.loli.net/2024/10/10/aTg1NLHBmwnEAh6.jpg", // 用户头像
});
let tableTotal = ref(6); // 评论总数
let tableData = ref([
  {
    id: 120, // 评论id
    parent_id: null, // 父级评论id
    reply_id: null, // 被回复人评论id
    reply_name: null, // 被回复人名称
    user_name: "陈言泷", // 用户名
    user_avatar:
      "https://s2.loli.net/2024/10/10/SOqaM41PAxf6uXk.jpg", // 评论者头像地址
    user_content: "有意向加入的同学可以通过邮箱联系我", // 评论内容
    is_like: false, // 是否点赞
    like_count: 120, // 点赞数统计
    create_time: "2024-10-10 09:16", // 创建时间
  },
  {
    id: 130,
    parent_id: 120, // 评论的父级id
    reply_id: 120, // 被回复评论id
    reply_name: "陈言泷", // 被回复人名称
    user_name: "张硕", // 用户名
    user_avatar:
      "https://s2.loli.net/2024/10/10/zDrKbt9gENhpQao.jpg", // 评论者头像地址
    user_content: "弱弱地问一下人满了吗？", // 评论内容
    is_like: false, // 是否点赞
    like_count: 67, // 点赞数统计
    create_time: "2024-10-10 09:20", // 创建时间
  },
  {
    id: 140,
    parent_id: 120, // 评论的父级id
    reply_id: 130, // 被回复评论id
    reply_name: "张硕", // 被回复人名称
    user_name: "张俊超", // 用户名
    user_avatar:
      "https://s2.loli.net/2024/10/10/mBOyfMloGsEPA9U.jpg", // 评论者头像地址
    user_content: "+1，我也问问", // 评论内容
    is_like: false, // 是否点赞
    like_count: 16, // 点赞数统计
    create_time: "2024-10-10 10:26", // 创建时间
  },
  {
    id: 150,
    parent_id: 120, // 评论的父级id
    reply_id: 130, // 被回复评论id
    reply_name: "张俊超", // 被回复人名称
    user_name: "陈言泷", // 用户名
    user_avatar:
      "https://s2.loli.net/2024/10/10/SOqaM41PAxf6uXk.jpg", // 评论者头像地址
    user_content: "目前人数（2/3），可以邮件我，我们具体聊聊", // 评论内容
    is_like: false, // 是否点赞
    like_count: 16, // 点赞数统计
    create_time: "2024-10-10 10:30", // 创建时间
  },
  {
    id: 140,
    parent_id: 120, // 评论的父级id
    reply_id: 130, // 被回复评论id
    reply_name: "张硕", // 被回复人名称
    user_name: "陈言泷", // 用户名
    user_avatar:
      "https://s2.loli.net/2024/10/10/SOqaM41PAxf6uXk.jpg", // 评论者头像地址
    user_content: "目前人数（2/3），可以邮件我，我们具体聊聊", // 评论内容
    is_like: false, // 是否点赞
    like_count: 16, // 点赞数统计
    create_time: "2024-10-10 10:31", // 创建时间
  },
  {
    id: 160,
    parent_id: null, // 评论的父级id
    reply_id: null, // 被回复评论id
    reply_name: null, // 被回复人名称
    user_name: "陈尚冰", // 用户名
    user_avatar:
      "https://s2.loli.net/2024/10/10/SuF3fEy4DThZtAP.jpg", // 评论者头像地址
    user_content:
      "我有两个问题：1.楼主目前的水平。2.是否还缺编程手。期待回复", // 评论内容
    is_like: true, // 是否点赞
    like_count: 8, // 点赞数统计
    create_time: "2024-10-10 17:31", // 创建时间
  },
  
]); 

// --------------------------------------留言板


</script>

<template>
	<view class="content">
		<view class="skeleton" v-if="loadState">
			<wd-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
			<wd-skeleton :custom-style="{ width: '100%', marginLeft: '12px' }" animation="gradient" theme="paragraph" />
		</view>
		<view v-else>
			<!-- 标题区 -->
			<view class="title-bar">
				<text class="title">{{ detailData.title }}</text>
			</view>

			<!-- 作者区 -->
			<view class="author-bar">
				<image class="avatar"
					:src="detailData.user_id[0]?.avatar_file?.url ?? defalutAvatar" />
				<view class="author-info">
					<text class="username">{{ detailData.user_id[0].nickname || detailData.user_id[0].username }}</text>
					<text class="bio">{{ timestampToDateTime(detailData.publish_date) }} · 发布于{{ detailData.province }}</text>
				</view>
			</view>

			<!-- 内容区 -->
			<view class="content-area">
				<mp-html :content="richText" />
			</view>

			<!-- 点赞按钮区 -->
			<view class="like-button-bar">
				<button class="like-button" :class="isLike ? 'like-active' : ''" @click="onLike">
					<wd-icon name="thumb-up" size="34rpx"></wd-icon>
					<text v-if="detailData.like_count > 0">{{ detailData.like_count }}</text>
				</button>
			</view>

			<!-- 看过的人数区 -->
			<view class="view-count-bar">
				<text class="view-count">{{ detailData.view_count }}人看过</text>
			</view>
			
			
			<!-- 评论区组件 -->
			<view class="btn" @tap="openComment">发一条新留言</view>
			<CComment
			    ref="ccRef"
			    v-model:userInfo="userInfo"
			    v-model:tableData="tableData"
			    v-model:tableTotal="tableTotal"
			    @likeFun="likeFun"
			    @replyFun="replyFun"
			    @deleteFun="deleteFun"
			    :deleteMode="deleteMode"
			  ></CComment>
		</view>
	</view>
</template>




<style lang="scss" scoped>  
  @import "./index.scss";  
  
  .btn {
    text-align: center;  
    color: #fff;  
    padding: 20rpx;  
    margin: 20rpx;  
    border-radius: 20rpx;  
    background-color: #2979ff;  
  }  
</style>  