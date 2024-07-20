<template>
  <!-- <div class="position-fixed left-0 bottom-0 p-4">
    <div class="flash anim-scale-in mt-2 p-2" v-for="(item, key) in items" :class="`flash-${item.type}`" :key="key"
      v-if="timestamp < item.timestamp + 10">
      <span v-if="item.icon" :class="'iconfont icon-' + item.icon"></span>
      {{ item.message }}
    </div>
  </div> -->
  <div id="notification-bar-1" class="notification-bar-top glass-effect detached rounded-s shadow-xxl fade"
    data-bs-delay="5000">
    <div class="toast-header px-3 py-3 flash anim-scale-in" v-if="timestamp < item.timestamp + 5"
      v-for="(item, key) in items" :class="`flash-${item.type}`">
      <i class="fad fa-check pe-2 color-green-dark"></i>
      <strong class="me-auto color-theme">{{ item.message }}</strong>
      <small>{{item.timestamp | fromnow}}</small>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.ui.notifications;
    },
    timestamp() {
      return parseInt(this.$store.state.ui.timestamp / 1000);
    },
  },
};
</script>
