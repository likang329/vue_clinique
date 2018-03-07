<template>
  <div class="carousellist">
  	<div class="head-portrait">
			<img :src="listImg[index].avatar"/>
		</div>
		<div class="text">
			<div class="name-age-label">
				<div class="name"></div>
				<div class="age"></div>
				<ul class="label">
					<li></li>
				</ul>
				<p class="comment"></p>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'carousellist',
    props: [
    	'listImg',
    	'index'
    ],
    data () {
      return {
        //数据
      };
		},
		watch: {
			
		},
		computed: {
		  //监听、事实计算
		},
		created () {
		  //初始化加载
		},
		methods: {
		  //方法
		},
		directives: {
	  	//自定义组件
	 	},
		components: {
		  //注册组件
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>