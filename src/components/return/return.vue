<template>
  <div class="return" @click="returns">
  	<div class="return-button"></div>
  </div>
</template>

<script>
  export default {
    name: 'return',
    props: [
    	// 接收数据
    ],
    data () {
      return {
        // 数据
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
		},
		mounted () {
			// 页面加载后执行
		},
		methods: {
		  // 方法
		  returns () {
		  	this.$router.go(-1);
		  }
		},
		directives: {
	  	// 自定义组件
	 	},
		components: {
		  // 注册组件
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.return {
		.return-button {
			width: 10px;
			height: 18px;
			background: url(../../../static/image/return.png) no-repeat;
			background-size: 100% 100%;
		}
	}
</style>