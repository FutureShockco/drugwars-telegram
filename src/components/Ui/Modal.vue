<template>
  <div v-if="open" class="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme show" role="dialog">
    <div class="content">
      <slot />
      <a @click="$emit('close')" class="position-absolute right-0 top-1 p-4 text-gray">
        <Icon name="close" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    open: Boolean
  },
  emits: ['close'],
  watch: {
    open(val, prev) {
      if (val !== prev) this.toggleModal();
    }
  },
  methods: {
    ...mapActions(['toggleModal'])
  }
};
</script>

<style lang="scss">
.modal {
  position: a;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  z-index: 400;
  text-align: center;

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.4);
  }

  .shell {
    border: 1px solid #e200e5;
    background-color: #0d0b0d;
    padding-left: 0 !important;
    padding-right: 0 !important;
    max-width: 460px;
    overflow-y: auto !important;
    max-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    z-index: 1050;
    margin: 0 auto;
    width: 100%;
    box-shadow: 0px 70px 70px #e100e548;
    border-radius: 10px;

    @media (max-width: 767px) {
      top: 80px;
      border: 0;
      width: 100% !important;
      max-width: 100% !important;
      max-height: 100% !important;
      min-height: 100% !important;
      margin-bottom: 0 !important;

      .modal-body {
        max-height: 100% !important;
      }
    }

    .modal-body {
      max-height: 320px;
      flex: auto;
      text-align: initial;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
