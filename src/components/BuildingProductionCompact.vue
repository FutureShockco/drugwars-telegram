<template>
  <div v-if="item && item.lvl" class="card">
    <div class="content px-0 mx-0">
      <div class="d-flex">
        <div class="pt-1 ms-auto">
          <img class="img-fluid rounded-s" width="100" height="100" :src="`/img/buildings/${building.id}.png`">
        </div>
        <div class="ps-3 me-auto" style="width: 100%;">
          <div class="width-full">
            <h5 class="ml-2">{{ building.name }} ({{ item.lvl }})</h5>
          </div>
          <div v-if="building.production_type" class="right-floated">
            <BuildingProduction :compactview="1" :type="building.production_type" :level="item.lvl"
              :coeff="building.coeff" :production_rate="building.production_rate" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div class="content  px-0 mx-0">
      <div class="d-flex">
        <div class="pt-1 ms-auto">
          <img class="img-fluid rounded-s" width="100" height="100" :src="`./img/buildings/${building.id}.png`">
        </div>
        <div class="ps-3 me-auto" style="width: 100%;">
          <div class="width-full">
            <h5 class="ml-2">{{ building.name }} ({{ ownBuilding.lvl }})</h5>
          </div>
          <div v-if="building.production_type" class="right-floated">
            <BuildingProduction :compactview="1" :type="building.production_type" :level="ownBuilding.lvl"
              :coeff="building.coeff" :production_rate="building.production_rate" />
          </div>
        </div>
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
