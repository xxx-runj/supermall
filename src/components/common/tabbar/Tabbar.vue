<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
//这个组件只负责tabbar的样式和模板
//所以对于里面的细化内容，另外再抽到一个新的组件里面
//使用插槽
export default {
  name: "Tabbar",
};
</script>

<style  scoped>
.tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}

</style>