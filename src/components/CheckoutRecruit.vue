<template>
  <div class="row mx-3 mb-3 g-3">
    <div class="col-6">
      <div class="text-center w-100" v-if="pendingAmount">{{ new Date().getTime() + (timeToWait) | end }}</div>
      <div class="text-center w-100" v-else>{{ updateTime | ms }}</div>
      <UiButton :loading="isLoading"
        :class="[pendingAmount ? 'progress' : '', isLoading || pendingAmount || notEnough || inProgress || !base || tutorialStep < 8 ? 'border-red-dark color-red-dark' : 'border-green-dark border-green-dark color-green-dark']"
        :disabled="isLoading || pendingAmount || notEnough || inProgress || !base || tutorialStep < 8"
        @click="handleSubmit()" class="btn-full btn-xxs btn  w-100">
        <template>
          <div class="progression" v-if="inProgress" :style="'margin-right:' + (100 - percentage) + '%'"></div>
          <span v-if="!isLoading && pendingAmount === 0">
            {{ notEnough ? 'Miss resources' : 'Slow Recruit' }} </span>
          <span v-if="pendingAmount > 0">Recruiting {{ pendingAmount }} [{{ progress }}%]</span>
          <div v-else-if="isLoading">
            <div class="pt-2">
              Loading...
            </div>
          </div>
        </template>
      </UiButton>
    </div>
    <div class="col-6">
      <div class="text-center w-100">Instant</div>
      <UiButton v-if="tutorialStep < 9" :disabled="isLoading || notEnoughDWD || !base || (tutorialStep < 9 && id !== 'spy')" @click="handleSubmit('dwd')"
        class="btn-full btn-xxs btn border-yellow-dark color-yellow-dark w-100">
        <span>
          Fast Recruit</span>
      </UiButton>
      <UiButton v-else :disabled="isLoading || !base" @click="handleRequestPayment()"
        class="btn-full btn-xxs btn border-blue-dark color-blue-dark w-100">
        <span>
          Fast Recruit</span>
      </UiButton>
      <!-- <div class="d-flex">
        <div class="col-6">
        
        </div>
        <div v-if="!inProgress" class="col-5 mx-2">
          <UiButton :disabled="isLoading || notEnoughDWD || !base" @click="handleSubmit('dwd')"
            class="btn-full btn-xxs btn border-yellow-dark color-yellow-dark w-100">
            <span>
              {{ this.priceInDWD }} DW</span>
          </UiButton>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import { utils } from 'drugwars';

export default {
  props: ['id', 'level', 'coeff', 'inProgress', 'price', 'quantity', 'notEnough'],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
    };
  },
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
    updateTime() {
      return ((this.coeff * 1500) / (this.level + this.militaryAcademy)) * (this.quantity * 1000);
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    militaryAcademy() {
      let militaryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'academy'))
        militaryLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'academy').lvl;
      return militaryLvl;
    },

    pendingAmount() {
      if (
        this.$store.state.game.user.units.find(
          b =>
            b.unit === this.id && b.territory === this.base.territory && b.base === this.base.base,
        )
      )
        return (
          this.$store.state.game.user.units.find(
            b =>
              b.unit === this.id &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).pending_amount || 0
        );
      return 0;
    },
    priceInSteem() {
      let amount = this.quantity
      if (this.pendingAmount > 0)
        amount = this.pendingAmount
      return parseFloat((this.price * amount) / this.$store.state.game.prizeProps.steemprice).toFixed(4)
    },
    priceInDWD() {
      return parseFloat(this.priceInSteem * 50 / 100 * (100 - this.progress)).toFixed(4);
    },
    priceInTon() {
      return parseFloat((this.priceInSteem) / 100 * (100 - this.progress)).toFixed(4);
    },
    timeToWait() {
      const unit = this.$store.state.game.user.units.find(
        b => b.unit === this.id && b.territory === this.base.territory && b.base === this.base.base,
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
    timeToWaitString() {
      const unit = this.$store.state.game.user.units.find(
        b => b.unit === this.id && b.territory === this.base.territory && b.base === this.base.base,
      );
      if (unit) {
        const nextUpdate = new Date(unit.next_update).toLocaleString();
        return nextUpdate.replace('/2019', '');
      }
      return 0;
    },
    percentage() {
      return parseFloat(
        100 - (this.timeToWait / (this.updateTime * this.pendingAmount)) * 100,
      ).toFixed(2);
    },
    progress() {
      if (this.timeToWait && this.updateTime)
        return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2)
      else return 0
    }
  },
  methods: {
    ...mapActions(['recruitUnit', 'requestPayment', 'toggleModalPayment', 'setCurrentPayment', 'showLoading']),
    handleSubmit(use) {
      this.isLoading = true;
      if (this.quantity > 0) {
        let payload = {};
        if (use === 'dwd') {
          payload = {
            unit: this.id,
            unit_amount: Number(this.quantity),
            use: 'dwd',
            territory: Number(this.base.territory),
            base: Number(this.base.base),
          };
        } else {
          payload = {
            unit: this.id,
            unit_amount: Number(this.quantity),
            use: 'resources',
            territory: Number(this.base.territory),
            base: Number(this.base.base),
          };
        }
        this.recruitUnit(payload)
          .then(() => {
            this.isLoading = false;
            if (use === 'dwd') {
              const unit = this.$store.state.game.user.units.find(
                b =>
                  b.unit === this.id &&
                  b.territory === this.base.territory &&
                  b.base === this.base.base,
              );
            }
          })
          .catch(e => {
            console.error('Failed', e);
            this.isLoading = false;
          });
      }
    },
    async handleRequestPayment() {
      const dwd = {
        unit: this.id,
        unit_amount: Number(this.quantity),
        use: 'dwd',
        territory: Number(this.base.territory),
        base: Number(this.base.base),
      };
      const ton = {
        memo: `unit:${this.id},territory:${Number(this.base.territory)},base:${Number(
          this.base.base,
        )},amount:${this.quantity}`,
        amount: `${this.priceInTon * 1000000000}`,
      }
      this.setCurrentPayment({ type: "unit", dwd, ton, price: this.priceInDWD })
      this.toggleModalPayment()
    },
  },
};
</script>

<style scoped lang="less">
.checkout {
  text-align: center;
  width: 180px;
}

.dwdicon {
  width: 22px;
  left: 0px;
  position: relative;
  float: left;
  top: 5px;
}
</style>
