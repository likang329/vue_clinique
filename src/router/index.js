import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import productDetails from '@/components/productDetails/productDetails'
import allComments from '@/components/allComments/allComments'
import commentDetails from '@/components/commentDetails/commentDetails'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
      component: home
  	}, {
	  	path: '/productDetails',
	  	name: 'productDetails',
	  	component: productDetails
		}, {
			path: '/allComments',
			name: 'allComments',
			component: allComments
		}, {
			path: '/commentDetails',
			name: 'commentDetails',
			component: commentDetails
		}
  ]
})
