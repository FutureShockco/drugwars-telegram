<template>
  <div class="card card-style mx-0 mb-1" style="border-radius: 0px;"
    :class="unit.id === 'spy' && tutorialStep === 6 ? 'tutobox' : ''">
    <div class="content">
      <div class="d-flex " style="position: relative;">
        <div class="pt-1 ms-auto">
          <div style="position: relative;overflow: hidden;height:100px;width:100px;    border-bottom: 1px solid red;"
            class="rounded-s">
            <img :style="inProgress ? 'filter: grayscale(1);' : ''" style="border: 1px solid #392828;    "
              :src="`/img/units/${unit.id}.png`" class="img-fluid rounded-s" width="100" height="100">
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

    " :style="`top:${100 - progress}%;background-size:100%; height:${progress}%!important;background-image:url(/img/units/${unit.id}.png)`">
            </div>
          </div>
        </div>
        <div class="ps-3 me-auto" style="width: 100%;">
          <h3 class="mt-0 mb-0">{{ unit.name }} <span class="unit-type">{{ unit.type }}</span></h3>

          <div>Supply : {{ unit.supply }} - Cluster : {{ unit.group }}</div>
          <!-- <div class="mb-1 mt-1" v-html="unit.desc"></div> -->
          <div class="mb-1 item-skill" v-if="unit.feature">
            <span>
              {{ unit.feature }}
            </span>
          </div>
          <Cost :drugsCost="unit.drugs_cost" :weaponsCost="unit.weapons_cost" :alcoholsCost="unit.alcohols_cost"
            :quantity="quantity" :special="unit.special_cost" />
        </div>
      </div>
      <div class="level">{{ ownItem.amount }}</div>
      <UnitValues :unit="unit" :modifiedValues="modifiedValues" :speed="speed" />
    </div>
    <div v-if="!inProgress" class="mx-auto d-flex form-field form-name">
      <button @click="quantity--"  :disabled="quantity < 2" class="btn btn-xxs border" style="border-radius: 3px 0px 0px 3px;min-width: 30px;"> -</button>
      <input class="input form-control" type="number" v-model="quantity" min="1">
      <button @click="quantity++" class="btn btn-xxs border" style="border-radius: 0px;min-width: 30px;"> +</button>
      <button @click="setMax()" class="btn btn-xxs border" style="border-radius: 0px 3px 3px 0px;min-width: 50px;"> Max</button>
    </div>
    <CheckoutRecruit :id="unit.id" :level="training_facility.lvl" :coeff="unit.coeff" :inProgress="inProgress"
      :price="(unit.drugs_cost / 1400000 + unit.weapons_cost / 1400000 + unit.alcohols_cost / 1400000)"
      :notEnough="hasNotEnough" :quantity="pendingAmount > 0 ? pendingAmount : quantity" />
  </div>
</template>

<script>
import { getBalances, unitValues } from '@/helpers/utils';
import AnimatedNumber from "animated-number-vue";

export default {
  props: ['unit'],
  watch: {
    inProgress(val) {
      if (val) {
        this.waitingConfirmation = false;
      }
    },
  },
  data() {
    return {
      quantity: 1,
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  components: {
    AnimatedNumber
  },
  computed: {
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    user() {
      return this.$store.state.game.user.user;
    },
  
    speed() {
      let routing = 0;
      if (this.$store.state.game.user.trainings.find(b => b.training === 'routing'))
        routing = this.$store.state.game.user.trainings.find(b => b.training === 'routing').lvl;
      const speed = this.unit.speed * 60 * 1000;
      return speed - (speed / 200) * routing;
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
        this.unit.drugs_cost * this.quantity > this.balances.drugs ||
        this.unit.weapons_cost * this.quantity > this.balances.weapons ||
        this.unit.alcohols_cost * this.quantity > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.units.find(
          b =>
            b.unit === this.unit.id &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          amount: 0,
        }
      );
    },
    militaryAcademy() {
      let militaryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'academy'))
        militaryLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'academy').lvl;
      return militaryLvl;
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
    pendingAmount() {
      if (
        this.$store.state.game.user.units.find(
          b =>
            b.unit === this.unit.id && b.territory === this.base.territory && b.base === this.base.base,
        )
      )
        return (
          this.$store.state.game.user.units.find(
            b =>
              b.unit === this.unit.id &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).pending_amount || 0
        );
      return 0;
    },
    training_facility() {
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
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
    percentage() {
      return parseFloat(
        100 - (this.timeToWait / (this.updateTime * this.pendingAmount)) * 100,
      ).toFixed(2);
    },
    timeToWait() {
      const unit = this.$store.state.game.user.units.find(
        b => b.unit === this.unit.id && b.territory === this.base.territory && b.base === this.base.base,
      );
      if (unit) {
        if (unit.pending_update) {
          const nextUpdate = new Date(unit.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }
        const nextUpdate = new Date(unit.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    updateTime() {
      return ((this.unit.coeff * 1500) / (this.training_facility.lvl)) * (this.pendingAmount * 1000);
    },
    progress() {
      if (this.timeToWait || this.updateTime)
        return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2)
      else return 100
    },
    modifiedValues() {
      if (this.user && this.$store.state.game.user.trainings) {
        const trainings = this.$store.state.game.user.trainings;
        if (trainings.length > 0) {
          const value = unitValues(this.unit, trainings)
          return value
        }
      }
      return this.unit;
    },
  },
  methods: {

    formatToPrice(value) {
      return `${parseFloat(value).toFixed(2)}%`;
    },
    setMax() {
      let maxD = this.balances.drugs / this.unit.drugs_cost
      let maxW = this.balances.weapons / this.unit.weapons_cost
      let maxA = this.balances.alcohols / this.unit.alcohols_cost
      this.quantity = Math.floor(Math.min(maxD,maxW,maxA))
     
    }
  },
};
</script>


<style scoped lang="less">
.skill-icons {
  position: relative;
  top: -25px;
  left: 0px;
  max-width: 100px;
}

.skill-defense {
  font-size: 12px;
}

.unit-type {
  font-size: 12px;
  color: gray;
}

.level {
  position: absolute;
  top: 0px;
  right: 5px;
  z-index: 1;
  background: black;
  color: #FFCE54;
  text-align: center;
  padding-top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

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
