<template>
  <div class="d-flex w-100 pb-2">
    <div :class="inProgress ? 'col-12 pe-0' : 'col-4 pe-0  mx-2 '">
      <div class="text-center w-100" v-if="inProgress">End: {{ timeToWaitString }}</div>
      <div class="text-center w-100" v-else>Require: {{ updateTime | ms }}</div>
      <button :disabled="isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate || !base"
        :class="[inProgress ? 'progress' : '', isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate || !base ? 'gradient-red' : '']"
        @click="handleSubmit()" class="btn-full btn-xxs btn border-green-dark color-green-dark w-100">
        <template v-if="isLoading || waitingConfirmation">
          <SmallLoading />
        </template>

        <template v-else>
          <div class="progression" v-if="inProgress" :style="'margin-right:' + (100 - percentage) + '%'"></div>
          <i class="fad fa-arrow-up me-2" />
          <span>{{ upgradeLabel }}</span>

        </template>
      </button>

    </div>
    <div class="col-8">
      <div class="text-center w-100">Instant upgrade with TON or DWD</div>
      <div class="d-flex">
        <div v-if="!inProgress" class="col-6">
          <!-- <button :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || !base"
        @click="handleRequestPayment()" class="button btn-block button-blue">
        <i class="iconfont icon-zap" />
        <span>
          {{ priceInSteem }} DWD</span>
      </button> -->
          <button :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base"
            :class="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base ? '' : 'button-yellow'"
            @click="handleSubmit('dwd')" class="btn-full btn-xxs btn border-blue-dark color-blue-dark w-100">
            <i class="fad fa-arrow-up me-2" />
            <span>
              {{ (priceInDWD / 25).toFixed(4) }} TON</span>

          </button>
        </div>
        <div v-if="!inProgress" class="col-5 mx-2">
          <!-- <button :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || !base"
        @click="handleRequestPayment()" class="button btn-block button-blue">
        <i class="iconfont icon-zap" />
        <span>
          {{ priceInSteem }} DWD</span>
      </button> -->
          <button :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base"
            :class="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base ? '' : 'button-yellow'"
            @click="handleSubmit('dwd')" class="btn-full btn-xxs btn border-yellow-dark color-yellow-dark w-100">
            <i class="fad fa-arrow-up me-2" />
            <span>
              {{ priceInDWD }} DWD</span>

          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';

export default {
  props: ['id', 'level', 'coeff', 'hqLevel', 'inProgress', 'price', 'notEnough'],
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
    base() {
      return this.$store.state.game.mainbase;
    },
    updateTime() {
      return utils.calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    priceInSteem() {
      return parseFloat(this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
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
      return parseFloat(this.priceInSteem * 50).toFixed(3) > this.$store.state.game.user.user.dwd;
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    timeToWait() {
      const building = this.$store.state.game.user.buildings.find(
        b =>
          b.building === this.id &&
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
    timeToWaitString() {
      const building = this.$store.state.game.user.buildings.find(
        b =>
          b.building === this.id &&
          b.territory === this.base.territory &&
          b.base === this.base.base,
      );
      if (building) {
        const nextUpdate = new Date(building.next_update).toLocaleString();
        return nextUpdate.replace('/2019', '');
      }
      return 0;
    },
    percentage() {
      return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2);
    },
    requireUpdate() {
      return this.level > this.hqLevel && this.id !== 'headquarters';
    },
    upgradeLabel() {
      let label = 'Upgrade';
      if (this.notEnough) label = 'Miss resources';
      if (this.requireUpdate) label = 'Require HQ upgrade';
      if (this.inProgress) {
        label = `Upgrading [${parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(
          2,
        )}%]`;
      }
      if (!this.base) label = 'Choose a location';
      return label;
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
    handleSubmit(use) {
      this.isLoading = true;
      let payload = {};
      if (use === 'dwd') {
        payload = {
          building: this.id,
          level: this.level,
          use: 'dwd',
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
        const building = this.$store.state.game.user.buildings.find(
          b =>
            b.building === this.id &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        );
        if (building) {
          building.next_update = new Date().getTime() + 3000;
        }
      } else {
        payload = {
          building: this.id,
          level: this.level,
          use: 'resources',
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
      }
      this.upgradeBuilding(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    handleRequestPayment() {
      this.requestPayment({
        memo: `upgrade:${this.id},territory:${Number(this.base.territory)},base:${Number(
          this.base.base,
        )},server:${this.$store.state.game.server.number}`,
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
