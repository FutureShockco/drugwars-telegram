<template>
  <div v-if="ownBase">
    <ActionsTabs />
    <UiCenter class="vue-ui-modal pt-2 pb-7" v-if="farmOn">
      <div class="wrapper">
        <div class="columns" v-if="farmlist">
          <div class="column farm col-6" v-for="player in farmlist" :key="player.key">
            <div class="border-bottom border-top border-left text-right">
              <h5 class="mb-0">
                {{ player.name }}
                <span class="text-yellow mx-1">{{ player.set.territory }} : {{ player.set.location }}</span>
                <UiButton class="button button-red" @click="deleteFarm(player.name)">
                  <div class="iconfont icon-trashcan text-white"></div>
                </UiButton>
                <UiButton class="button button-green ml-3" @click="loadFarm(player.set)">
                  <div class="iconfont icon-check text-white"></div>
                </UiButton>
              </h5>
            </div>
          </div>
        </div>
        <h3 v-else>You should first add a place to your list by visiting it.</h3>
        <UiButton class="button button-red mt-5" @click="openFarmList()">Cancel</UiButton>
      </div>
    </UiCenter>
    <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
      <div class="content">
        <div v-if="ownUnits.length > 0">
          <!-- <h3 class="mb-0 mt-0">Select your action type</h3>
        <div v-if="action_type === 'attack' || target_type === 'npc'">Attack another player</div> -->
          <!-- <div v-if="action_type === 'transport'">Transport resources to another base</div>
        <div v-if="action_type === 'station'">Station units in your other bases</div>
        <div v-if="action_type === 'occupy'">Take a new base (need 1 occupation troop)</div> -->
          <div class="mt-1">
            <!-- <UiButton
            class="button"
            @click="chooseActionType('attack')"
            :class="{ 'button-red' : action_type ==='attack' || target_type === 'npc' }"
          >ATTACK</UiButton> -->
            <!-- <UiButton
            class="button ml-1"
            @click="chooseActionType('transport')"
            :class="{ 'button-blue' : action_type ==='transport' }"
          >TRANSPORT</UiButton>
          <UiButton
            class="button ml-1"
            @click="chooseActionType('occupy')"
            :class="{ 'button-green' : action_type ==='occupy' }"
          >OCCUPY</UiButton>
          <UiButton
            class="button ml-1"
            @click="chooseActionType('station')"
            :class="{ 'button-orange' : action_type ==='station' }"
          >STATION</UiButton> -->
          </div>
          <div v-if="tutorialStep > 6">
            <h3>Select your army composition</h3>
            <div class="row d-flex" v-if="ownUnits.length > 0">
              <UnitSelect v-for="ownUnit in ownUnits" :key="ownUnit.key + ownBase.territory + ownBase.base"
                class="col-3" v-if="ownUnit.amount > 0" :item="ownUnit" @select="addUnit" />
            </div>
            <div v-else>You must buy troops</div>
          </div>
          <!--  <div v-if="action_type !== 'occupy'" class="row d-flex mt-3">
            <input class="input form-control col" :disabled="selectedUnits.length === 0" placeholder="New Squad name"
              v-model="combination_name" maxlength="24" />
            <UiButton class="button button-green col" :disabled="selectedUnits.length === 0 || !combination_name"
              @click="saveCombination()">Save squad</UiButton>
            <draggable @start="drag = true" v-model="favoriteCombinations" @end="onEnd">
              <div class="mt-2" v-for="combination in favoriteCombinations" :key="combination.key">
                <UiButton class="button button-red" @click="deleteCombination(combination.name)">delete squad</UiButton>
                <UiButton class="button button-blue ml-2" @click="loadCombination(combination.set)">load
                  {{ combination.name }}</UiButton>
              </div>
            </draggable>
            <h3>Defensive Power : {{defensivePower}}%</h3>
          <a @click="openInNewTab()" target="_blank">Access to the Fight simulator</a>
          </div>-->
        </div>
        <div v-if="ownUnits.length > 0" class="column col-12 col-sm-6">
          <div class="mb-2">
            <h3 class="mb-2">Your selected army</h3>
            <ArmyToSend :units="selectedUnits" />
          </div>
          <div class="mb-0 form width-full">
            <div v-if="selectedUnits.length === 0">
              <p>You need to select at least 1 unit.</p>
            </div>
            <div v-else-if="tutorialStep > 7">
              <h5>Power : {{ offensivePower }}% - Timer : {{ timer | ms }} - Cost : {{ cost | amount }}</h5>
              <UiButton class="btn btn-xxs gradient-red mb-2" @click="removeUnits()">Remove all</UiButton>
              <div v-if="action_type === 'transport'">
                <div class="columns mt-4">
                  <div class="column col-4">
                    <ProgressBar :icon="'drug'" :color="'#00b31e'" :width="70" font-size="20"
                      :pv="progressPercent(drugs_amount, selectedTotal)" :total="drugs_amount"
                      :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3"
                      :border-color="'#ffc508'" :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                    <input type="number" v-model="drugs_amount" placeholder="amount" class="mt-5 input width-full" />
                  </div>
                  <div class="column col-4">
                    <ProgressBar :icon="'weapon'" :color="'#00b31e'" :width="70" font-size="20"
                      :pv="progressPercent(weapons_amount, selectedTotal)" :total="weapons_amount"
                      :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3"
                      :border-color="'#ffc508'" :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                    <input type="number" v-model="weapons_amount" placeholder="amount" class="mt-5 input width-full" />
                  </div>
                  <div class="column col-4">
                    <ProgressBar :icon="'alcohol'" :color="'#00b31e'" :width="70" font-size="20"
                      :pv="progressPercent(alcohol_amount, selectedTotal)" :total="alcohol_amount"
                      :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3"
                      :border-color="'#ffc508'" :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                    <input type="number" v-model="alcohol_amount" placeholder="amount" class="mt-5 input width-full" />
                  </div>
                </div>
                <h5 :class="{ 'text-red': progressPercent(selectedTotal, carry) > 100 }">Total
                  {{ progressPercent(selectedTotal, carry) }}%</h5>
              </div>
            </div>
          </div>
          <div v-if="action_type !== 'occupy' && target_type !== 'npc'">
            <h3>Type a nickname</h3>
            <div class="d-flex">
              <input :readonly="targetNickname === 'TommasoBuscetta'" class="input form-control mb-1" type="string"
                placeholder="Nickname" v-model="targetNickname" />
              <UiButton class="button button-green" @click="getUserBase()">
                <div class="fad fa-search"></div>
              </UiButton>
              <!-- <UiButton class="button button-blue" @click="openFarmList()">
                <div class="iconfont icon-book"></div>
              </UiButton> -->
              <!-- <h5 v-if="bases" class="mt-1">
                <span v-if="enemyRankName" class="mr-1">{{ enemyRankName }}</span>
                <span v-if="bases[0] && bases[0].role" class="mr-1">{{ bases[0].role }} OF</span>
                <span v-if="bases[0] && bases[0].name" class="mr-1">{{ bases[0].name }}</span>
                <span v-if="bases[0] && bases[0].ticker">[{{ bases[0].ticker }}]</span>
              </h5> -->
              <!-- <div v-for="base in bases" :key="base.id">
                <UiButton class="button button-yellow" @click="chooseBase(base.territory, base.base, base.custom)">{{
                  base.territory }}:{{ base.base }} -
                  {{ base.custom }} - HQ:{{ base.lvl }}</UiButton>
              </div> -->
            </div>
          </div>
          <h5 class="text-yellow ddrop mt-0 mb-0" v-if="action_type === 'transport' || action_type === 'station'"
            @click="isOpen = !isOpen, active = !active" :class="{ active }">
            CHOOSE FROM YOUR BASES
            <svg viewBox="0 0 451.847 451.847" width="12">
              <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                fill="#fff" />
            </svg>
          </h5>
          <div :class="{ isOpen }" class="dropdown" v-if="action_type === 'transport' || action_type === 'station'">
            <UiButton class="btn btn-yellow btn-sm rp mr-2" v-for="base in allbase"
              @click="setRallyPointCoordinates(base.territory, base.base)"
              v-if="base.building === 'headquarters' && (ownBase.territory + '' + ownBase.base !== base.territory + '' + base.base)"
              :key="(base.territory + '' + base.base)">
              {{ base.custom }}</UiButton>
          </div>
          <h3 class="mt-1">Or your target coordinates</h3>
          <div class="d-flex">
            <div class="col">
              <input :readonly="targetNickname === 'TommasoBuscetta'" class="input form-control mb-4" type="number"
                placeholder="Territory" v-model="target" />
            </div>
            <div class="col">
              <input :readonly="targetNickname === 'TommasoBuscetta'" class="input form-control mb-4" type="number"
                placeholder="Base" v-model="base" />
            </div>
          </div>
          <div :class="tutorialStep === 7 ? 'd-none' : ''"
            v-if="target_type !== 'npc' && (action_type === 'attack' || action_type === 'transport')">
            <h3>Add a fight message*</h3>
            <div>* optional</div>
            <input class="input form-control btn-block mb-4" placeholder="I'm coming for you" v-model="message"
              maxlength="280" />
          </div>
          <div v-if="action_type === 'occupy'">
            <h3>Choose Base Name (max 10 bases)</h3>
            <input class="input form-control btn-block mb-2" placeholder="Eg : Saint Street" v-model="baseName"
              maxlength="280" />
          </div>
          <div :class="tutoDetail === 1 && tutorialStep === 7 ? 'tutobox' : ''">
            <UiButton v-if="action_type === 'attack'" :disabled="selectedUnits.length === 0 || !target || isLoading"
              class="btn w-100 gradient-red font-700 text-uppercase" @click="handleSubmit">
              <SmallLoading v-if="isLoading" />
              <span v-else>{{ action_type }}</span>
            </UiButton>
          </div>

          <UiButton v-if="action_type === 'transport'" :disabled="selectedUnits.length === 0 || !target || isLoading"
            class="button button-large button-blue mb-2 d-block" @click="handleSubmit">
            <SmallLoading v-if="isLoading" />
            <span v-else>{{ action_type }}</span>
          </UiButton>
          <UiButton v-if="action_type === 'occupy'" :disabled="selectedUnits.length === 0 || !target || isLoading"
            class="button button-large button-green mb-2 d-block" @click="handleSubmit">
            <SmallLoading v-if="isLoading" />
            <span v-else>{{ action_type }}</span>
          </UiButton>
          <UiButton v-if="action_type === 'station'" :disabled="selectedUnits.length === 0 || !target || isLoading"
            class="button button-large button-orange mb-2 d-block" @click="handleSubmit">

            <SmallLoading v-if="isLoading" />
            <span v-else>{{ action_type }}</span>
          </UiButton>
          <!-- <UiButton class="button button-red d-inline-block" v-if="target_type !== 'npc'"
            :disabled="selectedUnits.length === 0 || !target || isLoading" @click="listPopup()">Add to list</UiButton>

          <h5 class="ml-2 d-inline-block" v-if="action_type === 'attack' && target_type !== 'npc'">Visible for gang</h5>
          <UiButton class="ml-2 button button-red"
            v-if="action_type === 'attack' && privateAttack && target_type !== 'npc'"
            :disabled="selectedUnits.length === 0 || !target || isLoading" @click="makePrivate()">
            No
          </UiButton>
          <UiButton class="ml-2 button button-green"
            v-if="action_type === 'attack' && !privateAttack && target_type !== 'npc'"
            :disabled="selectedUnits.length === 0 || !target || isLoading" @click="makePrivate()">
            Yes
          </UiButton> -->
          <div class="text-red text-left" v-if="errorMessage">{{ errorMessage }}</div>
        </div>
        <h4 class="text-center" v-else>
          You don't have any unit.
          <h2>
            <router-link :to="`/units`" class="text-yellow">Click here to start to recruit</router-link>
          </h2>
        </h4>
      </div>
    </div>
    <UiCenter class="vue-ui-modal pt-2 pb-7" v-if="popupOn">
      <div class="wrapper">
        <div>Choose a custom name to remember this opponent or his place.</div>
        <input type="string" v-model="farm_name" placeholder="Snollygoster" class="mt-2 input" />
        <UiButton class="button button-red" @click="listPopup()">Cancel</UiButton>
        <UiButton class="button button-green ml-1" @click="saveFarm()">Save</UiButton>
      </div>
    </UiCenter>
  </div>
  <div v-else class="card card-style anim-fade-in">
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
      action_type: this.$route.query.type || 'attack',
      target: this.$route.query.target || null,
      target_type: this.$route.query.target_type || null,
      base: this.$route.query.base || null,
      selectedUnits: [],
      message: this.$route.query.message || null,
      targetNickname: this.$route.query.nickname || null,
      username: this.$store.state.auth.username,
      errorMessage: null,
      baseName: null,
      farmOn: false,
      favoriteCombinations: JSON.parse(localStorage.getItem('fav_combi')) || null,
      farmlist: JSON.parse(localStorage.getItem('farmlist')) || null,
      combination_name: null,
      units: [],
      bases: [],
      drugs_amount: 0,
      weapons_amount: 0,
      alcohol_amount: 0,
      popupOn: false,
      isOpen: false,
      active: false,
      privateAttack: true,
      enemyProd: 0,
      rnd: Math.floor(Math.random() * Math.floor(4999)) + 1,
    };
  },
  components: {
    draggable,
  },
  created() {
    if (this.targetNickname) {
      this.getUserBase();
    }
  },
  computed: {
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    tutoDetail() {
      return this.$store.state.game.tutoDetail
    },
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    sent_fights() {
      return this.$store.state.game.sent_fights;
    },
    allbase() {
      return this.$store.state.game.user.buildings || null;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    ownUnits() {
      const units = [];
      this.$store.state.game.user.units.forEach(element => {
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
    alreadylisted() {
      let favs = [];
      if (localStorage.getItem('farmlist')) {
        favs = JSON.parse(localStorage.getItem('farmlist'));
      }
      if (favs.find(f => f.set.territory === this.target && f.set.location === this.base))
        return true;
      return false;
    },
    selectedTotal() {
      let selected = 0;
      const drugs = parseInt(this.drugs_amount) || 0;
      const weapons = parseInt(this.weapons_amount) || 0;
      const alcohol = parseInt(this.alcohol_amount) || 0;
      selected = drugs + weapons + alcohol;
      return selected;
    },
    carry() {
      let carry = 0;
      this.selectedUnits.forEach(unit => {
        carry += units[unit.key].capacity * unit.amount;
      });
      return carry;
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
    hasNotEnough() {
      return (
        parseInt(this.drugs_amount) > this.user.drugs_balance ||
        parseInt(this.weapons_amount) > this.user.weapons_balance ||
        parseInt(this.alcohol_amount) > this.user.alcohols_balance
      );
    },
    timer() {
      const self = this;
      let timer = 0;
      let distance = 0;
      let reduce = 0;
      this.selectedUnits.forEach(unit => {
        if (units[unit.key].speed && units[unit.key].speed * 60 > timer) {
          timer = units[unit.key].speed * 60;
        }
      });
      if (this.selectedUnits && self.target)
        distance =
          Number(self.ownBase.territory) > Number(self.target)
            ? Number(self.ownBase.territory) - Number(self.target)
            : Number(self.target) - Number(self.ownBase.territory);
      const training = this.$store.state.game.user.trainings.find(b => b.training === 'routing');
      if (training) {
        reduce = training.lvl;
      }
      if (
        this.selectedUnits &&
        this.selectedUnits.length === 1 &&
        this.selectedUnits[0].key === 'spy' &&
        self.target
      ) {
        timer += distance;
      } else {
        timer += distance * 2;
      }
      return (timer = (timer - (timer / 220) * reduce) * 1000);
    },
    cost() {
      const self = this;
      let cost = 0;
      let distance = 0;
      distance =
        Number(self.ownBase.territory) > Number(self.target)
          ? Number(self.ownBase.territory) - Number(self.target)
          : Number(self.target) - Number(self.ownBase.territory);
      this.selectedUnits.forEach(unit => {
        if (units[unit.key].move_cost) {
          cost += units[unit.key].move_cost * unit.amount;
        }
      });
      if (self.action_type === 'attack') return (cost * distance) / 100;
      return (cost * distance) / 200;
    },
    enemyRankName() {
      let rank = 10;
      const names = [
        'weak',
        'recruit',
        'grifter',
        'outlaw',
        'enforcer',
        'smuggler',
        'lieutenant',
        'boss',
        'legend',
        'divine',
        'immortal',
      ];
      const totalprod = this.$store.state.game.prizeProps.max_prod[0].max_prod;
      const userprod = this.enemyProd;
      rank = Math.floor((userprod / totalprod) * 10);
      return names[rank];
    },
    enemyMaxSupply() {
      const totalprod = this.$store.state.game.prizeProps.max_prod[0].max_prod;
      const userprod = this.enemyProd;
      let rank = Math.floor((userprod / totalprod) * 10);
      if (rank === 0) rank = 1;
      const max_supply = rank * 10000;
      return max_supply;
    },
    maxSupply() {
      const totalprod = this.$store.state.game.prizeProps.max_prod[0].max_prod;
      const userprod = this.$store.state.game.user.total_production;
      let rank = Math.floor((userprod / totalprod) * 10);
      if (rank === 0) rank = 1;
      const max_supply = rank * 10000;
      return max_supply;
    },
  },
  methods: {
    ...mapActions(['missions', 'init', 'get_bases', 'setBase', 'setTutoDetail']),
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
    chooseActionType(value) {
      this.action_type = value;
      if (this.action_type === 'occupy') {
        this.selectedUnits = [];
      }
      if (this.target_type === 'npc') {
        this.resetForm();
      }
    },
    getUserBase() {
      const self = this;
      self.bases = null;

      client.requestAsync('get_user_bases', self.targetNickname).then(result => {
        self.bases = result[0];
        console.log(self.bases[0])
        self.chooseBase(self.bases[0].territory, self.bases[0].base, self.bases[0].custom)
        self.enemyProd = result[1][0].prod_rate;
        self.isLoading = false;
      });

    },
    openFarmList() {
      const self = this;
      self.farmOn = !self.farmOn;
    },
    listPopup(name) {
      this.popupOn = !this.popupOn;
    },
    saveFarm() {
      let favs = [];
      if (localStorage.getItem('farmlist')) {
        favs = JSON.parse(localStorage.getItem('farmlist'));
      }
      const farm = {};
      if (this.targetNickname) {
        farm.name = `${this.targetNickname} ${this.bases.find(b => b.territory === this.target && b.base === this.base).custom
          }`;
        this.farm_name = farm.name;
      } else {
        farm.name = 'Snollygoster';
      }
      farm.set = { territory: this.target, location: this.base };
      favs.push(farm);
      localStorage.setItem('farmlist', JSON.stringify(favs));
      this.popupOn = !this.popupOn;
    },
    progressPercent(total, cost) {
      let progress;
      if (total && cost) {
        this.up = false;
        progress = parseFloat((total * 100) / cost).toFixed(2);
        return progress;
      }
      this.up = false;
      return 0;
    },
    removeUnits() {
      this.selectedUnits = [];
    },
    async handleSubmit() {
      this.setTutoDetail(2)
      this.isLoading = true;
      const self = this;
      let payload = {};
      switch (self.action_type) {
        case 'attack':
          if (self.target_type === 'npc')
            payload = {
              from_territory: Number(self.ownBase.territory),
              from_base: Number(self.ownBase.base),
              territory: Number(self.target),
              base: Number(self.base),
              units: self.selectedUnits,
              type: 'fight-npc',
            };
          else
            payload = {
              from_territory: Number(self.ownBase.territory),
              from_base: Number(self.ownBase.base),
              territory: Number(self.target),
              base: Number(self.base),
              units: self.selectedUnits,
              type: 'fight',
              message: self.message || '',
              private: self.privateAttack,
            };
          break;
        case 'transport':
          const drugs = parseInt(this.drugs_amount) || 0;
          const weapons = parseInt(this.weapons_amount) || 0;
          const alcohol = parseInt(this.alcohol_amount) || 0;
          if (drugs >= 0 && weapons >= 0 && alcohol >= 0) {
            payload = {
              from_territory: Number(self.ownBase.territory),
              from_base: Number(self.ownBase.base),
              territory: Number(self.target),
              base: Number(self.base),
              units: self.selectedUnits,
              type: 'transport',
              resources: { drugs, weapons, alcohol },
              message: self.message || '',
            };
          }
          break;
        case 'station':
          payload = {
            from_territory: Number(self.ownBase.territory),
            from_base: Number(self.ownBase.base),
            territory: Number(self.target),
            base: Number(self.base),
            units: self.selectedUnits,
            type: 'station',
            message: self.message || '',
          };
          break;
        case 'occupy':
          payload = {
            from_territory: Number(self.ownBase.territory),
            from_base: Number(self.ownBase.base),
            territory: Number(self.target),
            base: Number(self.base),
            name: self.baseName,
            units: self.selectedUnits,
            type: 'dw-base',
          };
          break;
        default:
          break;
      }

      const isValid = await this.validateForm(self.action_type);

      if (isValid) {
        this.resetForm();
        this.missions(payload)
          .then(() => {
            if (self.action_type === 'occupy')
              Promise.delay(5000).then(() => {
                self.init();
              });
            else
              Promise.delay(3000).then(() => {
                self.init();
              });
            this.isLoading = false;
          })
          .catch(e => {
            console.error('Failed to start a fight=', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    async validateForm(type) {
      this.errorMessage = null;
      let target;
      if (this.targetNickname) target = this.targetNickname.toLowerCase();

      if (type === 'attack' && target === this.nickname) {
        this.errorMessage = 'Attack yourself? Are you serious?';
      }
      // if (this.cost > this.ownBase.drug_balance) {
      //   this.errorMessage = 'You dont have enough drugs for this!';
      // }
      const now = new Date();
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in DrugWars, try again after ${isPunished.toLocaleString()}`;
      }

      if (!this.baseName && this.action_type === 'occupy') {
        this.errorMessage = `Please choose a name for your base`;
      } else if (this.action_type === 'occupy' && this.baseName.length > 25) {
        this.errorMessage = `Please choose a shorter name for your base`;
      } else if (this.action_type === 'occupy' && this.baseName.length < 4) {
        this.errorMessage = `Please choose a longer name for your base`;
      }
      if (!this.errorMessage && target)
        try {
          const user = await client.requestAsync('check_user', target);
          if (!user || !user[0].nickname) {
            this.errorMessage = `Player '${target}' does not exist`;
          }
          return !this.errorMessage;
        } catch (e) {
          this.errorMessage = `Player with nickname '${target}' doesn't exist`;
          console.error(`Player with nickname '${target}' doesn't exist`, e);
          return false;
        }
      if (this.errorMessage) {
        return false;
      }
      return !this.errorMessage;
    },
    addUnit(payload) {
      this.setTutoDetail(1)
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
    makePrivate() {
      this.privateAttack = !this.privateAttack;
    },
    setRallyPointCoordinates(territory, base) {
      console.log(territory);
      this.target = territory;
      this.base = base;
      this.isOpen = !this.isOpen;
    },
    openInNewTab() {
      const url = 'https://simulator.drugwars.io/';
      const myarmy = this.ownUnits.map(unit =>
        this.serialize({
          p: 1,
          key: unit.key,
          n: unit.amount,
        }),
      );
      const mytraining = this.$store.state.game.user.trainings.map(training =>
        this.serialize({
          p: 1,
          key: training.training,
          lvl: training.lvl,
        }),
      );

      let toOpen = `player,${myarmy}`;
      if (mytraining && mytraining.length > 0) toOpen += `,${mytraining}`;
      const win = window.open(`${url}?${toOpen}`, '_blank');
      win.focus();
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
      localStorage.setItem('fav_combi', JSON.stringify(this.favoriteCombinations));
    },
    saveCombination() {
      let favs = [];
      if (localStorage.getItem('fav_combi')) {
        favs = JSON.parse(localStorage.getItem('fav_combi'));
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
      localStorage.setItem('fav_combi', JSON.stringify(favs));
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
      if (localStorage.getItem('fav_combi')) {
        favs = JSON.parse(localStorage.getItem('fav_combi'));
      }
      for (let i = 0; i < favs.length; i += 1) {
        if (favs[i].name === combination) {
          favs.splice(i, 1);
          i -= 1;
        }
      }
      localStorage.setItem('fav_combi', JSON.stringify(favs));
      this.favoriteCombinations = favs;
    },
    loadFarm(farm) {
      this.target = farm.territory;
      this.base = farm.location;
      this.farmOn = !this.farmOn;
    },
    deleteFarm(combination) {
      let favs = [];
      if (localStorage.getItem('farmlist')) {
        favs = JSON.parse(localStorage.getItem('farmlist'));
      }
      for (let i = 0; i < favs.length; i += 1) {
        if (favs[i].name === combination) {
          favs.splice(i, 1);
          i -= 1;
        }
      }
      localStorage.setItem('farmlist', JSON.stringify(favs));
      this.farmlist = favs;
    },
  },
};
</script>


<style scoped lang="less">
.width-full {
  max-width: 100%;
}

.vue-ui-modal {
  background: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
}

.farm {
  background: rgba(0, 0, 0, 0.9);
}

@media screen and (min-width: 399px) and (max-width: 1119px) {
  .column.b {
    width: 100% !important;
  }
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
