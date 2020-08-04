<template>
    <div class="goods">
        <!-- 根据goods里的个数，决定遍历多少次item -->
        <slot>
            <goods-list-item
                v-for="(item, index) in goods"
                :key="index"
                :goods-item="item"
            ></goods-list-item>
        </slot>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
  },
  components: {
    GoodsListItem,
  }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.goods-list-item {
    flex: 1;
}
</style>