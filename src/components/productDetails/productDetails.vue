<template>
  <div class="productDetails">
  	<!-- 头部 -->
  	<header class="banner">
  		<img class="bannerImg" :src="bannerSrc"/>
  		<div class="productIntroduce">
  			<h3 class="name">{{ productDetails.name }}</h3>
  			<div class="price">{{ productDetails.psy }}</div>
  			<div class="comment">
  				<div class="star_wrap">
  					<img class="star_back" src='../../../static/image/starRating_gray.png'>
  					<div class="star" :style="'width:' + (productDetails.score*10*3/2) + 'px'">
  						<img :src="starRating">
  					</div>
  				</div>
  				<div class="number">{{ productDetails.score }}</div>
  			</div>
				<ul class="label">
					<li v-for="item in productDetails.effectInfo">{{ item.name }}</li>
				</ul>
  		</div>
  		<div class="briefIntroduction">{{ productDetails.discription }}</div>
  		<div class="returns-button">
  			<returns></returns>
  		</div>
  	</header>
  	<!-- 密友评论 -->
  	<div class="carousel" v-if="carouselList > 0">
  		<div class="title">
  			<h3>蜜友评论({{productDetails.reviewNum}})</h3>
  			<div class="more">
  				<span @click="allComments(productDetails.id)">全部</span>
  			</div>
  		</div>
  		<Swiper :autoPlay='true' :showIndicator="false" interval="2500" duration="500">
	      <Slide v-for="(item, index) in carouselList" :key="index">
	      	<div class="content" @click="commentDetails(productDetails.reviews[index + index].id)">
		      	<div class="head-portrait">
							<img :src="productDetails.reviews[index + index].avatar"/>
						</div>
						<div class="text">
							<div class="name-age-label">
								<div class="name">{{productDetails.reviews[index + index].username}}</div>
								<div class="age">{{productDetails.reviews[index + index].age}}岁</div>
								<p class="label" v-if="productDetails.reviews[index + index].fuzhi != ''">
									<labels :labelsTxt="[productDetails.reviews[index + index].fuzhi,productDetails.reviews[index + index].fuzhi_type]"></labels>
								</p>
							</div>
							<p class="comment">{{productDetails.reviews[index + index].discription}}</p>
						</div>
	      	</div>
	      	<div class="content" @click="commentDetails(productDetails.reviews[index + index + 1].id)">
		      	<div class="head-portrait">
							<img :src="productDetails.reviews[index + index + 1].avatar"/>
						</div>
						<div class="text">
							<div class="name-age-label">
								<div class="name">{{productDetails.reviews[index + index + 1].username}}</div>
								<div class="age">{{productDetails.reviews[index + index + 1].age}}岁</div>
								<p class="label" v-if="productDetails.reviews[index + index + 1].fuzhi != ''">
									<labels :labelsTxt="[productDetails.reviews[index + index + 1].fuzhi,productDetails.reviews[index + index + 1].fuzhi_type]"></labels>
								</p>
							</div>
							<p class="comment">{{productDetails.reviews[index + index + 1].discription}}</p>
						</div>
	      	</div>
	      </Slide>
		  </Swiper> 
  	</div>
  	<!-- 闺蜜测评 -->
  	<div class="comment-list-wrap" v-if="productDetails.articleNum > 0">
  		<div class="title">
  			<h3>蜜友评论({{productDetails.articleNum}})</h3>
  		</div>
  		<div class="comment-list">
  			<ul>
  				<li v-for="item in productDetails.articles">
  					<comment-list-cont :commentCont="item"></comment-list-cont>
  				</li>
  			</ul>
  		</div>
  		<div class="comment-list">
  			<ul>
  				<li v-for="item in loadData">
  					<comment-list-cont :commentCont="item"></comment-list-cont>
  				</li>
  			</ul>
  			<infinite-loading @infinite="flipPages" ref="infiniteLoading">
			    <span>
			     	没有更多数据了！
			    </span>
			  </infinite-loading>
  		</div>
  	</div>
  </div>
</template>

