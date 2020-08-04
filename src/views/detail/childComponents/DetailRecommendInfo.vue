<template>
    <div class="recommend-info">
        <div class="info-header">热门推荐</div>
        <goods-list :goods="recommendList">
            <recommend-list-item
                v-for="(item, index) in recommendList"
                :key="index"
                :recommend-item="item"
            ></recommend-list-item>
        </goods-list>
    </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'
import RecommendListItem from './RecommendListItem'

export default {
  name: "DetailRecommendInfo",
  components: {
    GoodsList,
    RecommendListItem,
  },
  props: {
    recommendList: {
      type: Array
    }
  },


}
</script>

<style scoped>
.recommend-info {
    margin-top: 10px;
    padding: 0 8px 5px;
}

.info-header {
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    color: #333;
}
</style>