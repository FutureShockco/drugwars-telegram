<template>
    <div class="header">
        <slot>
            <span class="ml-4">{{ title }}</span>
        </slot>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['title'],
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';
.header {
  font-family: @heading-font;
  background:  #000000;
  color: @white-darker;
  font-size: 18px;
  z-index: 100;
  top: 160px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  transition: width 0.3s;
  position: sticky;
}


</style>
