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
    <td v-if="board === 'prod'" class="col">
      <div>
        {{ player.drug_production_rate * 60 * 60 * 24 | amount }}
        <Icon class="ms-1" name="drug" size="22" />
      </div>
    </td>
    <td v-if="board === 'prod'" class="col">
      <div>

        +{{ totalRewards.daily | amount }}
        <Icon class="ms-1" name="dwd" size="22" />
      </div>
    </td>

    <td v-if="board === 'pablo'" class="col">
      {{ player.drugs || 0 | amount }}
      <Icon class="ms-1" name="drug" size="22" />
    </td>
    <td v-if="board === 'pablo'" class="col">
      <div v-if="heist && ownHeistReward && ownHeistReward.amount > 0">
        <span>+{{ ownHeistReward.amount | tonamount }}</span>
        <Icon class="align-text-top ms-2" name="ton" size="18" />
      </div>
      <div v-else-if="heist && ownHeistReward">
        +0
        <Icon class="align-text-top ms-2" name="ton" size="18" />
      </div>
    </td>
    <td v-if="board === 'fight'" class="col">
      {{ player.supply || 0 }}<i class="ms-2 fad fa-users font-12"></i>
    </td>
    <td v-if="board === 'fight'" class="col">
      +{{ player.amount }}
      <Icon class="ms-1" name="dwd" size="22" />
    </td>
   
  </tr>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  props: ['player', 'rank', 'reputation', 'reward', 'cruelty', 'list', 'heist', 'board'],
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
      const prizeProps = this.$store.state.game.prizeProps;
      return prizeProps.daily_percent + prizeProps.heist_percent;
    },
    totalDailyDWD() {
      const prizeProps = this.$store.state.game.prizeProps;
      return prizeProps.daily_percent;
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
    pablo() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.pool.find((p) => p.pool === "pablo").reward / 1000000000;
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.player.drugs;
      const amount = parseFloat((this.pablo / 100) * percent).toFixed(4) || 0;
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
