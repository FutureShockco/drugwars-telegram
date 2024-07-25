<template>
  <tr>
    <td class="col">
      <div class="d-flex">
        <!-- <Avatar :size="20" :username="player.nickname" :rank="rank" :rankname="rankname"
          picture="https://www.enableds.com/products/duo/v30/images/avatars/2s.png" :reputation="player.reputation"
          :xp="player.xp" /> -->
        <router-link v-if="player.nickname !== user.nickname" :to="'/actions?type=attack&nickname=' + player.nickname">
          <div v-if="player.gang" class="username" :class="{ 'text-blue': player.gang === user.gang }">{{
            player.nickname
          }}</div>
          <div v-else class="username text-magenta">{{ player.nickname }}</div>
          <div class="gang-label" v-if="player.ticker">[{{ player.ticker }}]</div>
        </router-link>
        <div v-else>
          <div v-if="player.gang" class="username" :class="{ 'text-blue': player.gang === user.gang }">{{
            player.nickname
          }}</div>
          <div v-else class="username text-yellow">{{ player.nickname }}</div>
          <div class="gang-label" v-if="player.ticker">[{{ player.ticker }}]</div>
        </div>
      </div>
    </td>
    <td v-if="player.drug_production_rate" class="col">
      <div>
        <Icon name="drug" size="22" />
        {{ player.drug_production_rate * 60 * 60 * 24 | amount }}
      </div>
      <div>
        <Icon name="weapon" size="22" />
        {{ player.weapon_production_rate * 60 * 60 * 24 | amount }}
      </div>
      <div>
        <Icon name="alcohol" size="22" />
        {{ player.alcohol_production_rate * 60 * 60 * 24 | amount }}
      </div>
    </td>
    <td v-else-if="!cruelty" class="col">
      <Icon name="drug" size="22" />
      {{ player.drugs || 0 | amount }}
    </td>
    <td v-else-if="player && player.amount" class="col">
      +{{ player.amount }}
      <Icon name="dwd" size="22" />
    </td>
    <td v-else-if="player && player.ticket" class="col">
      <div>{{ player.ticket }}</div>
    </td>
    <td v-if="player.drug_production_rate && totalRewards" class="col">
      <div>
        <Icon name="dwd" size="22" />
        +{{ totalRewards.daily | amount }}
      </div>
    </td>
    <td v-if="player && !cruelty" class="col">
      <div v-if="heist && ownHeistReward && ownHeistReward.amount > 0">
        <Icon name="ton" size="22" />
        +{{ ownHeistReward.amount | amount }}
      </div>
      <div v-else-if="heist && ownHeistReward">
        <Icon name="ton" size="22" />
        +0
      </div>
    </td>
    <!-- <td class="col">
      <div v-if="reward">
        <div v-if="player && rank && rank < 26">
          <Icon name="dwd" size="22" />
          +{{ Math.round(reward / rank) || 0 | amount }}
        </div>
      </div>
      <div v-else-if="!cruelty">
        <div class="mr-3" v-if="player && rank && rank < 26">
          {{ Math.round(10 / rank) || 0 | amount }}
          <Icon name="dwd" size="22" />
        </div>
      </div>
    </td> -->
  </tr>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  props: ['player', 'rank', 'reputation', 'reward', 'cruelty', 'list', 'heist'],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    rankname() {
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
      const userprod =
        this.player.drug_production_rate +
        this.player.weapon_production_rate +
        this.player.alcohol_production_rate;
      rank = Math.floor((userprod / totalprod) * 10);
      return names[rank];
    },
    shieldEnd() {
      const diff = this.player.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
    ownSpy() {
      if (
        this.$store.state.game.user.units.find(
          u =>
            u.unit === 'spy' &&
            u.base === this.$store.state.game.mainbase.base &&
            u.territory === this.$store.state.game.mainbase.territory,
        )
      )
        return (
          this.$store.state.game.user.units.find(
            u =>
              u.unit === 'spy' &&
              u.base === this.$store.state.game.mainbase.base &&
              u.territory === this.$store.state.game.mainbase.territory,
          ).amount || {
            amount: 0,
          }
        );
      return 0;
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
    totalRewards() {
      const daily = parseFloat(
        (this.player.drug_production_rate / this.prizeProps.drug_production_rate) *
        this.totalDailyDWD,
      ).toFixed(3);
      return { daily };
    },
    totalHeistDWD() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.heist_percent;
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.player.drugs;
      const amount = parseFloat((this.totalHeistDWD / 100) * percent).toFixed(3) || 0;
      return {
        amount: amount || 0,
        percent: percent || 0,
      };
    },
  },
  methods: {
    ...mapActions(['startFight']),
    async handleSubmit() {
      this.isLoading = true;
      const payload = {
        target: this.player.nickname.toLowerCase(),
        units: [{ key: 'spy', amount: 1 }],
        type: 'fight',
      };
      if (this.message) {
        payload.message = this.message;
      }
      const isValid = await this.validateForm();
      if (isValid) {
        this.startFight(payload)
          .then(() => {
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
    async validateForm() {
      this.errorMessage = null;
      const target = this.player.nickname.toLowerCase();
      if (!this.errorMessage)
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
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.icon {
  margin-bottom: -5px;
}

.production {
  color: #fbbd08;
}
</style>
