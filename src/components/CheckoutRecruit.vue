<template>
  <div class="d-flex w-100 pb-2">
    <div :class="pendingAmount ? 'd-none' : 'col-4 pe-0  mx-2 '">
      <div class="text-center w-100" v-if="pendingAmount">End: {{ timeToWaitString }}</div>
      <div class="text-center w-100" v-else>{{ updateTime | ms }}</div>
      <button
        :class="[pendingAmount ? 'progress' : '', isLoading || pendingAmount || notEnough || inProgress || !base ? 'gradient-red text-white' : 'border-green-dark border-green-dark color-green-dark']"
        :disabled="isLoading || pendingAmount || notEnough || inProgress || !base || tutorialStep < 8" @click="handleSubmit()"
        class="btn-full btn-xxs btn  w-100">
        <template v-if="isLoading || waitingConfirmation">
          Loading...
        </template>
        <template v-else>
          <div class="progression" v-if="inProgress" :style="'margin-right:' + (100 - percentage) + '%'"></div>
          <i class="iconfont icon-person" />
          <span v-if="!isLoading && pendingAmount === 0">
            {{ notEnough ? 'Miss resources' : 'Recruit' }} </span>
          <span v-if="pendingAmount > 0">Recruiting {{ pendingAmount }} [{{ percentage }}%]</span>
          <div v-else-if="isLoading">
            <div class="pt-2">
              Loading...
            </div>
          </div>
        </template>
      </button>
    </div>
    <div v-if="!pendingAmount" class="col-8">
      <div class="text-center w-100">Instant upgrade TON or DW</div>
      <div class="d-flex">
        <div class="col-6">
          <button :disabled="isLoading || !base || tutorialStep < 8" @click="handleRequestPayment()"
            class="btn-full btn-xxs btn border-blue-dark color-blue-dark w-100">
            <i class="iconfont icon-zap" />
            <span>
              {{ this.priceInSteem }} TON</span>
          </button>
        </div>
        <div v-if="!inProgress" class="col-5 mx-2">
          <button :disabled="isLoading || notEnoughDWD || !base" @click="handleSubmit('dwd')"
            class="btn-full btn-xxs btn border-yellow-dark color-yellow-dark w-100">
            <span>
              {{ this.priceInDWD }} DW</span>
          </button>
        </div>
      </div>
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
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
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
      return parseFloat(
        (this.price * this.quantity) / this.$store.state.game.prizeProps.steemprice,
      ).toFixed(3);
    },
    priceInDWD() {
      return parseFloat(this.priceInSteem * 50).toFixed(3);
    },
    dwdPrice() {
      if (!this.$store.state.game.prizeProps.seProps || !this.$store.state.game.prizeProps.seProps.lastPrice)
        return false
      const price = this.$store.state.game.prizeProps.seProps.lastPrice || 0;
      return price * this.priceInDWD * this.$store.state.game.prizeProps.steemprice;
    },
    notEnoughDWD() {
      return (this.priceInSteem * 50).toFixed(3) > this.$store.state.game.user.user.dwd;
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
  },
  methods: {
    ...mapActions(['recruitUnit', 'requestPayment']),
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
    handleRequestPayment() {
      this.requestPayment({
        memo: `unit:${this.id},territory:${Number(this.base.territory)},base:${Number(
          this.base.base,
        )},amount:${this.quantity},server:${this.$store.state.game.server.number}`,
        amount: `${this.priceInSteem} STEEM`,
      });
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
