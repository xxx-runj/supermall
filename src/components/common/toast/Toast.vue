<template>
    <div v-show="isShow" class="toast">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false,
    }
  },
  props: {
    // message:{
    //     type:String,
    //     default:''
    // },
    // show:{
    //     type:Boolean,
    //     default:false
    // }
  },
  methods: {
    //默认信息、默认时间
    show(message = '添加成功', duration = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
    /* 固定定位，页面居中 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 5px;
    font-size: 16px;
    color: #fff;
    white-space:nowrap;  /*设置文字不换行 */
    background-color: rgba(206, 87, 87, 0.7);

    z-index: 999; /*显示出来，不被遮挡 */
}
</style>