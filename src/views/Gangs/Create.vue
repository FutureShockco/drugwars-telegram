<template>
  <div>
    <GangsTabs />
    <div class="anim-fade-in">
      <!-- Header Card -->
      <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content">
          <div class="d-flex">
            <div>
              <h6 class="mb-n1 opacity-80 color-highlight">Gang Creation</h6>
              <h3>Create your gang</h3>
            </div>
            <div class="align-self-center ms-auto">
              <i class="fad fa-users-crown font-24 color-blue-dark"></i>
            </div>
          </div>
          <p class="mb-0">Start your criminal empire by creating your own gang. Recruit members, control territory, and dominate the streets.</p>
        </div>
      </div>

      <!-- Cost Requirements Card -->
      <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content">
          <div class="d-flex">
            <div>
              <h6 class="mb-n1 opacity-80 color-highlight">Creation Cost</h6>
              <h3>Required Resources</h3>
            </div>
            <div class="align-self-center ms-auto">
              <i class="fad fa-coins font-24 color-yellow-dark"></i>
            </div>
          </div>
          <Cost class="mt-3" :drugsCost="gangCreationFee.drugs" :weaponsCost="gangCreationFee.weapons" :alcoholsCost="gangCreationFee.alcohols" :quantity="1" />
          <div v-if="!hasEnough" class="alert alert-danger mt-3">
            <p class="mb-0"><i class="fad fa-exclamation-triangle me-2"></i>You need more resources to create your gang.</p>
          </div>
          <div v-else class="alert alert-success mt-3">
            <p class="mb-0"><i class="fad fa-check-circle me-2"></i>You have enough resources to create a gang!</p>
          </div>
        </div>
      </div>

      <!-- Gang Details Form Card -->
      <div v-if="hasEnough" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content">
          <div class="d-flex">
            <div>
              <h6 class="mb-n1 opacity-80 color-highlight">Gang Details</h6>
              <h3>Configure your gang</h3>
            </div>
            <div class="align-self-center ms-auto">
              <i class="fad fa-edit font-24 color-green-dark"></i>
            </div>
          </div>
          
          <form class="mt-3" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <h5 class="mb-2">Gang ID</h5>
              <p class="mb-2 opacity-80">No special characters, no spaces, maximum 16 characters</p>
              <input 
                class="form-control mb-2" 
                v-model="gang" 
                maxlength="16" 
                placeholder="Example: frenchconnection"
                :class="{ 'is-invalid': gang && !isValidGangId }"
              />
              <div v-if="gang && !isValidGangId" class="text-danger small">
                <i class="fad fa-exclamation-circle me-1"></i>Gang ID can only contain letters and numbers
              </div>
            </div>

            <div class="mb-4">
              <h5 class="mb-2">Gang Tag</h5>
              <p class="mb-2 opacity-80">Short identifier for your gang, maximum 6 characters</p>
              <input 
                class="form-control mb-2" 
                v-model="ticker" 
                maxlength="6" 
                placeholder="Example: FRCON"
                :class="{ 'is-invalid': ticker && !isValidTicker }"
              />
              <div v-if="ticker && !isValidTicker" class="text-danger small">
                <i class="fad fa-exclamation-circle me-1"></i>Gang tag can only contain letters and numbers
              </div>
            </div>

            <UiButton 
              class="btn w-100 btn-l gradient-green text-uppercase font-600 mb-3" 
              type="submit" 
              :disabled="isLoading || !gang || !ticker || !isValidGangId || !isValidTicker"
            >
              <SmallLoading v-if="isLoading"/>
              <span v-else><i class="fad fa-plus me-2"></i>Create Gang</span>
            </UiButton>
          </form>
        </div>
      </div>

      <!-- Insufficient Resources Card -->
      <div v-else class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content">
          <div class="d-flex">
            <div>
              <h6 class="mb-n1 opacity-80 color-highlight">Next Steps</h6>
              <h3>Gather more resources</h3>
            </div>
            <div class="align-self-center ms-auto">
              <i class="fad fa-arrow-up font-24 color-red-dark"></i>
            </div>
          </div>
          <p class="mb-3">You need to collect more resources before you can create a gang. Visit your buildings to produce more drugs, weapons, and alcohol.</p>
          
          <div class="row">
            <div class="col-6">
              <router-link :to="`/buildings`" class="btn w-100 btn-m gradient-blue text-uppercase font-600 mb-2">
                <i class="fad fa-building me-2"></i>Buildings
              </router-link>
            </div>
            <div class="col-6">
              <router-link :to="`/market`" class="btn w-100 btn-m gradient-purple text-uppercase font-600 mb-2">
                <i class="fad fa-store me-2"></i>Market
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBalances } from '@/helpers/utils';

const GANG_CREATION_FEE = {
  drugs: 250000,
  weapons: 250000,
  alcohols: 250000,
};

export default {
  data() {
    return {
      isLoading: false,
      gang: null,
      ticker: null,
      gangCreationFee: GANG_CREATION_FEE,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
    hasEnough() {
      return (
        this.balances.drugs > this.gangCreationFee.drugs &&
        this.balances.weapons > this.gangCreationFee.weapons &&
        this.balances.alcohols > this.gangCreationFee.alcohols
      );
    },
    isValidGangId() {
      if (!this.gang) return true;
      return /^[a-zA-Z0-9]+$/.test(this.gang.trim());
    },
    isValidTicker() {
      if (!this.ticker) return true;
      return /^[a-zA-Z0-9]+$/.test(this.ticker.trim());
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      this.isLoading = true;

      const payload = {
        gang: this.gang.trim().toLowerCase(),
        ticker: this.ticker.toUpperCase(),
        type: 'gang-create',
        territory: Number(this.base.territory),
        base: Number(this.base.base),
      };

      this.send(payload)
        .then(() => {
          setTimeout(() => {
            this.$router.push('/gangs');
          }, 3000);
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to create gang' });
          console.error('Failed to create gang', e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less"></style>