<script>
	import { Swiper, Slide } from 'vue-swiper-component';
	import InfiniteLoading from 'vue-infinite-loading';
	import carousellist from '../carousellist/carousellist';
	import commentListCont from '../comment/comment';
	import returns from '../return/return';
	import labels from '../labels/labels';

  export default {
    name: 'productDetails',
    data () {
      return {
        //数据
        productId: this.$route.query.cid, //上一页传进来的产品ID
        productDetails: [], //产品详细数据
        commentListData: [],
        bannerSrc: '', //banner图链接
        starRating: '', // 星评链接
        carouselList: '', // 轮播渲染数量
        loadIndex: 1,
        loadData: []
      }
		},
		watch: {},
		computed: {
		  //监听、事实计算
		},
		created () {
		  //初始化加载
		  switch (this.productId) {
	      case '1':
          this.bannerSrc = "../static/image/productDetails_banner_01.jpg",
          this.starRating = "../static/image/starRating_1.png"
	        break;
	      case '2':
	        this.bannerSrc = "../static/image/productDetails_banner_02.jpg",
          this.starRating = "../static/image/starRating_2.png"
	        break;
	      case '3':
	        this.bannerSrc = "../static/image/productDetails_banner_03.jpg",
          this.starRating = "../static/image/starRating_3.png"
	        break;
	      case '4':
	        this.bannerSrc = "../static/image/productDetails_banner_04.jpg",
          this.starRating = "../static/image/starRating_4.png"
	        break;
	      case '5':
	        this.bannerSrc = "../static/image/productDetails_banner_5.jpg",
          this.starRating = "../static/image/starRating_5.png"
	        break;
	      case '6':
	        this.bannerSrc = "../static/image/productDetails_banner_06.jpg",
          this.starRating = "../static/image/starRating_6.png"
	        break;
	      case '7':
	        this.bannerSrc = "../static/image/productDetails_banner_07.jpg",
          this.starRating = "../static/image/starRating_7.png"
	        break;
	      default:
	        console.log('default' + this.productId);
	   	}
		  this.productData()
		},
		mounted () {},
		methods: {
		  //方法
		  productData () {
		  	var _this = this;
		  	this.$http.get(API_PROXY + 'rd=1002&id=' + _this.productId)
			  	.then(res => {
			  		_this.productDetails = res.data.de
			  		_this.carouselList = parseInt(res.data.de.reviews.length / 2)
			  		_this.commentListData = res.data.de.articles
			  		console.log(_this.productDetails, '产品详情')
			  	})
			  	.catch(err => {
		  			console.log(err, '产品详情错误');
		  		});
		  },
		  allComments (cid) {
	    	this.$router.push({
	        path: "allComments",
	        query: {cid: cid}
	      });
		  },
		  commentDetails (dpid) {
		  	this.$router.push({
		  		name: 'commentDetails',
		  		query: {dpid: dpid}
		  	})
		  },
		  flipPages ($state) {
		  	var _this = this;
		  	var list = [];
		  	this.$http.get(API_PROXY + 'rd=1002&id=' + _this.productId + '&ie=' + _this.loadIndex)
			  	.then(res => {
			  		list = res.data.de.articles;
			  		_this.loadData = _this.list.concat(list);
			  		_this.loadIndex += 1;
			  		$state.loaded();
			  		console.log(_this.loadData, '翻页')
			  	})
			  	.catch(err => {
		  			console.log(err, '翻页错误');
		  			$state.complete();
		  		});
		  }
		},
		directives: {
	  	//自定义组件
	 	},
		components: {
		  //注册组件
		  'carousel-list': carousellist,
		  'comment-list-cont': commentListCont,
		  labels,
		  returns,
		  Swiper,
    	Slide,
    	InfiniteLoading
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.productDetails {
		line-height: 1;
		.banner {
			position: relative;
			.bannerImg {
				width: 100%;
			}
			.productIntroduce {
				box-sizing: border-box;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				padding: 34px 0 0 30px;
				color: rgb(51,51,51);
				.name {
					font-size: 18px;
					font-weight: bold;
				}
				.price {
					margin: 8px 0 14px;
					font-size: 12px;
				}
				.comment {
					margin-bottom: 8px;
					font-size: 0;
					.star_wrap, .number {
						display: inline-block;
						vertical-align: top;
					}
					.star_wrap {
						position: relative;
						width: 75px;
						height: 10px;
						overflow: hidden;
						.star_back {
							width: 100%;
						}
						.star {
							position: absolute;
							left: 0;
							top: 0;
							height: 10px;
							overflow: hidden;
							img {
								width: 75px;
								height: 10px;
							}
						}
					}
					.number {
						font-size: 11px;
					}
				}
				.label {
					font-size: 0;
					li {
						display: inline-block;
						vertical-align: top;
						margin-right: 10px;
						padding: 2px 6px;
						font-size: 11px;
						border-radius: 2px;
						background: rgb(51,51,51);
						color: rgb(255,255,255);
					}
				}
			}
			.briefIntroduction {
				/*box-sizing: border-box;*/
				/*width: 100%;*/
				position: relative;
				z-index: 1;
				margin: calc(-17%) 15px 0;
				padding: 18px 15px;
				font-size: 12px;
				line-height: 18px;
				border-radius: 2px;
				color: rgb(102,102,102);
				background: rgb(255,255,255);
				box-shadow:0 12px 40px #EAEDEC;
			}
			.returns-button {
				position: absolute;
				left: 14px;
				top: 14px;
			}
		}
		.title {
			display: flex;
			width: 100%;
			height: 38px;
			border-bottom: 1px solid rgb(228,227,224);
			line-height: 38px;
			h3 {
				flex: 1;
				font-size: 14px;
				font-weight: bold;
				color: rgb(51,51,51);
			}
			.more {
				flex: 1;
				text-align: right;
				color: rgb(51,51,51);
				span {
					display: inline-block;
					padding-right: 8px;
					background: url(../../../static/image/icon_right_arrow.png) no-repeat right center;
					background-size: 4px 7px;
					font-size: 11px;
				}
			}
		}
		.carousel {
			margin: 25px 15px 0;
			padding: 0 10px;
			background: #ffffff;
			.content {
				display: flex;
				padding-top: 7px;
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
					.comment {
						padding-bottom: 15px;
						font-size: 12px;
						line-height: 16px;
						border-bottom: 1px solid rgb(228,227,224);
					}
				}
			}
		}
		.comment-list-wrap {
			margin: 25px 15px 0;
			padding: 0 10px;
			.comment-list {
				ul {
					li {
						padding: 18px 0 20px;
						border-bottom: 1px solid rgb(228,227,224);
						&:last-child {
							border-bottom: 0;
						}
					}
				}
			}
		}
	}
</style>