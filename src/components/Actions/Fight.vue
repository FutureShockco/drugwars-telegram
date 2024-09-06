<template>
  <div class="card mb-3" :id="fight.fight_key.slice(0, 10)">
    <div class="content d-flex text-center mb-0 pb-0">
      <div class="col-5">
        <div v-if="fight.attacker_nickname != user.nickname"
          :to="`/actions?type=attack&target=${fight.attacker_territory}&base=${fight.attacker_base}`">
          <!-- <Avatar class="float-left" :size="60" :username="fight.attacker_nickname" :picture="fight.attacker_picture"
            :reputation="fight.attacker_reputation" /> -->
        </div>
        <!-- <Avatar class="float-left" v-else :size="60" :username="fight.attacker_nickname"
          :picture="fight.attacker_picture" :reputation="fight.attacker_reputation" /> -->
        <h5 class="username">{{ fight.attacker_nickname }}</h5>
        <div v-if="fight.attacker_gang" class="gang-label mb-4 mt-1">{{ fight.attacker_role }} OF {{ fight.attacker_gang
          }} [{{ fight.attacker_ticker }}]</div>
        <div class="row d-inline-block">
          <div v-if="details && json && json.attacker && json.attacker.start_value">
            <ActionsValue :result="json.attacker.start_value" />
          </div>
          <div class="mb-2 ps-0 mt-2" v-if="json.attacker">
            <Army v-if="json.attacker.units" :units="json.attacker.units" :withDead="true" />
          </div>
          <div v-if="details && json && json.target && json.target.start_value">
            <ActionsValue :result="json.attacker.start_value" :lose="json.attacker.end_value" />
          </div>
          <h5 v-if="fight.attacker_reward && Number(fight.attacker_reward) > 0.001">REWARDS :</h5>
          <div v-if="fight.attacker_reward && Number(fight.attacker_reward) > 0.001">{{ fight.attacker_reward }} DW
          </div>
          <!-- <h5 v-if="fight.attacker_elo">CRUELTY CHANGE :</h5>
          <div v-if="fight.attacker_elo">{{ Number(fight.attacker_elo) / 1000 | amount }}</div> -->
          <div v-if="fight.json.amount">{{ fight.json.amount }} Unit(s)</div>
          <Army v-if="fight.json.list" :units="fight.json.list" :withDead="false" />
          <!-- <div v-if="fight.json.list">{{fight.json.list}}</div> -->
          <p class="message mb-4" v-if="fight.message !== 'tuto'">{{ fight.message }}</p>
        </div>
      </div>
      <div class="col-2">
        <div v-if="result">
          <div class="btn btn-xs gradient-green" v-if="result === 'win'">Win</div>
          <div class="btn btn-xs gradient-blue" v-if="result === 'draw'">Draw</div>
          <div class="btn btn-xs gradient-red" v-if="result === 'lost'">Lost</div>
          <ActionsLoot class="mt-2" v-if="json.target.loot" :result="result" :stolenResources="json.target.loot"
            :number="0" />
        </div>
        <h1 v-else>VS</h1>
        <h5 v-if="timeToWait && fight.is_stable">
          Start in
          <div>{{ timeToWait | ms }}</div>
        </h5>
        <h5 v-else-if="fight.is_stable"></h5>
        <h5 v-else>Preparation</h5>
        <Icon v-if="share" class="logo" name="logo" />
        <h4 v-if="share">JOIN US!</h4>
      </div>
      <div class="col-5">
        <div v-if="fight.target_nickname != user.nickname"
          :to="`/actions?type=attack&target=${fight.attacker_territory}&base=${fight.attacker_base}`">
          <!-- <Avatar class="float-right" :size="60" :username="fight.target_nickname" :picture="fight.target_picture"
            :reputation="fight.target_reputation" /> -->
        </div>
        <!-- <Avatar class="float-right" v-else :size="60" :username="user.nickname" :picture="user.picture"
          :reputation="fight.target_reputation" /> -->
        <h5 class="username">{{ fight.target_nickname }}</h5>
        <div v-if="fight.target_ticker" class="gang-label mb-4 mt-1">{{ fight.target_role }} of {{ fight.target_gang
          }}[{{
            fight.target_ticker }}]</div>
        <div class="row d-inline-block">
          <div v-if="details && json && json.target && json.target.start_value">
            <b>Defender Start:</b>
            <ActionsValue :result="json.target.start_value" />
          </div>
          <div v-if="json.target" class="pe-0">
            <Army v-if="json.target.units" :units="json.target.units" :withDead="true" />
          </div>
          <div v-if="details && json && json.target && json.target.start_value">
            <ActionsValue :result="json.target.start_value" :lose="json.target.end_value" />
          </div>
          <h5 v-if="fight.result === 3 && fight.defender_reward && Number(fight.defender_reward) > 0.001">REWARDS :</h5>
          <div v-if="fight.result === 3 && fight.defender_reward && Number(fight.defender_reward) > 0.001">
            {{ fight.defender_reward }} DW</div>
          <!-- <h5 v-if="fight.defender_elo">CRUELTY CHANGE :</h5>
          <div v-if="fight.defender_elo">{{ Number(fight.defender_elo) / 1000 | amount }}</div> -->
        </div>
      </div>
    </div>
    <div class="mt-0">
      <div v-if="details" class="text-center">
        <Troops v-if="json.target.detail && json.target.detail.units" :units="json.target.detail.units" />
        <ActionsDetail v-if="json && json.target && fight.target_nickname != user.nickname && json.target.detail"
          :detail="json.target.detail" />
        <!-- <Share v-if="!timeToWait && (Number(fight.defender_reward) > 0.001 || Number(fight.attacker_reward) > 0.001)"
          :fight="this.fight" :fight_key="this.fight.fight_key" />
        <div class="sharemessage"
          v-if="!timeToWait && (Number(fight.defender_reward) > 0.001 || Number(fight.attacker_reward) > 0.001)">Share
          your
          victory on our forum and obtain a chance to get rewarded.</div> -->
      </div>
      <div v-if="details || fight.is_done === 0" class="text-center">
        <span v-if="!fight.is_stable" class="mr-2">(Waiting for confirmation)</span>
      </div>
      <div class="text-center mb-3">
        <span v-if="fight.attacker_base">
          <router-link v-if="fight.target_nickname === user.nickname"
            :to="`/actions?type=attack&target=${fight.attacker_territory}&base=${fight.attacker_base}`">
            {{ fight.attacker_territory }}:{{ fight.attacker_base }}</router-link>
          <span v-else> {{ fight.attacker_territory }}:{{ fight.attacker_base }}</span>
          <span> > </span>
          <router-link v-if="fight.target_nickname != user.nickname"
            :to="`/actions?type=attack&target=${fight.target_territory}&base=${fight.target_base}`">
            {{ fight.target_territory }}:{{ fight.target_base }}</router-link>
          <span v-else> {{ fight.target_territory }}:{{ fight.target_base }}</span>
        </span>
        <span v-if="fight.transporter_base">
          <router-link v-if="fight.target_nickname === user.nickname"
            :to="`/actions?type=attack&target=${fight.transporter_territory}&base=${fight.transporter_base}`">
            {{ fight.transporter_territory }}:{{ fight.attacker_base }}</router-link>
          <span v-else> {{ fight.transporter_territory }}:{{ fight.transporter_base }}</span>
          <span>TO :</span>
          <router-link v-if="fight.target_nickname != user.nickname"
            :to="`/actions?type=attack&target=${fight.target_territory}&base=${fight.target_base}`">
            {{ fight.target_territory }}:{{ fight.target_base }}</router-link>
          <span v-else> {{ fight.target_territory }}:{{ fight.target_base }}</span>
        </span>
        <div>Start : {{ start }} - End : {{ end }}</div>
        <!-- <div v-if="fight.fight_key">
          <a target="_blank">Tx : {{ fight.fight_key }}</a>
          <span v-if="fight.steem_block"> Steem block : {{ fight.steem_block }}</span>
        </div>
        <div v-else-if="fight.transport_key">
          Tx: {{ fight.transport_key }}
          <span v-if="fight.steem_block"> Steem block : {{ fight.steem_block }}</span>
        </div> -->
      </div>
      <div v-if="fight.is_done != 0">
        <UiCenter class="vue-ui-modal pt-2 pb-7" v-if="popupOn">
          <div class="wrapper">
            <div>Choose a custom name to remember this opponent or his place.</div>
            <input type="string" v-model="farm_name" placeholder="Snollygoster" class="mt-2 input" />
            <UiButton class="button button-red" @click="listPopup()">Cancel</UiButton>
            <UiButton class="button btn-xxs gradient-green ml-1" @click="saveFarm()">Save</UiButton>
          </div>
        </UiCenter>
        <div class="text-center mb-3">
          <UiButton class="btn btn-xxs gradient-yellow me-2" @click="gotoSimulator()">Go to simulator</UiButton>
          <UiButton v-if="!details" class="btn btn-xxs gradient-blue" @click="showDetails()">Show details</UiButton>
          <!-- <UiButton v-if="!alreadylisted" class="button button-red ml-1" @click="listPopup()">Add to list</UiButton> -->
          <UiButton v-else class="btn btn-xxs gradient-blue" @click="hideDetails()">Hide details</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsonParse } from '@/helpers/utils';
