<template>
        <swiper class="swiper-all">
            <swiper-item
            class="swiper-item"
                v-for="(item, index) in topImages"
                :key="index"
            >
            <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    },

  }
}
</script>

<style scoped>
.swiper-item{
    height: 300px;
    overflow: hidden;
}

</style>