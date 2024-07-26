<template>
  <Header>
    <UiTabs>
      <UiTab to="/actions">Start</UiTab>
      <UiTab to="/actions/outgoing">
        Out
        <span>
          <span class="text-green">({{ activeFightsCount }})</span>
        </span>
      </UiTab>
      <UiTab to="/actions/incoming">
        In
        <span>
          <span class="text-red">({{ activeIncFightsCount }})</span>
        </span>
      </UiTab>

      <UiTab v-if="hasBase" :to="'/map/territory?location=' + base.territory"><i
          class="fad fa-map-location-dot font-20"></i><span>Map</span></UiTab>

      <UiTab v-else :to="'/map/territory?location=' + rnd"><i
          class="fad fa-map-location-dot font-20"></i><span>Map</span></UiTab>
      <!-- <UiTab to="/actions/transport">
        Transport
        <span>
          <span class="text-blue">({{ activeTransportsCount }})</span>
        </span>
      </UiTab> -->
      <!-- <UiTab to="/actions/station">
        Station
        <span>
          <span class="text-orange">({{ activeStationsCount }})</span>
        </span>
      </UiTab> -->
    </UiTabs>
    <!-- <div class="coordbase text-right" v-if="base">
      <div class="text text-blue tab name" v-if="main">Primary</div>
      <div class="text text-orange tab name" v-else-if="base.custom">{{base.custom}}</div>
      {{base.territory}}:{{base.base}}
    </div> -->
  </Header>
</template>


<script>
export default {
  data() {
    return {
      rnd: Math.floor(Math.random() * Math.floor(4999)) + 1
    };
  },
  computed: {
    hasBase() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters' && b.territory !== 0,
      );
      return !!(building && building.lvl > 0);
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    main() {
      return (
        this.$store.state.game.user.buildings.find(
          b => b.main === 1 && b.base === this.base.base && b.territory === this.base.territory,
        ) || null
      );
    },
    activeIncFightsCount() {
      if (this.$store.state.game.fights_count) return this.$store.state.game.fights_count.inc;
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.fights_count) {
        return this.$store.state.game.fights_count.sent;
      }
      return 0;
    },
    activeTransportsCount() {
      if (this.$store.state.game.transports_count) {
        if (
          this.$store.state.game.transports_count.sent ===
          this.$store.state.game.transports_count.inc
        )
          return this.$store.state.game.transports_count.sent;
        return (
          this.$store.state.game.transports_count.sent + this.$store.state.game.transports_count.inc
        );
      }
      return 0;
    },
    activeStationsCount() {
      if (this.$store.state.game.stations_count) {
        return this.$store.state.game.stations_count.sent;
      }
      return 0;
    },
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
