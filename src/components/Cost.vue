<template>
  <div class="cost mt-2">
    <span class="me-2"> Cost:  </span>
    <span class="me-2" :class="{ 'not-enough': drugsCost * this.quantity > balances.drugs }" v-if="drugsCost">
      <Icon class="me-1" :size="16" name="drug" />
      {{ drugsCost * this.quantity | amount }}
    </span>
    <span class="me-2" :class="{ 'not-enough': weaponsCost * this.quantity > balances.weapons }" v-if="weaponsCost">
      <Icon class="me-1" :size="16" name="weapon" />
      {{ weaponsCost * this.quantity | amount }}
    </span>
    <span class="me-2" :class="{ 'not-enough': alcoholsCost * this.quantity > balances.alcohols }" v-if="alcoholsCost">
      <Icon class="me-1" :size="16" name="alcohol" />
      {{ alcoholsCost * this.quantity | amount }}
    </span>
    <!-- <div v-if="special.length>0 && quantity" v-for="cost in special" :key="cost.name">
         <span class="mr-2">
          <Icon :size="18" :name="`${cost.name || cost.type}_icon`"/>
             {{ cost.cost || cost.amount * quantity | amount}}
        </span>
        </div> -->

  </div>
</template>

<script>
import { getBalances } from '@/helpers/utils';

export default {
  props: ['type', 'level', 'quantity', 'drugsCost', 'weaponsCost', 'alcoholsCost', 'special'],
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    HQ() {
      if (
        this.base &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      ) {
        return this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        );
      }
      return this.$store.state.game.user.buildings.find(b => b.building === 'headquarters');
    },
    balances() {
      let ocLvl = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return getBalances(
        this.HQ,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.cost {
  font-weight: 600;
  font-size: 14px;
  color: #c7c7c7;
  display: inline-flex;
  line-height: 20px;
  font-family: @heading-font;

  span {
    display: inline-flex;
  }

  .icon {
    margin-right: 5px;
  }

  .not-enough {
    color: @error-color;
  }
}
</style>
