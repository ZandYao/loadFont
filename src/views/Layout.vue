<template>
  <section class="layout">
    <dt-header></dt-header>
    <dt-menu :menus="menus"></dt-menu>
    <router-view class="body"></router-view>
  </section>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default() {
        return [{ name: '绘图', icon: 'icon-geren6', routeName: 'videoFrame' }, { name: 'css3动画', icon: 'icon-jiaohuyanshidonghua', routeName: 'css3' }]
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: $primary-bg-color;
  font-size: $font-size-s;
  color: $primary-font-color;
  .layout{
    height: 100%;
  }
}

.body {
  margin-top: $header-height + 5px;
  padding: 15px !important;
  .innerBody {
    // height: 100vh;
    overflow: hidden;
  }
}
</style>
