<template>
  <div v-if="item && item.lvl" class="w-100">
    <div class="ms-auto" style="position: relative;">
      <img class="img-fluid rounded-s" :src="`/img/buildings/${building.id}.png`">
      <div class="w-100 h-100 text-center" style="position:absolute; left:0px; top:0px;">
          <h1 class="text-shadow-xl" style="line-height: 65px;">{{ item.lvl }}</h1>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['building', 'item'],
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    ownBuilding() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === this.$props.building.id &&
            b.base === this.base.base &&
            b.territory === this.base.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
