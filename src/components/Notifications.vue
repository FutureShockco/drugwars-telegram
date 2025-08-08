<template>
  <div id="notification-bar-1" class="notification-bar-top glass-effect detached rounded-s shadow-xxl fade"
    style="width: 90%;" data-bs-delay="5000">
    <div class="toast-header px-3 py-3 flash anim-scale-in" v-for="(item, key) in items" :class="`flash-${item.type}`"
      @click="dismissNotification(key)"
      :style="{ cursor: 'pointer', position: 'absolute', top: (key * 90) + 'px', minHeight: '80px' }">
      <i class="fad fa-check pe-2 color-green-dark"></i>
      <div class="d-flex flex-column" style="width: 100%;">
        <strong class="me-auto color-theme">{{ item.message }}</strong>
        <small class="font-500 font-11 ml-11">{{ item.timestamp | fromnow }}</small>
      </div>
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
  methods: {
    dismissNotification(index) {
      this.$store.dispatch('removeNotification', index);
    },
  },
};
</script>
