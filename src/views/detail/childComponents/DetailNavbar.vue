<template>
    <div>
        <navbar>
            <template v-slot:left>
                <div class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
            </template>
            <template v-slot:center>
                <div class="title">
                    <span
                        v-for="(item, index) in titles"
                        :key="index"
                        class="titleItem"
                        :class="{ active: index == currentIndex }"
                        @click="titleItemClick(index)"
                    >
                        {{ item }}
                    </span>
                </div>
            </template>
        </navbar>
    </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar.vue'

export default {
  name: "detailNavbar",
  components: {
    Navbar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      //将index发送出去，在detail组件实现点击监听
      this.$emit("titleClick",index);
    },
    backClick(){
        this.$router.back();
    }
  }
}
</script>

<style scoped>
.title {
    display: flex;
    font-size: 12px;
}

.title .titleItem {
    flex: 1;
}

.active{
    color: var(--color-high-text);
}

.back img{
    margin-top: 10px;
}
</style>