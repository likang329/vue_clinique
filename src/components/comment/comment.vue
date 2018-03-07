<template>
  <div class="comment" @click="commentDetails(commentCont.id)">
  	<div class="headPortrait-text">
  		<div class="head-portrait">
				<img :src="commentCont.avatar"/>
			</div>
			<div class="text">
				<div class="name-age-label">
					<div class="name">{{commentCont.username}}</div>
					<div class="age" v-if="commentCont.age != ''">{{commentCont.age}}岁</div>
					<p class="label" v-if="commentCont.fuzhi != ''">
						<labels :labelsTxt="[commentCont.fuzhi,commentCont.fuzhi_type]"></labels>
					</p>
				</div>
				<div v-if="commentCont.voteNum != ''" class="like-box">
					<like :likeQuantity="commentCont.voteNum"></like>
				</div>
			</div>
  	</div>
  	<p class="comt-text">{{commentCont.discription}}</p>
  	<ul class="img-wrap">
  		<li v-for="item in commentCont.imgs">
  			<img :src="item"/>
  		</li>
  	</ul>
  	<div class="date-starGrade" v-if="commentCont.dateline != undefined && commentCont.score != undefined">
  		<div class="date">{{commentCont.dateline | formatDate}}</div>
  		<div class="star_wrap">
				<img class="star_back" src='../../../static/image/starRating_gray.png'>
				<div class="star" :style="'width:' + (commentCont.score*10*3/2) + 'px'">
					<img src="../../../static/image/starRating_3.png">
				</div>
			</div>
  	</div>
  </div>
</template>

<script>
	import {formatDate} from '../../common/js/date.js';
	import labels from '../labels/labels';
	import like from '../like/like';

  export default {
    name: 'comment',
    props: {
    	// 接收数据
    	commentCont: {
  	    type: Object
  	  }
    },
    data () {
      return {
        // 数据
      };
		},
		filters: {
	    formatDate (time) {
        var date = new Date(time * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
	    }
   	},
		watch: {
			// 观察实例变化
		},
		computed: {
		  // 监听、事实计算
		},
		created () {
		  // 页面加载前执行
		},
		mounted () {
			// 页面加载后执行
//			console.log(this.commentCont.dateline, '组件')
		},
		methods: {
		  // 方法
		  commentDetails (dpid) {
		  	this.$router.push({
		  		name: 'commentDetails',
		  		query: {dpid: dpid}
		  	})
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  labels,
		  like
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.comment {
		.headPortrait-text {
			display: flex;
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
					top: 11px;
					right: 0;
				}
			}
		}
		.comt-text {
			margin: 10px 0 13px;
			font-size: 12px;
			line-height: 16px;
			color: #000;
		}
		.img-wrap {
			display: flex;
			li {
				flex: 1;
				height: 70px;
				overflow: hidden;
				text-align: center;
				border-radius: 3px;
				&:nth-child(2) {
					margin: 0 8px;
				}
				img {
					width: 100%;
				}
			}
		}
		.date-starGrade {
			margin-top: 12px;
			text-align: right;
			font-size: 0;
			line-height: 10px;
			.date, .star_wrap {
				display: inline-block;
				vertical-align: top;
			}
			.date {
				margin-right: 10px;
				font-size: 11px;
				color: rgb(51,51,51);
			}
			.star_wrap {
				position: relative;
				width: 75px;
				height: 10px;
				overflow: hidden;
				.star_back {
					display: block;
					width: 100%;
				}
				.star {
					position: absolute;
					left: 0;
					top: 0;
					height: 10px;
					overflow: hidden;
					img {
						display: block;
						width: 75px;
						height: 10px;
					}
				}
			}
		}
	}
</style>