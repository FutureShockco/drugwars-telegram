<template>
  <div v-if="items">
    <h5>BUILDINGS</h5>
    <div class="d-flex">
      <div class="col-3 px-2 text-left" v-for="item in items"
        v-if="item && item.lvl !== 0 && item.placeholder.type !== 'defense' && !item.placeholder.production_rate"
        :key="item.building">
        <BuildingSimpleCompact :item="item" :building="item.placeholder" />
      </div>
    </div>
    <div class="mt-3">
      <h5>PRODUCTION</h5>
      <div class="d-flex">
        <div class="col-3 px-2 text-left" v-for="item in items"
          v-if="item && item.lvl !== 0 && item.placeholder.type !== 'defense' && item.placeholder.production_rate"
          :key="item.building + 'prod'">
          <BuildingSimpleCompact :item="item" :building="item.placeholder" />
        </div>
      </div>
    </div>
    <h5 class="mt-3">
      <div>PRODUCTION PER DAY</div>
      <span>+{{ totalDrugs * 60 * 60 * 24 | amount }}
        <Icon name="drug" size="20" />
      </span>
      <span class="mx-3">+{{ totalWeapons * 60 * 60 * 24 | amount }}
        <Icon name="weapon" size="20" />
      </span>
      <span>+{{ totalAlcohol * 60 * 60 * 24 | amount }}
        <Icon name="alcohol" size="20" />
      </span>
    </h5>
  </div>
</template>

<script>
import { buildings } from 'drugwars';

export default {
  props: ['items'],
  data() {
    return {
      placeholder_buildings: buildings,
    };
  },
  mounted() {
    this.items.forEach(element => {
      element.placeholder = this.placeholder_buildings[element.building]
    })
  },
  computed: {
    totalDrugs() {
      let totalDrugs = 0;
      this.items.forEach(element => {
        if (this.placeholder_buildings[element.building]) {
          const b = this.placeholder_buildings[element.building];
          if (element.lvl && b.production_rate && b.production_type === 'drugs')
            totalDrugs +=
              b.production_rate * Number(element.lvl) * b.coeff +
              ((b.production_rate * Number(element.lvl) * b.coeff) / 100) * Number(element.lvl);
        }
      });
      return totalDrugs;
    },
    totalWeapons() {
      let totalWeapons = 0;
      this.items.forEach(element => {
        if (this.placeholder_buildings[element.building]) {
          const b = this.placeholder_buildings[element.building];
          if (element.lvl && b.production_rate && b.production_type === 'weapons')
            totalWeapons +=
              b.production_rate * Number(element.lvl) * b.coeff +
              ((b.production_rate * Number(element.lvl) * b.coeff) / 100) * Number(element.lvl);
        }
      });
      return totalWeapons;
    },
    totalAlcohol() {
      let totalDrugs = 0;
      this.items.forEach(element => {
        if (this.placeholder_buildings[element.building]) {
          const b = this.placeholder_buildings[element.building];
          if (element.lvl && b.production_rate && b.production_type === 'alcohol')
            totalDrugs +=
              b.production_rate * Number(element.lvl) * b.coeff +
              ((b.production_rate * Number(element.lvl) * b.coeff) / 100) * Number(element.lvl);
        }
      });
      return totalDrugs;
    },
  },
};
</script>
