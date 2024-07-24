<template>
  <div v-if="building.id === 'strategic_center' && !main"></div>
  <div v-else-if="building.id === 'pantheon' && !main"></div>
  <div v-else>
    <div :class="[tutorialStep === 1 && building.id === 'headquarters' ? 'tutobox' : '', tutorialStep === 2 && building.id === 'crackhouse' ? 'tutobox' : '', tutorialStep === 3 && building.id === 'ammunition' ? 'tutobox' : '', tutorialStep === 4 && building.id === 't_distillery' ? 'tutobox' : '', tutorialStep === 5 && building.id === 'training_facility' ? 'tutobox' : '']">
      <div class="card card-style mb-3"
        :class="[hasNotEnough ? 'not-enough' : '']">
        <div class="content">
          <div class="d-flex">
            <div class="pt-1 ms-auto">
              <div
                style="position: relative;overflow: hidden;height:100px;width:100px;    border-bottom: 1px solid red;"
                class="rounded-s">
                <img :style="inProgress ? 'filter: grayscale(1);' : ''" style="border: 1px solid #392828;    "
                  :src="`/img/buildings/${building.id}.jpg`" class="img-fluid rounded-s" width="100" height="100">
                <div v-if="inProgress" style="text-align:center;position: absolute; top:0px; width:100%;z-index:10;">
                  <h5 class="color-highlight" style="padding:5px;background:#0000004d;border-radius: 0px 0px 5px 5px;">
                    {{
                      progress }}%</h5>
                </div>
                <div v-if="inProgress" id="overlay2" style="left: 0px;
    position: absolute;
    overflow: hidden;
       background-position: bottom;
    width: 100%;
    z-index:50;
    background-size: cover;
    border-top: 1px solid green;
    " :style="`top:${100 - progress}%;height:${progress}%!important;`">

                </div>
                <div v-if="inProgress" class="ocrloader">
                  <em></em>
                  <span></span>
                </div>
                <div id="overlay" class="rounded-s" style="left: 0px;
    position: absolute;
    overflow: hidden;
       background-position: bottom;
    width: 100%;
    background-size: cover;

    " :style="`top:${100 - progress}%;background-size:100%; height:${progress}%!important;background-image:url(/img/buildings/${building.id}.jpg)`">
                </div>
              </div>
            </div>
            <div class="ps-3 me-auto" style="width: 100%;">
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
                  {{ (10000 + (18000 * ownItem.lvl * (Math.sqrt(ownItem.lvl)) / 100) * ownItem.lvl) / 100 * 20 | amount
                  }}
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
              <div class="w-100" v-if="inProgress">End: {{ timeToWaitString }}</div>

            </div>

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
  </div>

</template>

<script>
import { utils, upgrades } from 'drugwars';
import { getBalances } from '@/helpers/utils';

export default {
  props: ['building'],
  watch: {
    inProgress(val) {
      if (val) {
        this.waitingConfirmation = false;
      }
    },
  },
  computed: {
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
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
    timeToWaitString() {
      const building = this.$store.state.game.user.buildings.find(
        b =>
          b.building === this.building.id &&
          b.territory === this.base.territory &&
          b.base === this.base.base,
      );
      if (building) {
        const nextUpdate = new Date(building.next_update).toLocaleString();
        return nextUpdate.replace('/2019', '');
      }
      return 0;
    },
    timeToWait() {
      const building = this.$store.state.game.user.buildings.find(
        b =>
          b.building === this.building.id &&
          b.territory === this.base.territory &&
          b.base === this.base.base,
      );
      if (building) {
        if (building.pending_update) {
          const nextUpdate = new Date(building.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }

        const nextUpdate = new Date(building.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    updateTime() {
      return utils.calculateTimeToBuild(this.building.id, this.building.coeff, this.ownItem.lvl + 1, this.ownHq.lvl);
    },
    progress() {
      if (this.timeToWait || this.updateTime)
        return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2)
      else return 100
    },

  },
};
</script>

<style scoped>
.ocrloader span::before {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 45%;
  width: 10px;
  z-index: 0;
  height: 100%;
  background: green;
  box-shadow: 0 0 20px 5px green;
  clip-path: inset(0);
  animation:
    x 1s ease-in-out infinite,
    y 1s ease-in-out infinite;
  rotate: 90deg;
  top: 0px;
}


@keyframes x {
  1% {
    rotate: 90deg;
    transform: translateX(100px);
  }

  100% {
    rotate: 90deg;
    transform: translateX(-100px);
  }
}

@keyframes y {
  33% {
    clip-path: inset(0 0 0 -50px);
  }

  50% {
    clip-path: inset(0 0 0 0);
  }

  83% {
    clip-path: inset(0 -50px 0 0);
  }

}
</style>