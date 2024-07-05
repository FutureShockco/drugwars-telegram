<template>
  <div class="tabi">
    <div class="card">
      <div class="content mt-1">
        <slot />
      </div>
      <BottomNav />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BottomNav from './BottomNav.vue';

export default {
  props: ['title'],
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>
