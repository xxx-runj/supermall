<template>
    <swiper>
        <swiper-item v-for="(item, index) in banner" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load='imgLoad' />
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js"

export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods:{
    imgLoad(){
      this.$emit("swiperImageLoad")
    }
  }
}
</script>

<style scoped>
</style>