import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter);


const router = new VueRouter({//创建路由实例
  routes: [ 
    { path: '/login', component: Login} //登陆页
  ]
});

export default router;
