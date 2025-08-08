<template>
  <div>
    <div v-if="ownBase">
      <BootcampTabs />
      <div v-if="ownBase && !bunker || !bunker.lvl" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content">
          <h4 class="text-center">
            You must build a bunker first.
            <h2>
              <router-link :to="`/buildings`" class="text-yellow">Click here to build a bunker.</router-link>
            </h2>
          </h4>
        </div>
      </div>
      <div v-else class="anim-fade-in">
        <div v-if="ownUnits.length > 0 && !defenders || defenders.length < 1" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h3>Your bunker is empty</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-shield font-24 color-red-dark"></i>
              </div>
            </div>
            <p>Your bunker is empty. Hide units here to protect them from attacks.</p>
          </div>
        </div>
        <div v-else class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Hidden Units</h6>
                <h3>Units in the bunker</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-shield font-24 color-green-dark"></i>
              </div>
            </div>
            <ArmyToSend :units="defenders" :disableicon="true" />
            <div class="row mt-3">
              <div class="col-12">
                <h5 class="mb-1">Army Value</h5>
                <p class="mb-2">Drugs: <Icon name="drug" /> {{ defendercost.drugs | amount }} - Weapons: <Icon name="weapon" /> {{ defendercost.weapons | amount }} - Alcohol: <Icon name="alcohol" /> {{ defendercost.alcohol | amount }}</p>
                <h5 class="mb-1">Power: {{ defenderOffensivePower }}% - Supply: {{ defendersupply | amount }} / {{ maxSupply | amount }}</h5>
              </div>
            </div>
            <UiButton :disabled="!defenders || isLoading" class="btn w-100 btn-l gradient-red text-uppercase font-600 mb-3"
              @click="handleRelease()">
              <SmallLoading v-if="isLoading" />
              <span v-else>Release units</span>
            </UiButton>
          </div>
        </div>
        <div v-if="ownUnits.length > 0" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Select Units</h6>
                <h3>Choose units to hide</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-users font-24 color-blue-dark"></i>
              </div>
            </div>
            <div v-if="showUnits && ownUnits && ownUnits.length > 0" class="row d-flex">
              <div v-for="ownUnit in ownUnits" :key="ownUnit.key + ownBase.territory + ownBase.base" class="col-3">
                <UnitSelect v-if="ownUnit.amount > 0" :item="ownUnit" @select="addUnit" />
              </div>
            </div>
            <div v-else class="alert alert-warning">
              <p class="mb-0">You must buy troops first</p>
            </div>
            <UiButton v-if="ownUnits.length > 0" class="btn-full w-100 btn-xxs btn border-mint-dark color-mint-dark mt-3" 
              :disabled="ownUnits.length === 0" @click="autoFill()">
              AutoFill
            </UiButton>
          </div>
        </div>

        <div v-if="ownUnits.length > 0" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Selected Army</h6>
                <h3>Units to hide</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-shield font-24 color-yellow-dark"></i>
              </div>
            </div>
            <div class="mt-3">
              <ArmyToSend :units="selectedUnits" />
            </div>
            <div v-if="selectedUnits.length === 0" class="alert alert-info mt-3">
              <p class="mb-0">You need to select at least 1 unit to hide in this bunker.</p>
            </div>
            <div v-else class="mt-3">
              <h5 class="mb-1">Units Value</h5>
              <p class="mb-2"><Icon name="drug" /> Drugs: {{ cost.drugs | amount }} - <Icon name="weapon" /> Weapons: {{ cost.weapons | amount }} - <Icon name="alcohol" /> Alcohol: {{ cost.alcohol | amount }}</p>
              <h5 class="mb-1">Power: {{ offensivePower }}% - Supply: {{ supply | amount }} / {{ maxSupply | amount }}</h5>
              <UiButton class="btn w-100 mt-3 btn-m gradient-yellow text-uppercase font-600 mb-3" @click="removeUnits()">
                Remove all
              </UiButton>
            </div>
            <div v-if="defenders && defenders.length > 0" class="alert alert-warning mb-3">
              <p class="mb-0">Please release your hidden units before adding new units.</p>
            </div>
            <UiButton :disabled="defenders.length > 0 || tooMuchSupply || selectedUnits.length === 0 || isLoading"
              class="btn w-100 btn-m gradient-mint text-uppercase font-600 mb-3" @click="handleSave()">
              <SmallLoading v-if="isLoading" />
              <span v-else>Hide units</span>
            </UiButton>
            <div v-if="errorMessage" class="alert alert-danger">
              <p class="mb-0">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
        <div v-else class="card anim-fade-in">
          <div class="content">
            <h4 class="text-center">
              You don't have any unit.
              <h2>
                <router-link :to="`/units`" class="text-yellow">Click here to start recruiting</router-link>
              </h2>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card anim-fade-in">
      <div class="content">
        <h4 class="text-center">
          You must choose a location on the map first.
          <h2>
            <router-link :to="'/map/territory?location=' + rnd" class="text-yellow">Click here to choose a
              location.</router-link>
          </h2>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';
