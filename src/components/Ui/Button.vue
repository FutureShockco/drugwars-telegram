<template>
  <button :type="type || 'button'" @click="$emit('click')" :disabled="loading">
    <SmallLoading v-if="loading" />
    <slot v-else />
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    type: String
  },
  emits: ['click']
};
</script>
