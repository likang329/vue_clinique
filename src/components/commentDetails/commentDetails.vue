<template>
  <div class="comment-details">
  	<div class="banner">
  		<img :src="detailsData.firstImg"/>
  		<div class="returns-button">
				<returns></returns>
			</div>
  	</div>
  	<div class="headPortrait-text">
  		<div class="head-portrait">
				<img :src="detailsData.avater"/>
			</div>
			<div class="text">
				<div class="name-age-label">
					<div class="name">{{detailsData.username}}</div>
					<div class="age">{{detailsData.age}}岁</div>
					<p class="label">
						<labels :labelsTxt="[detailsData.fuzhi,detailsData.fuzhi_type]"></labels>
					</p>
				</div>
				<div class="like-box">
					<like :likeQuantity="detailsData.voteNum"></like>
				</div>
			</div>
  	</div>
  	<ul class="content-list">
  		<li v-for="item in detailsData.content">
  			<p v-if="item.type == 'txt'">{{item.val.content}}</p>
  			<img v-else-if="item.type == 'img'" :src="item.val.imgurl"/>
  			<video v-else width="100%" height="">
  				<source :src="item.val.videourl" type="video/mp4"></source>
  			</video>
  		</li>
  	</ul>
  </div>
</template>

<script>
	import returns from '../return/return';
	import like from '../like/like';
	import labels from '../labels/labels';

  export default {
    name: 'commentDetails',
    data () {
      return {
        // 数据
        commentId: this.$route.query.dpid,
        detailsData: {}
      };
		},
		created () {
		  // 页面加载前执行
		  this.commentDetailsData();
		},
		mounted () {
			// 页面加载后执行
		},
		methods: {
		  // 方法
		  commentDetailsData () {
		  	var _this = this;
		  	_this.$http.get(API_PROXY + 'rd=1005&id=' + _this.commentId)
		  		.then(res => {
		  			_this.detailsData = res.data.de;
		  			console.log(_this.detailsData);
		  		})
		  		.catch(err => {
		  			console.log(err, '点评详情错误');
		  		})
		  }
		},
		components: {
		  // 注册组件
		  returns,
		  like,
		  labels
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.comment-details {
		.banner {
			position: relative; 
			img {
				display: block;
				width: 100%;
			}
			.returns-button {
				position: absolute;
				left: 14px;
				top: 14px;
			}
		}
		.headPortrait-text {
			display: flex;
			padding: 16px 15px 16px 10px;
			border-bottom: 1px solid rgb(228,227,224);
			.head-portrait {
				width: 34px;
				height: 34px;
				margin: 0 9px 0 5px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.text {
				position: relative;
				flex: 1;
				.name-age-label {
					line-height: 34px;
					font-size: 0;
					.name, .age, .label {
						display: inline-block;
						vertical-align: top;
						color: rgb(51,51,51);
					}
					.name {
						font-size: 14px;
						font-weight: bold;
					}
					.age {
						margin: 0 8px;
						font-size: 12px;
					}
					.label {
						margin-top: 9px;
					}
				}
				.like-box {
					position: absolute;
					right: 0;
					top: 11px;
				}
			}
		}
		.content-list {
			padding: 0 15px;
			li {
				margin-top: 30px;
				p {
					font-size: 13px;
					line-height: 20px;
					color: #000;
				}
				img {
					display: block;
					width: 100%;
				}
			}
		}
	}
</style>