import { units } from 'drugwars';
import Promise from 'bluebird';
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      isLoading: false,
      base: this.$route.query.base || null,
      selectedUnits: [],
      message: null,
      username: this.$store.state.auth.username,
      errorMessage: null,
      baseName: null,
      favoriteCombinations: JSON.parse(localStorage.getItem('fav_combi_def')) || null,
      combination_name: null,
      units: [],
      bases: [],
      defenders: [],
      active: false,
      showUnits: true,
    };
  },
  components: {
    draggable,
  },
  created() {
    this.isLoading = true;
    this.loadDefenders();
  },
  watch: {
    ownBase() {
      this.loadDefenders();
    },
    ownUnits() {
      const units = [];
      this.storeUnits.forEach(element => {
        if (
          element.territory === this.ownBase.territory &&
          element.base === this.ownBase.base &&
          element.amount > 0
        )
          units.push({
            key: element.unit,
            amount: element.amount,
          });
      });
      return units;
    },
  },
  computed: {
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    allbase() {
      return this.$store.state.game.user.buildings || null;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    ownUnits() {
      const units = [];
      const self = this;
      this.showUnits = false;
      this.storeUnits.forEach(element => {
        if (
          element.territory === this.ownBase.territory &&
          element.base === this.ownBase.base &&
          element.amount > 0
        )
        if(element.unit !== 'spy' && element.unit !== 'occupation_troop' && element.unit !== 'hobo')
          units.push({
            key: element.unit,
            amount: element.amount,
          });
      });
      setTimeout(() => {
        self.showUnits = true;
      }, 100);
      return units;
    },
    storeUnits() {
      return this.$store.state.game.user.units;
    },
    defendersupply() {
      let supply = 0;
      if (this.defenders.length > 0)
        this.defenders.forEach(unit => {
          supply += units[unit.key].supply * unit.amount;
        });
      return supply;
    },
    supply() {
      let supply = 0;
      this.selectedUnits.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      return supply;
    },
    defensivePower() {
      let supply = 0;
      let power = 0;
      this.$store.state.game.user.units.forEach(unit => {
        supply += units[unit.unit].supply;
      });
      power = Math.round(100 - parseFloat(supply / 5).toFixed(0) / 100);
      const coordination = this.$store.state.game.user.trainings.find(
        b => b.key === 'coordination' || b.training === 'coordination',
      );
      if (coordination) power += parseInt(coordination.lvl) / 10;
      if (power >= 100) return 100;
      if (power >= 65) return power;
      return 65;
    },
    offensivePower() {
      let supply = 0;
      let power = 0;
      this.selectedUnits.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      power = Math.round(100 - parseFloat(supply / 6).toFixed(0) / 100);
      const coordination = this.$store.state.game.user.trainings.find(
        b => b.key === 'coordination' || b.training === 'coordination',
      );
      if (coordination) power += parseInt(coordination.lvl) / 10;
      if (power >= 100) return 100;
      if (power >= 60) return power;
      return 60;
    },
    defenderOffensivePower() {
      let supply = 0;
      let power = 0;
      this.defenders.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      power = Math.round(100 - parseFloat(supply / 6).toFixed(0) / 100);
      const coordination = this.$store.state.game.user.trainings.find(
        b => b.key === 'coordination' || b.training === 'coordination',
      );
      if (coordination) power += parseInt(coordination.lvl) / 10;
      if (power >= 100) return 100;
      if (power >= 65) return power;
      return 65;
    },
    cost() {
      const self = this;
      const cost = { drugs: 0, weapons: 0, alcohol: 0 };
      this.selectedUnits.forEach(unit => {
        cost.drugs += units[unit.key].drugs_cost * unit.amount;
        cost.weapons += units[unit.key].weapons_cost * unit.amount;
        cost.alcohol += units[unit.key].alcohols_cost * unit.amount;
      });
      return cost;
    },
    defendercost() {
      const self = this;
      const cost = { drugs: 0, weapons: 0, alcohol: 0 };
      if (this.defenders && this.defenders.length > 0)
        this.defenders.forEach(unit => {
          cost.drugs += units[unit.key].drugs_cost * unit.amount;
          cost.weapons += units[unit.key].weapons_cost * unit.amount;
          cost.alcohol += units[unit.key].alcohols_cost * unit.amount;
        });
      return cost;
    },
    maxSupply() {
      const max_supply = this.bunker.lvl * 2000;
      return max_supply;
    },
    tooMuchSupply() {
      return this.supply > this.maxSupply;
    },
    bunker() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'bunker' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
  methods: {
    ...mapActions(['missions', 'init', 'get_bases', 'setBase']),
    loadDefenders() {
      this.defenders = [];
      const params = { base: this.ownBase.base, territory: this.ownBase.territory };
      client.requestAsync('get_defenders', params).then(result => {
        if (result && result[0] && result[0].json) {
          this.defenders = JSON.parse(result[0].json).units;
        }
        this.isLoading = false;
      });
    },
    autoFill() {
      
      // Clear existing selections first
      this.selectedUnits = [];
      
      // Get units that can be hidden (exclude spy, occupation_troop, hobo)
      const availableUnits = this.ownUnits.filter(element => 
        element.key !== 'spy' && 
        element.key !== 'occupation_troop' && 
        element.key !== 'hobo'
      );

      console.log('Available units:', availableUnits);
      console.log('Max supply:', this.maxSupply);

      if (availableUnits.length === 0) {
        console.log('No available units to hide');
        return;
      }

      // Fill up to 85% of bunker capacity
      const targetSupply = Math.floor(this.maxSupply * 0.85);
      let currentSupplyUsed = 0;
      const selectedUnits = [];

      console.log('Target supply (85%):', targetSupply);

      // Sort units by supply cost (add smaller units first for better distribution)
      const sortedUnits = [...availableUnits].sort((a, b) => 
        units[a.key].supply - units[b.key].supply
      );

      for (const unit of sortedUnits) {
        const unitSupply = units[unit.key].supply || 1; // Fallback to 1 if supply is 0
        const remainingSupply = targetSupply - currentSupplyUsed;
        
        if (remainingSupply <= 0) break;

        // Calculate how many of this unit we can add
        const maxUnitsForSupply = Math.floor(remainingSupply / unitSupply);
        const maxUnitsAvailable = unit.amount;
        
        // Take the minimum of what we can fit and what we have
        const amountToAdd = Math.min(maxUnitsForSupply, maxUnitsAvailable);
        
        console.log(`Unit ${unit.key}: supply=${unitSupply}, available=${maxUnitsAvailable}, canFit=${maxUnitsForSupply}, adding=${amountToAdd}`);
        
        if (amountToAdd > 0) {
          selectedUnits.push({
            key: unit.key,
            amount: amountToAdd,
          });
          
          currentSupplyUsed += amountToAdd * unitSupply;
          console.log(`Current supply used: ${currentSupplyUsed}/${targetSupply}`);
        }
      }

      console.log('Final selected units:', selectedUnits);
      this.selectedUnits = selectedUnits;
    },
    resetForm() {
      this.target = null;
      this.base = null;
      this.selectedUnits = [];
      this.message = null;
      this.target_type = null;
    },
    chooseBase(territory, location, custom) {
      this.target = territory;
      this.base = location;
      this.farm_name = `${this.targetNickname} ${custom}`;
    },
    removeUnits() {
      this.selectedUnits = [];
    },
    handleSave() {
      this.isLoading = true;
      const self = this;
      let payload = {};
      payload = {
        from_territory: Number(self.ownBase.territory),
        from_base: Number(self.ownBase.base),
        units: this.selectedUnits,
        type: 'save-defense',
      };
      this.missions(payload)
        .then(() => {
          Promise.delay(3000).then(() => {
            self.loadDefenders();
            self.init();
            this.isLoading = false;
          });
        })
        .catch(e => {
          console.error('Failed to start a fight=', e);
          this.isLoading = false;
        });
    },
    handleRelease() {
      this.isLoading = true;
      const self = this;

      let payload = {};
      payload = {
        from_territory: Number(self.ownBase.territory),
        from_base: Number(self.ownBase.base),
        type: 'release-defense',
      };
      this.missions(payload)
        .then(() => {
          Promise.delay(3000).then(() => {
            self.loadDefenders();
            self.init();
            this.isLoading = false;
          });
        })
        .catch(e => {
          console.error('Failed to start a fight=', e);
          this.isLoading = false;
        });
    },
    async validateForm(type) {
      this.errorMessage = null;
      if (this.selectedUnits.length === 0) this.errorMessage = 'Please select some units';
      if (this.errorMessage) {
        return false;
      }
      return !this.errorMessage;
    },
    addUnit(payload) {
      console.log('Adding unit:', payload);
      const amount = parseInt(payload.amount);
      const selectedUnitsObj = {};
      const ownUnit = this.ownUnits.find(unit => unit.key === payload.key);

      this.selectedUnits.forEach(unit => {
        selectedUnitsObj[unit.key] = unit.amount;
      });
      selectedUnitsObj[payload.key] = !selectedUnitsObj[payload.key]
        ? amount
        : amount + parseInt(selectedUnitsObj[payload.key]);
      if (selectedUnitsObj[payload.key] > ownUnit.amount) {
        selectedUnitsObj[payload.key] = parseInt(ownUnit.amount);
      }
      if (selectedUnitsObj[payload.key] < 0) {
        selectedUnitsObj[payload.key] = 0;
      }

      this.selectedUnits = Object.keys(selectedUnitsObj).map(key => ({
        key,
        amount: selectedUnitsObj[key],
      }));
    },

    serialize(obj) {
      const str = [];
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      return str.join('&');
    },
    onEnd() {
      localStorage.setItem('fav_combi_def', JSON.stringify(this.favoriteCombinations));
    },
    saveCombination() {
      let favs = [];
      if (localStorage.getItem('fav_combi_def')) {
        favs = JSON.parse(localStorage.getItem('fav_combi_def'));
      }
      const myarmy = this.selectedUnits.map(unit => ({
        key: unit.key,
        amount: unit.amount,
      }));

      const combi = {};
      combi.name = this.combination_name;
      combi.set = myarmy;
      favs.push(combi);
      this.favoriteCombinations = favs;
      this.combination_name = null;
      localStorage.setItem('fav_combi_def', JSON.stringify(favs));
    },
    loadCombination(combination) {
      const combinationtoload = [];
      combination.forEach(unit => {
        if (
          this.ownUnits.find(lunit => lunit.key === unit.key) &&
          unit.amount <= this.ownUnits.find(lunit => lunit.key === unit.key).amount
        ) {
          combinationtoload.push(unit);
        } else {
          if (this.ownUnits.find(lunit => lunit.key === unit.key))
            unit.amount = this.ownUnits.find(lunit => lunit.key === unit.key).amount;
          combinationtoload.push(unit);
        }
      });
      this.selectedUnits = combinationtoload;
    },
    deleteCombination(combination) {
      let favs = [];
      if (localStorage.getItem('fav_combi_def')) {
        favs = JSON.parse(localStorage.getItem('fav_combi_def'));
      }
      for (let i = 0; i < favs.length; i += 1) {
        if (favs[i].name === combination) {
          favs.splice(i, 1);
          i -= 1;
        }
      }
      localStorage.setItem('fav_combi_def', JSON.stringify(favs));
      this.favoriteCombinations = favs;
    },
  },
};
</script>


<style scoped lang="less">
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-info {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}

.alert-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}

.alert-danger {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}

.dropdown {
  left: 50%;
  transform: translatey(-30%) rotatex(90deg) scale(0);
  margin-top: 0.55em;
  transform-origin: 0 0;
  border-radius: 0.35em;
  display: none;
  opacity: 0;
  transition: all 200ms linear;

  &.isOpen {
    transform: translatey(0%);
    display: block;
    opacity: 1;
  }
}

.rp {
  padding: 5px;
  background: black;
  color: #ffc508;
  z-index: 999999;
  text-transform: uppercase;
}

.rp:hover {
  background: #ffc508;
  color: black;
  font-weight: bold;
}
</style>
