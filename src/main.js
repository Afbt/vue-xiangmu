

// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件


import VueRouter from 'vue-router';

// 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);
// 路由规则

import login from './components/account/login.vue'

import layout from './components/layout.vue'
import goodslist from './components/goods/goodslist.vue'

var router = new VueRouter({
    routes:[
        // 登录
        {name:'login',path:'/login',component:login},
        //默认跳转规则
        {name:'default',path:'/',redirect:'/admin'},
        //布局
        {name:'layout',path:'/admin',component:layout,children:[
            {name:goodslist,path:'goodslist',component:goodslist}
        ]},
        

    ]
})









// 导入element-ui模块
import elementUI  from 'element-ui'

import '../staits/theme_rms/index.css'

import '../staits/css/site.css'

import axios from 'axios'
// 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899/'
// 将axios对象绑定到vue的原型上  后面的组件都能使用
Vue.prototype.$ajax = axios
Vue.use(elementUI)

//实例化vue对象
new Vue({
    el:'#app',
    router, 
    // render:function(create){create(App)}
    render:create=>create(App)
});