<template>
  <div>
    <BootcampTabs />
    <div v-if="researchCenter.lvl > 0" class="anim-fade-in">
      <div>
        <Training v-for="training in trainings" :training="training" :key="training.id" />
      </div>
      <!-- <div v-else class="p-2 text-center">
               <div v-if="!ownBase" class="p-2 text-center">
                <h2> You must choose a location on the map first.</h2>
              </div>
                <h2 v-else> You must build a research center first.</h2>
            </div> -->
    </div>
    <div v-else class="card anim-fade-in">
      <div class="content">
        <h4 v-if="!ownBase" class="text-center">
          You must choose a location on the map first.
          <h2>
            <router-link :to="'/map/territory?location=' + rnd" class="text-yellow">Click here to choose a location.</router-link>
          </h2>
        </h4>
        <h4 v-else class="text-center">
          You must build a research center first.
          <h2>
            <router-link :to="`/buildings`" class="text-yellow">Click here to build a research center.</router-link>
          </h2>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { trainings } from 'drugwars';

export default {
  data() {
    return {
      trainings,
      rnd: Math.floor(Math.random() * Math.floor(4999)) + 1,
    };
  },
  computed: {
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    researchCenter() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'research_center' &&
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
