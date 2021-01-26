<template>
	<view>
		<view class="content">
			<button @click="upload">识别植物</button>
			<button @click="general">通用物体识别</button>
		</view>
		<view class="imgbox">
			<image :src="src"></image>
			<uni-popup ref="popup" type="bottom">
				<div class="textList">
					<ul>
						<li v-for="(item, index) in textList" :key="index" @click.stop="check(item)">{{ item.root }} - {{ item.keyword }}</li>
					</ul>
				</div>
			</uni-popup>
			<text>{{ name }}</text>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
export default {
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	data() {
		return {
			src: '',
			imgBs64: '',
			name: '',
			textList: '',
			description: ''
		};
	},
	onLoad() {},
	methods: {
		general() {
			uni.chooseImage({
				success: res => {
					this.src = res.tempFilePaths[0];
					uni.getFileSystemManager().readFile({
						filePath: this.src,
						encoding: 'base64',
						success: r => {
							this.imgBs64 = r.data;
							this.authorization(1);
						}
					});
				}
			});
		},
		upload() {
			uni.chooseImage({
				success: res => {
					this.src = res.tempFilePaths[0];
					uni.getFileSystemManager().readFile({
						filePath: this.src,
						encoding: 'base64',
						success: r => {
							this.imgBs64 = r.data;
							this.authorization();
						}
					});
				}
			});
		},
		authorization(val) {
			let tokenMsg = uni.request({
				url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=wFy3Pe3RLGnYTQUW9wQ6ykrA&client_secret=rGQYkGxW6Z878cHA4Yu8GroqGnQWyEMR',
				success: res => {
					this.identify(res, val);
				}
			});
		},
		identify(tokenMsg, val) {
			let url = '';
			if (val !== 1) {
				url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=';
			} else {
				url = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=';
			}
			uni.request({
				url: (url += tokenMsg.data.access_token),
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				data: {
					image: this.imgBs64,
					baike_num: 50000
				},
				success: res => {
					console.log(val, '123');
					if (val === 1) {
						this.textList = res.data.result;
						this.$refs.popup.open();
					} else {
						let arr = res.data.result;
						let score = Math.max.apply(Math, arr.map(item => item.score));
						arr.forEach(e => {
							if (e.score === score) {
								this.name = e.name;
							}
						});
					}
				}
			});
		},
		check(item) {
			this.name = item.keyword;
			if (item.baike_info) {
				this.description = item.baike_info.description;
			}
			this.$refs.popup.close();
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.imgbox {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 500px;
}
.imgbox img {
	width: 100%;
	height: 100%;
}
.imagebox .textList {
	background-color: #fff;
	height: 50%;
	width: 100%;
	text-align: center;
}
.textList > ul > li {
	text-align: center;
	height: 30px;
	background-color: #fff;
	line-height: 30px;
	border-bottom: 1px dashed #ccc;
}
.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
