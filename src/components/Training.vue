<template>
  <div class="card mx-0 border-bottom-highlight mb-1">
    <div class="content">
      <div class="d-flex">
        <div class="pt-1 ms-auto">
          <div style="position: relative;overflow: hidden;height:100px;width:100px;    border-bottom: 1px solid red;"
            class="rounded-s">
            <img :style="inProgress ? 'filter: grayscale(1);' : ''" style="border: 1px solid #392828;    "
              :src="`/img/trainings/${training.id}.png`" class="img-fluid rounded-s" width="100" height="100">
            <div v-if="inProgress" style="text-align:center;position: absolute; top:0px; width:100%;z-index:10;">
              <h5 class="color-highlight" style="padding:5px;background:#0000004d;border-radius: 0px 0px 5px 5px;">
                <animated-number style="line-height: unset;" :value="progress" :formatValue="formatToPrice"
                  :duration="500" />
              </h5>
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

    " :style="`top:${100 - progress}%;background-size:100%; height:${progress}%!important;background-image:url(/img/trainings/${training.id}.png)`">
            </div>
          </div>
        </div>

        <div class="ps-3 me-auto" style="width: 100%;">
          <!-- <div class="level">{{ ownItem.lvl }}</div> -->
          <div class="item-content width-full mr-3 mb-4">
            <h3 class="mt-0">{{ training.name }} lvl.{{ ownItem.lvl }}</h3>
            <div v-if="training.feature" class="mb-2">
              <div>{{ training.feature }}</div>
            </div>
            <Cost :drugsCost="drugsCost" :weaponsCost="weaponsCost" :alcoholsCost="alcoholsCost" :quantity="1" />
          </div>
        </div>
      </div>
      <!-- <div class="mb-2" v-html="training.desc"></div> -->
      <div v-for="unit in training_modificator[training.id]" :key="unit" class="d-inline-block">
        <div v-if="unit === 'all' && !a.npc" v-for="a in units" :key="a.id" class="d-inline">
          <img class="preview unit mini mb-2 me-2 rounded-s" width="50" :src="`/img/units/${a.id}.png`">
        </div>
        <div v-if="unit === 'melee' && m.type === 'Melee' && !m.npc && m.id !== 'hobo'" v-for="m in units" :key="m.id"
          class="d-inline">
          <img class="preview unit mini mb-2  me-2 rounded-s" width="50" :src="`/img/units/${m.id}.png`">
        </div>
        <div v-if="unit === 'range' && r.type === 'Range' && !r.npc" v-for="r in units" :key="r.id"
          class="d-inline">
          <img class="preview unit mini mb-2  me-2 rounded-s" width="50" :src="`/img/units/${r.id}.png`">
        </div>
        <div v-if="unit === t.id && !t.npc" v-for="t in units" :key="t.id" class="d-inline">
          <img class="preview unit mini mb-2  me-2 rounded-s" width="50" :src="`/img/units/${t.id}.png`">
        </div>

      </div>
    </div>
    <div v-if="(training.id === 'routing' && ownItem.lvl > 209)">Max level reached</div>
    <CheckoutTraining v-else :id="training.id" :level="ownItem.lvl + 1" :coeff="training.coeff"
      :researchCenterLvl="ownResearchCenter.lvl" :inProgress="inProgress" :price="drugsCost / 80000"
      :notEnough="hasNotEnough" />
  </div>
</template>

<script>
import { utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';
import { units } from 'drugwars';
import AnimatedNumber from "animated-number-vue";

export default {
  props: ['training'],
  components: {
    AnimatedNumber
  },
  methods: {
    formatToPrice(value) {
      return `${parseFloat(value).toFixed(2)}%`;
    }
  },
  data() {
    return {
      training_modificator: {
        routing: ['all'],
        closecombat: ['melee'],
        firearms: ['range'],
        information: ['all'],
        sniping: ['sniper'],
        spiritwine: ['hobo'],
        coordination: ['all'],
        chemical: ['mercenary', 'knifer'],
        weapon: ['rowdy', 'sniper', 'hitman', 'biker'],
        fire: ['gunman', 'helicopter'],
        protection: ['all'],
        bomb: ['bazooka'],
        psychological: ['mercenary', 'knifer', 'big_mama', 'ninja'],
      },
      units,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
    hasNotEnough() {
      return (
        this.drugsCost > this.balances.drugs ||
        this.weaponsCost > this.balances.weapons ||
        this.alcoholsCost > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.trainings.find(b => b.training === this.training.id) || {
          lvl: 0,
        }
      );
    },
    ownResearchCenter() {
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
    drugsCost() {
      return utils.calculateCostToUpgrade(this.training.drugs_cost, this.ownItem.lvl);
    },
    weaponsCost() {
      return utils.calculateCostToUpgrade(this.training.weapons_cost, this.ownItem.lvl);
    },
    alcoholsCost() {
      return utils.calculateCostToUpgrade(this.training.alcohols_cost, this.ownItem.lvl);
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
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
    timeToWait() {
      const training = this.$store.state.game.user.trainings.find(
        b =>
          b.training === this.training.id
      );
      if (training) {
        if (training.pending_update) {
          const nextUpdate = new Date(training.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }

        const nextUpdate = new Date(training.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    updateTime() {
      return utils.calculateTimeToBuild(this.training.id, this.training.coeff, this.ownItem.lvl + 1, this.ownResearchCenter.lvl);
    },
    progress() {
      if (this.timeToWait || this.updateTime)
        return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2)
      else return 100
    },
  },
};
</script>
