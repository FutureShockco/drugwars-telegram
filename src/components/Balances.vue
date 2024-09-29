<template>
  <div>
    <ul class="d-flex balances list-style-none p-0 m-0 ">
      <li v-if="booster" class="col-3 card d-flex pt-2 text-yellow ">
        <Icon name="drug" size="14" />
        <div class="balance">
          <div :class="{ 'text-red': balances.drugs >= HQ.drug_storage }">
            {{ balances.drugs | amount }}
          </div>
          <div class="detail">
            {{ (HQ.drug_production_rate * 60 * 60 * 24) * 2 | amount }}+<span class="text-orange" v-if="drugBonus">
              {{ drugBonus * 2 | amount }}</span>/DAY
          </div>
          <!-- <div class="detail">
          <span class="text-green">{{ HQ.drug_storage / 100 * 20 | amount }}</span>/SAFE
        </div> -->
        </div>
      </li>
      <li class="col-3 card d-flex pt-2 align-self-stretch" v-else>
        <div class="d-flex justify-content-start align-items-start">
          <Icon name="drug" size="14" class="me-2 mb-1 align-self-start" />
          <div>
            <h6 class="align-self-start">DRUGS</h6>
            <div class="detail">
              <span class="text-yellow"> +{{ HQ.drug_production_rate * 60 * 60 * 24 | amount }}</span>/DAY
            </div>
          </div>
        </div>
        <div class="balance py-2" >
          <!-- {{ balances.drugs | amount }} -->
          <animated-number :class="{ 'text-red': balances.drugs >= HQ.drug_storage }" style="line-height: unset;" :value="balances.drugs" :formatValue="formatToPrice"
            :duration="500" />
        </div>

        <!-- <div class="detail">
          <span class="text-green">{{ HQ.drug_storage / 100 * 20 | amount }}</span>/SAFE
        </div> -->
      </li>
      <li v-if="booster" class="text-yellow col-3 card d-flex pt-2">
        <Icon name="weapon" size="14" />
        <div class="balance">
          <div :class="{ 'text-red': balances.weapons >= HQ.weapon_storage }">
            {{ balances.weapons | amount }}
          </div>
          <!-- <div class="detail ">
          {{ (HQ.weapon_production_rate * 60 * 60 * 24) * 2 | amount }}+<span class="text-orange" v-if="weaponBonus">{{
            weaponBonus * 2 | amount }}</span>/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ HQ.weapon_storage / 100 * 20 | amount }}</span>/SAFE
        </div> -->
        </div>
      </li>
      <li class="col-3 card d-flex pt-2 align-self-stretch" v-else>
        <div class="d-flex justify-content-start align-items-start">
          <Icon name="weapon" size="14" class="me-2 mb-1 align-self-start" />
          <div>
            <h6 class="align-self-start">WEAPONS</h6>
            <div class="detail">
              <span class="text-yellow"> +{{ HQ.weapon_production_rate * 60 * 60 * 24 | amount }}</span>/DAY
            </div>
          </div>
        </div>
        <div class="balance py-2" >
          <!-- {{ balances.weapons | amount }} -->
          <animated-number :class="{ 'text-red': balances.weapons >= HQ.weapon_storage }" style="line-height: unset;" :value="balances.weapons" :formatValue="formatToPrice"
            :duration="500" />
        </div>
        <!-- <div class="detail ">
          {{ HQ.weapon_production_rate * 60 * 60 * 24 | amount }}+<span class="text-orange" v-if="weaponBonus">{{
            weaponBonus | amount }}</span>/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ HQ.weapon_storage / 100 * 20 | amount }}</span>/SAFE
        </div> -->

      </li>
      <li v-if="booster" class="text-yellow col-3 card d-flex pt-2">
        <Icon name="alcohol" size="14" />
        <div class="balance">
          <div :class="{ 'text-red': balances.alcohols >= HQ.alcohol_storage }">
            {{ balances.alcohols | amount }}
          </div>
          <!-- <div class="detail">
          {{ (HQ.alcohol_production_rate * 60 * 60 * 24) * 2 | amount }}+<span class="text-orange"
            v-if="alcoholBonus">{{ alcoholBonus * 2 | amount }}</span>/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ HQ.alcohol_storage / 100 * 20 | amount }}</span>/SAFE
        </div> -->
        </div>
      </li>
      <li class="col-3 card d-flex pt-2 align-self-stretch" v-else>
        <div class="d-flex justify-content-start align-items-start">
          <Icon name="alcohol" size="14" class="me-2 mb-1 align-self-start" />
          <div>
            <h6 class="align-self-start">ALCOHOL</h6>
            <div class="detail">
              <span class="text-yellow"> +{{ HQ.alcohol_production_rate * 60 * 60 * 24 | amount }}</span>/DAY
            </div>
          </div>
        </div>
        <div class="balance py-2" >
          <!-- {{ balances.alcohols | amount }} -->
          <animated-number :class="{ 'text-red': balances.alcohols >= HQ.alcohol_storage }" style="line-height: unset;" :value="balances.alcohols" :formatValue="formatToPrice"
          :duration="500" />
        </div>
        <!-- <div class="detail">
          {{ HQ.alcohol_production_rate * 60 * 60 * 24 | amount }}+<span class="text-orange" v-if="alcoholBonus">{{
            alcoholBonus | amount }}</span>/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ HQ.alcohol_storage / 100 * 20 | amount }}</span>/SAFE
        </div> -->

      </li>
      <li @click="toggleModalAccount()" class="col-3 card d-flex pt-2 align-self-stretch">
        <div class="d-flex justify-content-start align-items-start ">
          <Icon class="me-2 mb-1 align-self-start" name="dwd" size="14" />
          <div>
            <h6 class="align-self-start">DWTOKEN</h6>
            <div class="detail">
              <span class="text-yellow"> +{{ totalRewards.daily }}</span>
            </div>
          </div>
        </div>
        <div class="balance py-2">
          {{ user.dwd | amount }}
          <!-- <div class="balance">
          <div class="detail"> DAILY: <span class="detail text-green">
              +{{ totalRewards.daily }} </span></div>
          <div class="detail"> HEIST: <span class="detail text-green">
              +{{ ownHeistReward.amount }} </span></div>
        </div> -->
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { getBalances } from '@/helpers/utils';
import { mapActions } from 'vuex';
import AnimatedNumber from "animated-number-vue";
import numeral from 'numeral';
export default {
  data() {
    return {
      ts: this.$store.state.ui.timestamp - 6000
    }
  },
  components: {
    AnimatedNumber
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility', 'toggleModalAccount']),
    formatToPrice(value) {
      return `${numeral(value).format('0.[00]a')}`;
    }
  },
  computed: {
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight - this.$store.state.ui.timestamp;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const prizePops = this.$store.state.game.prizeProps;
      return prizePops.daily_percent + prizePops.heist_percent;
    },
    totalDailyDWD() {
      const prizePops = this.$store.state.game.prizeProps;
      return prizePops.daily_percent;
    },
    dwdToSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.total_dwd / parseFloat(prizeProps.balance)).toFixed(0);
    },
    user() {
      return this.$store.state.game.user.user;
    },
    user_production() {
      const allHQ = this.$store.state.game.user.buildings.filter(
        b => b.building === 'headquarters',
      );
      let production = 0;
      allHQ.forEach(element => {
        if (element.drug_production_rate) production += element.drug_production_rate;
      });
      return production;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    booster() {
      const date = new Date().getTime() / 1000;
      return Number(this.$store.state.game.user.user.booster) > date;
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
      return { drug_balance: 0 };
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
      ) {
        ocLvl =
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === 'operation_center' &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).lvl || 0;
      }
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
    dailyRewards() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.daily_rewards) || 0;
    },
    totalVest() {
      return this.$store.state.game.user.heist[0] ? this.$store.state.game.user.heist[0].drugs : 0;
    },
    totalRewards() {
      const daily = parseFloat(
        (this.user_production / this.prizeProps.drug_production_rate) * this.totalDailyDWD,
      ).toFixed(3);
      return { daily };
    },
    totalHeistDWD() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.heist_percent;
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = parseFloat((this.totalHeistDWD / 100) * percent).toFixed(3);
      return {
        amount,
        percent,
      };
    },
    steemBalance() {
      if (this.$store.state.auth.account)
        return parseFloat(this.$store.state.auth.account.balance).toFixed(3) || 0;
      return 0;
    },
    sbdBalance() {
      if (this.$store.state.auth.account)
        return parseFloat(this.$store.state.auth.account.sbd_balance).toFixed(3) || 0;
      return 0;
    },
    dwdBalance() {
      return parseFloat(this.$store.state.game.user.dwd).toFixed(3);
    },
    drugBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;

      return parseFloat(
        this.HQ.drug_production_rate * 60 * 60 * 24 * oc * 0.005 +
        this.HQ.drug_production_rate * 60 * 60 * 24 * labLvl * 0.0025,
      ).toFixed(2);
    },
    weaponBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      return parseFloat(
        this.HQ.weapon_production_rate * 60 * 60 * 24 * oc * 0.005 +
        this.HQ.weapon_production_rate * 60 * 60 * 24 * weaponLvl * 0.005,
      ).toFixed(2);
    },
    alcoholBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return parseFloat(
        this.HQ.alcohol_production_rate * 60 * 60 * 24 * oc * 0.005 +
        this.HQ.alcohol_production_rate * 60 * 60 * 24 * distilleryLvl * 0.005,
      ).toFixed(2);
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.item {
  border-radius: 5px 5px 0px 0px;
  margin: 5px;
}

.sync {
  margin-top: -8px !important;
  font-size: 12px;
}

.item {
  margin: 0px;
}

.balances {
  color: white;
  font-size: 24px;
  font-weight: 500;
  display: inline-flex;
  line-height: 24px;
  font-family: @heading-font;
  text-align: left !important;

  li {
    padding: 0px;
    font-weight: 700;
    height: 100%;

    .balance {
      float: left;
      text-align: left;
      font-size: 22px;
      line-height: 22px !important;
      ;

    }

    h6 {
      margin-bottom: 0px;
      font-size: 7px;
      line-height: 7px;
    }


    span {
      float: right;
      line-height: 42px;
    }

    .text-gray {
      font-size: 16px;
    }

    .detail {
      font-size: 8px;
      line-height: 10px !important;
      text-align: left;

      span {
        float: none;
        line-height: 13px !important;
      }
    }


  }

  .mini {
    color: white;
    line-height: 12px;
    display: block;
    font-size: 12px;
    text-align: left;
  }
}
</style>
