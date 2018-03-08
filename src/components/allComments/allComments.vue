<template>
  <div class="allComments">
  	<div class="returns-button">
			<returns></returns>
		</div>
		<!-- 筛选-->
		<div class="screen-tab">
			<ul>
				<li @click.stop="tabSelected" class="selected">
					<select @change="screenSkin(skinIndex)" v-model="skinIndex">
						<option v-for="(item, index) in comment_select.skin_select" :value="index">{{item}}</option>
					</select>
				</li>
				<li @click.stop="tabSelected">
					<select @change="screenScore(scoreIndex)" v-model="scoreIndex">
						<option v-for="(item, index) in comment_select.age_select" :value="index">{{item}}</option>
					</select>
				</li>
				<li @click.stop="tabSelected">
					<select @change="screenAge(ageIndex)" v-model="ageIndex">
						<option v-for="(item, index) in comment_select.score_select" :value="index">{{item}}</option>
					</select>
				</li>
			</ul>
		</div>
		<!-- tab选项 -->
		<div class="tab-box">
			<ul>
				<li v-for="(item, index) in tabContent" @click="tabOption(index)" :class="index == 0 ? 'selected' : ''">{{item}}</li>
			</ul>
		</div>
  	<!-- 评论列表 -->
  	<div class="comment-list">
  		<ul>
  			<li class="list" v-for="(item, index) in list" :key="index">
  				<comment-cont :commentCont="item"></comment-cont>
  			</li>
  		</ul>
  		<infinite-loading @infinite="allComments" ref="infiniteLoading">
		    <span>
		     	没有更多数据了！
		    </span>
		  </infinite-loading>
  	</div>
  </div>
</template>
<script>
	import commentsCont from '../comment/comment';
	import returns from '../return/return';
	import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name: 'allComments',
    props: [
    	// 接收数据
    ],
    data () {
      return {
        // 数据
        productId: this.$route.query.cid,
        allCommentsData: [],
        skinIndex: 0, // 皮肤索引
        scoreIndex: 0, //评分索引
        ageIndex: 0, //年龄索引
       	pagesIndex: 1, //分页索引
       	tabIndex: 0, //tab索引
       	skinId: ['', 10, 11, 12, 13, 373, 374, 375],
       	tabContent: ['全部', '相关点评', '相关帖子', '有图'],
        comment_select: {
		      skin_select: ['肤质筛选', '干性', '中性', '油性', '混合', '敏感油性', '敏感干性', '敏感混合性'],
		      age_select: ['年龄筛选', '20岁以下', '20-25岁', '26-30岁', '31-39岁', '40岁以上'],
		      score_select: ['评分筛选', '一星', '二星', '三星', '四星', '五星'],
		    },
		    list: []
      };
		},
		watch: {
			// 观察实例变化
		},
		computed: {
		  // 监听、事实计算
		},
		created () {
		  // 页面加载前执行
//		  this.allComments()
		},
		mounted () {
			// 页面加载后执行
			console.log(this.productId);
		},
		methods: {
		  // 获取数据
		  allComments ($state) {
		  	var _this = this;
		  	var listItem = [];
		  	this.$http.get(
		  		API_PROXY 
		  		+ 'rd=1004&id=' + _this.productId
		  		+ '&ie=' + _this.pagesIndex 
		  		+ '&ca=' + parseFloat(_this.scoreIndex)
		  		+ '&cq=' + _this.skinId[_this.skinIndex]
		  		+ '&cs=' + parseFloat(_this.ageIndex)
		  		+ '&type=' + _this.tabIndex
		  	)
		  	.then(res => {
		  		if (res.data.de.comments.length) {
	          _this.allCommentsData = res.data.de;
			  		if (_this.pagesIndex == 1) {
			  			console.log('进去');
			  			_this.tabContent = ['全部', '相关点评(' + _this.allCommentsData.reviewNum + ')', '相关帖子(' + _this.allCommentsData.threadNum + ')', '有图(' + _this.allCommentsData.hasImgNum + ')'];
			  		}
			  		
			  		_this.list = _this.list.concat(res.data.de.comments);
			  		console.log(_this.allCommentsData, '所有点评');
			  		console.log(_this.tabContent, 'tab');
			  		_this.pagesIndex += 1;
	          $state.loaded();
	        } else {
	          $state.complete();
	        }
		  		
		  	})
		  	.catch(err => {
		  		$state.complete();
		  		console.log(err,'错误')
		  	})
		 	},
		  // 筛选
		  tabSelected () {
		  	$('.screen-tab ul li').click(function () {
		  		console.log(1);
			  	$(this).addClass('selected').siblings().removeClass('selected');
			  })
		  },
		  screenSkin (e) {
		  	this.list = [];
		  	this.pagesIndex = 1;
		  	this.skinIndex = e;
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
	      });
		  },
		  screenScore (e) {
		  	this.list = [];
		  	this.pagesIndex = 1;
		  	this.scoreIndex = e;
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
	      });
		  },
		  screenAge (e) {
		  	this.list = [];
		  	this.pagesIndex = 1;
		  	this.ageIndex = e;
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
	      });
		  },
		  // tab选项
		  tabOption (e) {
		  	if (this.tabIndex == e || (e == 3 && this.tabIndex == 9)) {
		  		return;
		  	}
		  	$(event.target).addClass('selected').siblings().removeClass('selected');
		  	this.list = [];
		  	this.pagesIndex = 1;
		  	if (e == 3) {
		  		this.tabIndex = 9;
		  	} else {
		  		this.tabIndex = e;
		  	}
		  	this.$nextTick(() => {
	        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
	      });
		  },
		  initialization () {
		  	this.skinIndex = 0; // 皮肤索引
        this.scoreIndex = 0; //评分索引
        this.ageIndex = 0; //年龄索引
       	this.pagesIndex = 1; //分页索引
       	this.tabIndex = 0; //tab索引
       	this.list = [];
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		  'comment-cont': commentsCont,
		  returns,
		  InfiniteLoading
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.allComments {
		line-height: 1;
		.returns-button {
			margin: 14px 0 14px 14px;
		}
		.screen-tab {
			width: 100%;
			height: 47px;
			border-bottom: 1px solid rgb(228,227,224);
			background: rgb(241,246,245);
			ul {
				display: flex;
				li {
					flex: 1;
					text-align: center;
					select {
						display: inline-block;
						width: 100%;
						line-height: 45px;
						border: 0;
						border-bottom: 2px solid rgba(93,186,152,0);
						font-size: 14px;
						text-align: center;
						text-align-last: center;
						background: none;
						color: rgb(51,51,51);
						option {
							text-align: center;
						}
					}
					&.selected {
						select {
							border-bottom: 2px solid rgba(93,186,152,1);
							color: rgb(93,186,152);
							option {
								color: #333;
							}
						}
					}
				}
			}
		}
		.tab-box {
			height: 65px;
			border-bottom: 1px solid rgb(228,227,224);
			ul {
				padding-top: 20px;
				font-size: 0;
				text-align: center;
				li {
					display: inline-block;
					vertical-align: top;
					margin: 0 4px;
					padding: 7px 10px;
					font-size: 12px;
					background: rgb(225,238,233);
					color: rgb(51,51,51);
					border-radius: 13px;
					cursor: pointer;
					&.selected {
						background: rgb(93,186,152);
						color: rgb(255,255,255);
					}
				}
			}
		}
		.comment-list {
			ul {
				.list {
					padding:13px 15px 22px;
					border-bottom: 1px solid rgb(228,227,224);
				}
			}
		}
	}
</style>