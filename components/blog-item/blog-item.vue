<script lang="ts" setup name="blogItem">
import { ref, computed, defineProps } from "vue";	
import { guid, getTimeAgo, hasRole, hasOnline } from "@/utils"
import { executeLikeOperation } from "@/utils/commonCloud";
import { storage } from "@/utils/storage";
import { store } from "@/uni_modules/uni-id-pages/common/store";
import { ArticleType } from "@/types/publish.d"
import defalutAvatar from "@/static/image/default-avatar.png";

const db = uniCloud.database();
const { blog } = defineProps<{ blog: ArticleType }>();
const emit = defineEmits(["updateList"]);
const lastTime = ref<number>(0);

/**
 * 判断登录人是否有当前数据的操作权限 控制显隐
 */
const isShow = computed(() => {
	// 如果当前用户未登录则隐藏
	if (!store.hasLogin) {
		return false
	}
	
	// 如果登录人不是当前发布人 且 不是管理员时则隐藏
	if (store.userInfo._id !== blog.user_id[0]._id && !hasRole()) {
		return false
	}
	
	return true
})

/**
 * 获取昵称展示
 */
const getNickName = computed(() => {
	return store.userInfo.nickname 
		|| store.userInfo.username 
		|| store.userInfo.mobile
		|| '微信用户'
})

/**
 * 编辑
 */
const gotoEdit = (id: string) => {
	storage.set("acticleId", id);
	uni.switchTab({
		url: "/pages/publish/publish"
	})
}

/**
 * 删除我的文章或草稿
 */
const deleteArticle = (rowId: string) => {
	uni.showModal({
		title: "是否确认删除？此操作不可逆！",
		success(e) {
			if (e.confirm) {
				// 直接删除
				// db.collection("travel-articles").doc(rowId).remove().then(() => {
				// 	uni.showToast({ title: "删除成功！",icon: "none" });
					
				// 	// 删除成功后刷新列表
				// 	emit("updateList")
				// }).catch((error) => {
				// 	uni.showToast({ title: error.message || "删除失败，请联系管理员",icon: "none" })
				// })
				
				// 假删 将delete_status改为0
				db.collection("travel-articles").doc(rowId).update({
					"delete_status": 0
				}).then(() => {
					uni.showToast({ title: "删除成功！",icon: "none" });
					emit("updateList", rowId)
				}).catch((error) => {
					uni.showToast({ title: error.message || "删除失败，请联系管理员",icon: "none" })
				})
			}
		}
	})
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
	blog.isLike ? blog.like_count-- : blog.like_count++
	blog.isLike = !blog.isLike;
	lastTime.value = curTime
	
	executeLikeOperation(String(blog._id))
}

/**
 * 预览图片
 */
const preview = (curIndex: number) => {
	uni.previewImage({
		urls: blog.picurls,
		current: curIndex
	})
}

/**
 * 从底部向上弹出操作菜单
 */
const moreOperations = (rowId: string) => {
	uni.showActionSheet({
		itemList: ['删除', '编辑'],
		success: function (res) {
			res.tapIndex === 0 && deleteArticle(rowId);
			res.tapIndex === 1 && gotoEdit(rowId)
		},
		fail: function (res) {
			console.log(res.errMsg);
		}
	});
}
</script>
<template>
	<view>
		<wd-card type="rectangle">
			<template #title>
				<view class="blog-title">
					<image
						:src="blog.user_id[0]?.avatar_file?.url ?? defalutAvatar"
						width="40" 
						height="40" 
						alt="travel-avatar"
					/>
					<!-- <view class="user-name">{{ getNickName }}</view> -->
					<view class="user-name">{{ blog.user_id[0]?.nickname || blog.user_id[0]?.username || '微信用户' }}</view>
					<view class="create-time">
						{{ getTimeAgo(blog.last_modify_date) }}
					</view>
					<!-- <view class="blog-ellipsis">
						<wd-icon name="ellipsis" size="38rpx"></wd-icon>
					</view> -->
					<view 
						v-if="isShow"
						class="more-action" 
						@click.stop="moreOperations(blog._id)"
					>···</view>
				</view>
			</template>
			<view class="blog-body">
				<view class="body-title">{{ blog.title }}</view>
				<view class="body-tip">
					{{ blog.excerpt }}
				</view>
				<view class="body-image">
					<image
						v-for="(imageUrl, index) in blog.picurls"
						:key="guid()"
						:src="imageUrl"
						mode="aspectFill"
						lazy-load
						@click.stop="preview(index)"
					/>
				</view>
			</view>

			<template #footer>
				<view class="blog-footer">
					<view class="operation-icon">
						<wd-icon name="browse" size="36rpx"></wd-icon>
						<view>{{ blog.view_count }}</view>
					</view>
					<!-- <view class="operation-icon">
						<wd-icon name="chat1" size="36rpx"></wd-icon>
						<view>{{ blog.comment_count ? blog.comment_count : "评论" }}</view>
					</view> -->
					<view class="operation-icon" :class="blog.isLike ? 'active' : ''" @click.stop="onLike()">
						<wd-icon name="thumb-up" size="34rpx"></wd-icon>
						<view>{{ blog.like_count ? blog.like_count : "点赞" }}</view>
					</view>
				</view>
			</template>
		</wd-card>
	</view>
</template>

<style lang="scss">
@import "./index.scss"
</style>