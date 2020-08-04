<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="desc-left"></div>
            <div class="desc-text">{{ detailInfo.desc }}</div>
            <div class="desc-right"></div>
        </div>
        <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
        <div class="info-list">
            <img
                v-for="(item, index) in detailInfo.detailImage[0].list"
                :key="index"
                :src="item"
                @load="imgLoad"
                alt=""
            />
        </div>
    </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  methods: {
    imgLoad() {
        //所有图片加载完成后再刷新一下滚动条
        //也可以用防抖动方法来做
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    //监听图片个数的变化
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.goods-info {
    padding: 20px 8px;
    border-bottom: 5px solid #f2f5f8;
}

.desc-left,
.desc-right {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
}

.desc-left {
    float: left;
}

.desc-right {
    float: right;
}

.desc-left::before,
.desc-right::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
}

.info-desc .desc-text {
    padding: 15px 0;
    font-size: 14px;
    text-indent: 10px;
}

.info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
}

.info-list img {
    width: 100%;
}
</style>