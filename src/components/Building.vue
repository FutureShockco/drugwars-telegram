<template>
  <div v-if="building.id === 'strategic_center' && !main"></div>
  <div v-else-if="building.id === 'pantheon' && !main"></div>
  <div v-else>
    <div class="card card-style mb-3" :class="[hasNotEnough ? 'not-enough' : '']">
      <div class="content">
        <!-- <div class="col-2">
        <img class="preview mt-2" :src="`//img.drugwars.io/buildings/${building.id}.jpg`" />
      </div> -->
        <!-- <div class="level">{{ ownItem.lvl }}</div> -->
        <div class="d-flex">
          <div class="pt-1 ms-auto">
            <img :src="`//img.drugwars.io/buildings/${building.id}.jpg`" class="img-fluid rounded-s" width="100"
              height="100">
          </div>
          <div class="ps-3 me-auto" style="width: 100%;">
            <!-- <strong class="opacity-30 color-theme font-11">Level:{{ ownItem.lvl }}</strong> -->
            <router-link class="mt-n2 pb-2" :to="`/buildings/detail?name=${building.id}`">
              <h3 class="mt-0">{{ building.name }} lvl.{{ ownItem.lvl }}</h3>
            </router-link>
            <!-- <div class="mb-2" v-html="building.desc"></div> -->
            <div v-if="building.feature">
              <div>{{ building.feature }}</div>
            </div>
            <div v-if="building.production_type">
              <BuildingProduction :compactview="0" :production_type="building.production_type" :level="ownItem.lvl"
                :coeff="building.coeff" :production_rate="building.production_rate" />
            </div>
            <div v-if="['drug_storage', 'weapon_storage', 'alcohol_storage'].includes(building.id)" class="mb-2">
              <div v-if="ownItem.lvl">
                <b>Current capacity:</b>
                {{ 10000 + (18000 * ownItem.lvl * (Math.sqrt(ownItem.lvl) / 100)) * ownItem.lvl | amount }}
              </div>
              <div v-if="ownItem.lvl">
                <b>Next capacity:</b>
                {{ 10000 + (18000 * (ownItem.lvl + 1) * (Math.sqrt((ownItem.lvl + 1)) / 100)) * (ownItem.lvl + 1) |
                  amount
                }}
              </div>
              <div v-else>
                <b>Next capacity:</b>
                {{ 10000 + (18000 * 1 * ((Math.sqrt(1)) / 100)) * 1 | amount }}
              </div>
              <div v-if="ownItem.lvl">
                <b>Safe:</b>
                {{ (10000 + (18000 * ownItem.lvl * (Math.sqrt(ownItem.lvl)) / 100) * ownItem.lvl) / 100 * 20 | amount }}
              </div>
              <div v-if="ownItem.lvl">
                <b>Next Safe:</b>
                {{ (10000 + (18000 * (ownItem.lvl + 1) * (Math.sqrt((ownItem.lvl + 1)) / 100)) * (ownItem.lvl + 1)) /
                  100
                  *
                  20 |
                  amount }}
              </div>
              <div v-else>
                <b>Safe:</b>
                {{ 10000 / 100 * 15 | amount }}
              </div>
            </div>
            <Cost :drugsCost="drugsCost" :weaponsCost="weaponsCost" :alcoholsCost="alcoholsCost" :quantity="1" />
          </div>

        </div>
        <div>

        </div>

      </div>
      <div v-if="(building.id === 'strategic_center' && ownItem.lvl > 204)">Max level reached</div>
      <Checkout v-else :id="building.id" :level="ownItem.lvl + 1" :coeff="building.coeff" :hqLevel="ownHq.lvl"
        :inProgress="inProgress" :price="drugsCost / 150000" :notEnough="hasNotEnough" />
      <!-- <div class="item-content width-full mr-3">
      <div v-if="buildingupgrades" v-for="item in buildingupgrades" :key="item.id">
        <BuildingUpgrade class="column col-6 p-0" :upgrade="item" />
      </div>
    </div> -->


    </div>
  </div>

</template>

<script>
import { utils, upgrades } from 'drugwars';
import { getBalances } from '@/helpers/utils';

export default {
  props: ['building'],
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    buildingupgrades() {
      let upgrade = [];
      if (upgrades[this.building.id]) upgrade = upgrades[this.building.id].upgrades;
      return upgrade;
    },
    main() {
      return (
        this.$store.state.game.user.buildings.find(
          b => b.main === 1 && b.base === this.base.base && b.territory === this.base.territory,
        ) || null
      );
    },
    onlyPrimary() {
      return this.building.id === 'strategic_center' && this.main;
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
    hasNotEnough() {
      return (
        this.drugsCost > this.balances.drugs ||
        this.weaponsCost > this.balances.weapons ||
        this.alcoholsCost > this.balances.alcohols
      );
    },
    ownItem() {
      if (this.base)
        return (
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === this.building.id &&
              b.base === this.$store.state.game.mainbase.base &&
              b.territory === this.$store.state.game.mainbase.territory,
          ) || {
            lvl: 0,
          }
        );
      return { lvl: 0 };
    },
    ownHq() {
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
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        );
      }

      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'headquarters') || { lvl: 0 }
      );
    },
    drugsCost() {
      return utils.calculateCostToUpgrade(this.building.drugs_cost, this.ownItem.lvl);
    },
    weaponsCost() {
      return utils.calculateCostToUpgrade(this.building.weapons_cost, this.ownItem.lvl);
    },
    alcoholsCost() {
      return utils.calculateCostToUpgrade(this.building.alcohols_cost, this.ownItem.lvl);
    },
    inProgress() {
      if (!this.ownItem) return false;
      if (this.ownItem.pending_update) {
        const pendingUpdate = new Date(this.ownItem.pending_update).getTime();
        const now = new Date().getTime();
        return pendingUpdate >= now;
      }
      const nextUpdate = new Date(this.ownItem.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
  },
};
</script>
