<template>
    <div class="goods-item">
        <!-- 监听每一张图片都加载完成 接着去刷新bette-scroll -->
        <img :src="goodsItem.show.img" alt="" @load="imgLoad" />
        <div class="item-info">
            <p>{{ goodsItem.title }}</p>
            <span class="price">{{'¥' + goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>  <!--收藏-->
        </div>
    </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  methods:{
      imgLoad(){
          this.$bus.$emit('itemImgLoad')   //通过事件总线把事件发送出去
      }
  }

}
</script>

<style scoped>
.goods-item{
    padding-bottom: 40px;
    width: 48%;
    position: relative;
}

.goods-item img{
    width: 100%;
    border-radius: 5px;
}

.item-info{
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;

    font-size: 12px;
    text-align: center;
    overflow: hidden;
}

.item-info p{
   
    /* 单行文本溢出显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-bottom: 3px;
}

.item-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}

.item-info .collect{
    position: relative;
}

.item-info .collect::before{
    content: '';
    position: absolute;
    left: -14px;
    top: -1px;
    width: 14px;
    height: 14px;
    /* 第一个0是rgb颜色 第二个0是background-position 第三个和第四个14px是background-size */
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px ;
}
</style>