<template>
  <div class="card">
    <div class="content">
      <Countdown :showdays="true" :starttime="now" :endtime="timeToWait" trans='{  
             "day":"Day",
             "hours":"Hours",
             "minutes":"Minutes",
             "seconds":"Seconds",
             "expired":"Payments are gone!.",
             "running":"Till the weekly payments.",
             "status": {
                "expired":"Expired",
                "running":"Running",
                "upcoming":"Future"
               }}' />
               <div class="text-center">
        
        <div class="border border-yellow-dark rounded-s overflow-hidden">
          <table class="table color-theme border-yellow-dark mb-0">
            <thead class="rounded-s bg-yellow-dark border-l">
              <tr class="color-black">
                <th scope="col">
                  <h5 class="color-black font-15 mb-0">Treasury</h5>
                </th>
                <th scope="col">
                  <h5 class="color-black font-15 mb-0">Rewards</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Total</strong></td>
                <td>{{ treasury | amount }}
                  <Icon name="ton" size="18" />
                </td>
              </tr>
              <tr>
                <td><strong>This week</strong></td>
                <td> {{ pablo | amount }}
                  <Icon name="ton" size="18"/>
                </td>
              </tr>
              <!-- <tr>
                <td><strong>Next week</strong></td>
                <td> {{  (treasury - pablo) / 100 * 2 | amount }}
                  <Icon name="ton" size="18"/>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
        <!-- <h5 class="pt-2">Pablo's treasury:  {{ treasury | amount }}<Icon name="ton" size="18" /></h5>
        <h5 >Reward for this week: {{ pablo | amount }}<Icon name="ton" size="18" /></h5>
        <h5 >Reward for next week: {{ treasury / 100 * 2 | amount }}<Icon name="ton" size="18" /></h5> -->

        <div v-if="totalVest && ownHeistReward.percent" class="text-green">You sold {{ totalVest | amount }} <Icon name="drug" size="18" />
          ({{ ownHeistReward.percent | amount }}%) this week </div>
         <div  v-if="totalVest && ownHeistReward.percent"
            class="text-yellow"> You will receive {{ ownHeistReward.amount }}
            <Icon name="ton" size="18" /> 
          </div>
      </div>
      <input class="input form-control input-block mb-2" v-model="amount" type="number" min="0">
      <div class="row mt-3">
        <div class="col">
          <div @click="handleSubmit()" :disabled="isLoading || Number(balances.drugs) < Number(amount)" type="submit"
            class="btn-full btn-xxs  btn border border-green-dark color-green-dark">
            <span v-if="!isLoading">Sell</span>
            <SmallLoading v-else />
          </div>
        </div> 
        <div class="col">
          <div :disabled="isLoading" @click="handleFullSubmit()"
            class="btn-full btn-xxs btn border-mint-dark color-mint-dark">
            Set Max</div>
        </div>
      </div>
      </div>
      


    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBalances } from '@/helpers/utils';
import Promise from 'bluebird';

export default {
  data() {
    return {
      isLoading: false,
      amount: 100,
    };
  },
  computed: {
    now() {
      return new Date();
    },
    timeToWait() {
      const midnight = this.getNextSunday().setUTCHours(24, 0, 0, 0);
      return midnight;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    totalVest() {
      return this.$store.state.game.user.heist[0] ? this.$store.state.game.user.heist[0].drugs : 0;
    },
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
    totalHeistDWD() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.heist_percent;
    },
    pablo() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.pool.find((p) => p.pool === "pablo").reward / 1000000000;
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
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest || 0;
      const amount = parseFloat((this.pablo / 100) * percent).toFixed(3);
      return {
        amount,
        percent,
      };
    },
    treasury() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.balance / 1000000000;
    },
  },
  methods: {
    ...mapActions(['investHeist']),
  getNextSunday() {
  const today = new Date();
  const nextSunday = new Date(today);

  // Get the current day of the week in UTC (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = today.getUTCDay();

  // Calculate how many days to add to get to the next Sunday
  const daysUntilNextSunday = (7 - dayOfWeek) % 7 || 7;

  // Add the calculated number of days to the current UTC date
  nextSunday.setUTCDate(today.getUTCDate() + daysUntilNextSunday);

  return nextSunday;
},
    handleSubmit() {
      if (Number(this.amount) > 0) {
        this.isLoading = true;
        const payload = {
          amount: Math.round(Number(this.amount)),
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
        this.investHeist(payload)
          .then(() => {
            Promise.delay(3000).then(() => {
              this.isLoading = false;
              this.amount = Math.round(this.balances.drugs);
            });
          })
          .catch(e => {
            console.error('Failed to invest on heist', e);
            this.isLoading = false;
          });
      }
    },
    handleFullSubmit() {
      this.amount = Math.round(this.balances.drugs - parseInt((this.balances.drugs / 100) * 1));
    },
  },
};
</script>

<style scoped lang="less">
h4 {
  text-transform: uppercase;
  transform: translate(-50%, -50%) skew(-24deg) rotate(-10deg);
  top: 120px;
  width: fit-content;
  left: 50%;
  font-size: 26px;
  margin: 0;
  line-height: 0px;
  position: relative;
  text-rendering: optimizeLegibility;
  font-weight: 900;
  color: #db2828;
  text-shadow: 1px 4px 6px #000, 0 0 0 #0b0b0b, 1px 4px 6px #101010;
  white-space: nowrap;
}

.heist {
  position: relative;
}

.heist-text {
  text-align: center;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11px;
  position: absolute;
  width: 100px;
  left: calc(50% - 50px);
  top: 26px;
  display: block !important;
}
</style>
