<template>
  <div class="labels" :class="labelId + labelsTxt[1]">
  	{{labelsTxt[0]}}
  </div>
</template>

<script>
  export default {
    name: 'labels',
    props: {
    	// 接收数据
    	labelsTxt: {
    		type: Array
    	}
    },
    data () {
    	return {
    		labelId: 'labels'
    	}
    },
    mounted () {
			// 页面加载后执行
		}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.labels {
		padding: 2px 6px;
    line-height: 12px;
    font-size: 10px;
    color: #fff;
    background: #edcc5a;
    border-radius: 7px;
	}
	/* 肤质标签颜色 */
	.labels10 { /*干性*/
	  background: #FA6DA3;
	}
	.labels11 { /*中性*/
	  background: #96CC81;
	}
	.labels12 { /*油性*/
	  background: #EDCC5B;
	}
	.labels13 { /*混合*/
	  background: #BA83E0;
	}
	.labels373 { /*敏感油性*/
	  background: #EF9C64;
	}
	.labels374 { /*敏感干性*/
	  background: #FC9797;
	}
	.labels375 { /*敏感混合性*/
	  background: #8E9EE2;
	}
</style>