import drugwars from 'drugwars';

export default {
  props: ['fight'],
  data() {
    return {
      share: false,
      details: false,
      token: localStorage.getItem('access_token'),
      farm_name: 'Snollygoster',
      popupOn: false,
    };
  },
  computed: {
    timeToWait() {
      const timeToWait = new Date(this.fight.end_date).getTime() - this.$store.state.ui.timestamp;
      return timeToWait > 0 ? timeToWait : 0;
    },
    timeToBattle() {
      const timeToWait =
        new Date(this.fight.end_date).getTime() - 45000 - this.$store.state.ui.timestamp;
      return timeToWait > 0 ? timeToWait : 0;
    },
    start() {
      const start = new Date(this.fight.timestamp_start * 1000).toLocaleString();
      return start;
    },
    end() {
      const end = new Date(this.fight.end_date).toLocaleString();
      return end;
    },
    alreadylisted() {
      let favs = [];
      if (localStorage.getItem('farmlist')) {
        favs = JSON.parse(localStorage.getItem('farmlist'));
      }
      if (
        favs.find(
          f =>
            f.set.territory === this.fight.target_territory &&
            f.set.location === this.fight.target_base,
        )
      )
        return true;
      return false;
    },
    result() {
      let result;
      let isAuthor;
      if (this.fight.attacker_nickname !== this.user.nickname && !this.fight.target) {
        isAuthor = false;
      } else if (this.fight.target_nickname !== this.user.nickname) isAuthor = true;
      if (this.fight.result === 1) {
        result = isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 3) {
        result = !isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 2) {
        result = 'draw';
      }
      return result;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    username() {
      return this.$store.state.auth.username;
    },
    json() {
      return jsonParse(this.fight.json) || {};
    },
  },
  methods: {
    gotoSimulator() {
      let toOpen = 'player,';
      let myarmy = this.$store.state.game.user.units
      myarmy = myarmy.map(unit =>
        this.serialize({
          p: 1,
          key: unit.unit,
          n: unit.amount,
        }),
      );
      toOpen += myarmy;
      const mytraining = this.$store.state.game.user.trainings.map(training =>
        this.serialize({
          p: 1,
          key: training.training,
          lvl: training.lvl,
        }),
      );
      if (mytraining && mytraining.length > 0) toOpen += `,${mytraining}`;
      console.log(this.json.target.detail)
      if (this.json.target.detail.units.length > 0) {
        const enemyarmy = this.json.target.detail.units.map(unit =>
          this.serialize({
            p: 2,
            key: unit.unit,
            n: unit.amount,
          }),
        );
        if (enemyarmy && enemyarmy.length > 0) toOpen += `,${enemyarmy}`;
      }

      if (this.json.target.detail.trainings.length > 0) {
        const enemytraining = this.json.target.detail.trainings.map(training =>
          this.serialize({
            p: 2,
            key: training.training,
            lvl: training.lvl,
          }),
        );
        if (enemytraining && enemytraining.length > 0) toOpen += `,${enemytraining}`;
      }
      const enemybuildings = [];
      this.json.target.detail.buildings.forEach(element => {
        if (
          element &&
          drugwars.buildings[element.building] &&
          drugwars.buildings[element.building].type === 'defense'
        )
          enemybuildings.push(element);
      });
      
      if (enemybuildings.length > 0) {
        const allenemybuildings = enemybuildings.map(building =>
          this.serialize({
            p: 'def',
            key: building.building,
            lvl: building.lvl,
          }),
        );
        if (allenemybuildings && allenemybuildings.length > 0) toOpen += `,${allenemybuildings}`;
      }
      this.$router.push({ path: `/units/simulator/${toOpen}` });
    },
    serialize(obj) {
      const str = [];
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      return str.join('&');
    },
    showDetails() {
      this.details = true;
    },
    hideDetails() {
      this.details = false;
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
      farm.name = this.farm_name;
      farm.set = { territory: this.fight.target_territory, location: this.fight.target_base };
      favs.push(farm);
      localStorage.setItem('farmlist', JSON.stringify(favs));
      this.popupOn = !this.popupOn;
    },
    openBattle(id) {
      let drugwars_battleclient;
      window.addEventListener('message', messageListener, false);
      const token = this.token;
      function messageListener(event) {
        if (event.data == 'ready') {
          drugwars_battleclient.postMessage({ token, id }, '*');
        }
      }
      const dwbc = 'https://battle.drugwars.io/debug.html';
      drugwars_battleclient = window.open(dwbc);
    },
  },
};
</script>

<style scoped type="less">
@import '../../vars.less';

p {
  overflow: hidden;
  max-width: 50%;
}

.logo {
  margin-top: 10px;
  width: 100%;
}

.result {
  font-size: 24px;
  padding: 3px;
  height: 40px;
  background-size: cover !important;
}

.gang {
  font-size: 18px;
}

.sharemessage {
  font-size: 12px;
}

div .minip {
  width: 28px !important;
  height: 28px !important;
}

img {
  width: 28px;
  height: 28px;
}

.message {
  max-width: 260px;
  margin: 0 auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

.vue-ui-modal {
  background: rgba(0, 0, 0, 0.7);
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}
</style>
