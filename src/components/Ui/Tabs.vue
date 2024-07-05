<template>
  <div class="tabs tabs-borders" id="tab-group-1">
    <div class="tab-controls">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../vars';

.tabs {
  overflow: hidden;
}
</style>
