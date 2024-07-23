<template>
  <div class="anim-fade-in">
    <BootcampTabs />
    <div v-if="trainingFacility.lvl > 0">
      <div class="units">
        <Unit v-if="!unit.disabled && !unit.npc && unit.id !== 'occupation_troop'" v-for="unit in units" :unit="unit" :key="unit.id" />
      </div>

    </div>
    <div v-else class="card card-style anim-fade-in">
      <div class="content">
        <h4 class="text-center">
          You must build a training facility first.
          <h2>
            <router-link :to="`/buildings`" class="text-yellow">Click here to build a training facility.</router-link>
          </h2>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { units } from 'drugwars';

export default {
  data() {
    return {
      units,
    };
  },
  computed: {
    trainingFacility() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'training_facility' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
