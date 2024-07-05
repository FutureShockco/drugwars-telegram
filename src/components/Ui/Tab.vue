<template>
  <router-link :to="to" class="stab" active-class="active" exact>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['to'],
};
</script>

<style scoped lang="less">
@import '../../vars';

.stab {
  a {
    &.active {
      color: #ffce54 !important;
      border-color: #ffce54 !important;
    }
  }
}
</style>
