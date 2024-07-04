<template>
  <li class="tab">
    <router-link :to="to" active-class="active" exact>
      <slot></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['to'],
};
</script>

<style scoped lang="less">
@import '../../vars';

.tab {
  display: inline-block;
  text-transform: uppercase;
  color: black !important;
  font-family: @special-font;
  a {
    color: @text-color;
    text-decoration: none;
    display: inline-block;
    padding: 0 12px;
    font-weight: normal;

    &.active {
      background: #fbbd08 !important;
      background-size: cover;
      font-weight: 600;
      background-repeat: no-repeat;
      color: black !important;
    }
  }
}
</style>
