<template>
  <div class="row mx-3 mb-3 g-3">
    <div class="col-6">
      <div class="text-center w-100" v-if="inProgress">End: {{ timeToWaitString }}</div>
      <div class="text-center w-100" v-else>{{ updateTime | ms }}</div>
      <UiButton :loading="isLoading || waitingConfirmation"
        :disabled="isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate || !base || (tutorialStep === 1 && id !== 'headquarters') || tutorialStep === 2 || tutorialStep === 3 || tutorialStep === 4 || tutorialStep === 5"
        :class="[inProgress ? 'progress' : '', isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate || !base || (tutorialStep === 1 && id !== 'headquarters') || tutorialStep === 2 || tutorialStep === 3 || tutorialStep === 4 || tutorialStep === 5 ? 'border-red-dark color-red-dark' : 'border-green-dark color-green-dark']"
        @click="handleSubmit()" class="btn btn-full btn-xxs w-100">
        <template>
          <div class="progression" v-if="inProgress" :style="'margin-right:' + (100 - percentage) + '%'"></div>
          <span>{{ upgradeLabel }}</span>
        </template>
      </UiButton>
    </div>
    <div class="col-6">
      <div class="text-center w-100">Instant</div>
      <div>
        <UiButton :loading="isLoading || waitingConfirmation"
          :disabled="isLoading || waitingConfirmation || requireUpdate || !base || (tutorialStep === 1 && id === 'headquarters') || (tutorialStep === 1 && id !== 'headquarters') || (tutorialStep === 2 && id !== 'crackhouse') || (tutorialStep === 5 && id !== 'training_facility')"
          :class="isLoading || waitingConfirmation || requireUpdate || !base || (tutorialStep === 1 && id === 'headquarters') || (tutorialStep === 1 && id !== 'headquarters') || (tutorialStep === 2 && id !== 'crackhouse') || (tutorialStep === 5 && id !== 'training_facility') ? 'border-red-dark color-red-dark' : 'border-blue-dark color-blue-dark'"
          @click="handleRequestPayment()" class="btn btn-full btn-xxs w-100">
          <span> Fast Upgrade
          </span>
        </UiButton>
        <!-- <div v-if="!inProgress" class="col-5 mx-2">

          <UiButton
            :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base || (tutorialStep === 2 && id !== 'crackhouse') || (tutorialStep === 3 && id !== 'ammunition') || (tutorialStep === 4 && id !== 't_distillery') || (tutorialStep === 5 && id !== 'training_facility')"
            :class="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base ? '' : 'button-yellow'"
            @click="handleSubmit('dwd')" class="btn-full btn-xxs btn border-yellow-dark color-yellow-dark w-100">
            <i class="fad fa-arrow-up me-1" />
            <span>
              {{ priceInDWD }} DW</span>

          </UiButton>
        </div> -->
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
    notEnoughDWD() {
      return parseFloat(this.priceInSteem * 50).toFixed(3) > this.$store.state.game.user.user.dwd;
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
      let label = 'Slow Upgrade';
      if ((this.tutorialStep < 8 && this.id !== 'headquarters')) label = 'Finish tutorial';
      if (this.notEnough) label = 'No resources';
      if (this.requireUpdate) label = 'Require HQ+';
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
    ...mapActions(['upgradeBuilding', 'requestPayment', 'toggleModalPayment', 'setCurrentPayment']),
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
    async handleRequestPayment() {
      const dwd = {
        building: this.id,
        level: this.level,
        use: 'dwd',
        territory: Number(this.base.territory),
        base: Number(this.base.base),
      };
      const ton = {
        memo: `upgrade:${this.id},territory:${Number(this.base.territory)},base:${Number(
          this.base.base,
        )}`,
        amount: `${this.priceInSteem * 1000000000}`,
      }
      this.setCurrentPayment({ type: "building", dwd, ton, price: this.priceInDWD })
      this.toggleModalPayment()
      // this.requestPayment({
      //   memo: `upgrade:${this.id},territory:${Number(this.base.territory)},base:${Number(
      //     this.base.base,
      //   )}`,
      //   amount: `${this.priceInSteem * 1000000000}`,
      // });
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
