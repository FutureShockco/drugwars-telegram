<template>
  <div v-if="units">
    <div v-for="unit in unitsByPriority" v-if="unit.amount !== 0" :key="unit.key"
      class="d-inline-block me-1 mb-1 text-center">
      <img v-if="unit.key || unit.id" class="preview unit mini" style="border: 1px solid #392828;" width="50"
        :src="`/img/units/${unit.key || unit.id}.png`">
      <img v-else class="preview unit mini" style="border: 1px solid #392828;" width="50"
        :src="`/img/units/${unit}.png`">
      <div>
        <span v-if="withDead && unit.dead">
          <span :class="{ 'text-red': unit.dead }">
            {{ unit.dead || 0 }}
          </span> /
        </span>
        {{ unit.amount }}
      </div>
    </div>
  </div>
</template>

<script>
import drugwars from 'drugwars';

export default {
  props: ['units', 'withDead'],
  computed: {
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
    unitsByPriority() {
      const units = [];
      Object.keys(drugwars.units).forEach(unit => {
        const u = this.units.find((u) => u.key === unit)
        if (u && u.amount > 0)
          units.push({
            key: u.key,
            amount: u.amount,
          });
      })
      return units;
    },
  },
};
</script>
