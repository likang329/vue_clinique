<template>
	<div class="home">
	  <div class="banner">
	  	<img v-if="homeData.KV != ''" :src="homeData.KV"/>
	  	<img v-else src="../../../static/image/index_banner.png"/>
	  </div>
	  <div class="product_list">
	  	<ul class="clearfix">
	  		<li v-for="(item, index) in homeJson" :key="item.id" :class="index == 6 ? list_last : ''" @click="productDetails(item.id)">
	  			<div class="list_box">
		  			<div class="product_img">
		  				<img :src="item.img"/>
		  			</div>
		  			<div class="text_content">
		  				<h4 class="name" v-html="item.name"></h4>
		  				<p>{{ item.usedNum }}个密友用过</p>
		  				<span>看口碑</span>
		  			</div>
	  			</div>
	  		</li>
	  	</ul>
	  </div>
	</div>
</template>

<script>
	export default {
	  name: 'home',
	  data () {
	    return {
	      // 数据
	      homeData: [],
	      list_last: 'list_last clearfix',
	      homeJson: [
	      	{
	      		id: '1',
	      		img: '../static/image/index_product_01.png',
	      		name: '倩碧天才黄油<br>克隆肌肤天然保护膜',
	      		usedNum: ''
	      	},
	      	{
	      		id: '2',
	      		img: '../static/image/index_product_02.png',
	      		name: '倩碧水磁场保湿面霜<br>干皮救星 水润出击',
	      		usedNum: ''
	      	},
	      	{
	      		id: '3',
	      		img: '../static/image/index_product_03.png',
	      		name: '倩碧淡斑美白精华<br>没有斑的肌肤',
	      		usedNum: ''
	      	},
	      	{
	      		id: '4',
	      		img: '../static/image/index_product_04.png',
	      		name: '抗氧化维C安瓶精华<br>活活活活活的维C',
	      		usedNum: ''
	      	},
	      	{
	      		id: '5',
	      		img: '../static/image/index_product_05.png',
	      		name: '倩碧小雏菊腮红<br>网红必备利器 断货王',
	      		usedNum: ''
	      	},
	      	{
	      		id: '6',
	      		img: '../static/image/index_product_06.png',
	      		name: '倩碧撞色小方唇膏<br>浓郁出色 气场立现',
	      		usedNum: ''
	      	},
	      	{
	      		id: '7',
	      		img: '../static/image/index_product_07.png',
	      		name: '倩碧真男人系列<br>净爽保湿 简单有效',
	      		usedNum: ''
	      	}
	      ]
	    }
	  },
	  watch: {
	
	  },
	  computed: {
	    // 监听、事实计算
	  },
	  created () {
	    // 初始化加载
	    this.indexData();
	  },
	  methods: {
	    // 方法
	    indexData () {
	    	var _this = this;
	  		this.$http.get(API_PROXY + 'rd=' + 1001)
	  		.then(res => {
	  			console.log(res, '首页产品数据')
	  			_this.homeData = res.data.de;
						for (var i = 0; i < res.data.de.products.length; i++) {
							_this.homeJson[i].usedNum = res.data.de.products[i].usedNum
						}
	  			console.log(_this.homeJson);
				})
	  		.catch(err => {
	  			console.log(err, '首页产品数据错误');
	  		});
	    },
	    productDetails (cid) {
	    	this.$router.push({
	        path: "productDetails",
	        query: {cid: cid}
	      });
	    }
	  },
	  directives: {
	    // 自定义组件
	  },
	  components: {
	    // 注册组件
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.home {
		padding: 0 15px;
	  .banner {
	    img {
	    	display: block;
	    	width: 100%;
	    	border-radius: 5px;
	    }
	  }
	  .product_list {
	  	margin-bottom: 60px;
	  	ul {
	  		li {
	  			float: left;
	  			box-sizing:border-box;
	  			margin-top: 34px;
	  			width: 50%;
	  			border-radius: 10px;
	  			&:nth-child(odd) {
	  				padding-right: 5px;
	  			}
	  			&:nth-child(even) {
					  padding-left: 5px;
					}
					.list_box {
						width: 100%;
						padding-bottom: 12px;
						background: #ffffff;
						box-shadow:0 12px 40px #EAEDEC;
						border-radius: 5px;
					}
	  			.product_img {
	  				img {
	  					display: block;
	  					width: 100%;
	  				}
	  			}
	  			.text_content {
	  				padding: 0 0 0 10px;
	  				.name {
	  					margin: 8px 0 6px;
	  					font-size: 16px;
	  					line-height: 22px;
	  					font-weight: bold;
	  					color: #333333;
	  				}
	  				p {
	  					font-size: 13px;
	  					color: #666666;
	  				}
	  				span {
	  					display: block;
	  					width: 60px;
	  					height: 20px;
	  					margin: 10px 0 0;
	  					text-align: center;
	  					line-height: 20px;
	  					font-size: 12px;
	  					border-radius: 12px;
	  					color: #5dba98;
	  					background: #E1EEE9;
	  				}
				  }
	  		}
	  		.list_last {
	  			width: 100%;
	  			padding: 0!important;
	  			.list_box {
	  				/*display: flex;*/
	  				padding: 0;
	  				font-size: 0;
	  				.product_img {
	  					box-sizing:border-box;
	  					display: inline-block;
	  					vertical-align: top;
	  					width: 50%;
	  					padding-right: 5px;
	  					/*flex: 1;*/
	  				}
	  				.text_content {
	  					box-sizing:border-box;
	  					display: inline-block;
	  					vertical-align: top;
	  					width: 50%;
	  					padding: 0 0 0 15px;
	  					.name {
	  						margin: 8px 0 3px;
	  					}
	  					span {
	  						margin: 6px 0 0;
	  					}
	  					/*flex: 1;*/
	  				}
	  			}
	  		}
	  	}
	  }
	}
</style>
