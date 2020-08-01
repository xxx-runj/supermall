<template>
    <div id="home">
        <navbar class="home-nav">
            <template v-slot:center>
                <div>购物街</div>
            </template>
        </navbar>
    </div>
</template>

<script>


import Navbar from "components/common/navbar/Navbar.vue"
import {getHomeMultidata} from "network/home/home.js"



export default {
  name: "Home",
  components: {
    Navbar,
    
  },
  data(){
     return {
        banner:[],
        recommend:[],
     }
  },
  //组件创建好即可发送数据请求
  created(){
     //1,请求多个数据(这是异步操作)
     getHomeMultidata().then(res=> {
        //res是局部变量，所以必须把它保存到data中
        //函数调用-->压入函数栈(保存函数调用过程中所有变量)
        //函数调用结束-->弹出函数栈(释放函数所有变量)
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
     })
  }
}
</script>

<style scoped>
.home-nav{
   background-color: var(--color-tint);
   color: white;
}

.home-swiper{
   height: 150px;
   width: 320px;
}
</style>