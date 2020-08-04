<template>
    <div v-if="Object.keys(goodsParam).length !== 0" class="goods-param">
        <table
            v-for="(tableSize, index) in goodsParam.size"
            :key="'x' + index"
            class="info-size">
            <tr v-for="(trSize, indey) in tableSize" :key="'y' + indey">
                <td v-for="(tdSize, indez) in trSize" :key="'z' + indez">
                    {{ tdSize }}
                </td>
            </tr>
        </table>
        <table class="info-param">
            <tr
                v-for="(trInfos, indeo) in goodsParam.infos"
                :key="'o' + indeo">
                <td class="info-param-key">{{ trInfos.key }}</td>
                <td class="info-param-value">{{ trInfos.value }}</td>
            </tr>
        </table>
        <div class="info-img" v-if="goodsParam.image.length !== 0">
            <img :src="goodsParam.image" alt="" />
        </div>
    </div>
</template>

<script>
export default {
  name: "DetailGoodsParam",
  props: {
    goodsParam: {
      type: Object,
      default() {
        return {}
      }
    },
  },
}
</script>

<style scoped>
.goods-param{
    padding: 20px 8px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}

.goods-param table {
    width: 100%;
    border-collapse: collapse;
  }

  .goods-param table tr {
    height: 42px;
  }

  .goods-param table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>