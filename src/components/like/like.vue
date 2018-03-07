<template>
  <div class="like">
  	<p class="icon-like">{{likeQuantity}}</p>
  </div>
</template>

<script>
  export default {
    name: 'like',
    props: {
    	// 接收数据
    	likeQuantity: {
    		type: String
    	}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.like {
		.icon-like {
			padding-left: 14px;
			line-height: 12px;
			font-size: 10px;
			background: url(../../../static/image/icon_like.png) no-repeat;
			background-size: 11px 12px;
			color: rgb(189,198,195);
		}
	}
</style>