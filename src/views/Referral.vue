<template>
  <div>
    <RewardsTabs />
    <div class="card card-style">
      <div class="content">
        <div class="d-flex">
          <div>
            <h1 class="text-yellow">DrugWars Referral Program</h1>
          </div>
          <div class="align-self-center ms-auto">
            <i class="fad fa-share font-24 color-green-dark"></i>
          </div>
        </div>
        <h3>1.Invite your friends with this link <a :href="url" target="_blank">
            {{ url }}
          </a></h3>
        <h3>2.Make them win resources!</h3>
        <h3>3.And obtain 5% bonus on their DW token rewards.</h3>

      </div>
    </div>
    <div class="card card-style">
      <div class="content">
        <h3>Your referrals</h3>
      
        <div class="referral">
          <div :key="key" v-for="(referral, key) in referrals">
            <p>
              {{ referral.nickname }}
              <span class="text-green" v-if="getReferralRewardsDWD(referral.drug_production_rate) > 0.001">
                +{{ getReferralRewardsDWD(referral.drug_production_rate) }} DWD
              </span>
              <span class="text-red" v-else>
                Not enough drug production
              </span>
            </p>
          </div>
        </div>
        <div v-if="!referrals.length">
          <p>You have not referred anyone yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      url: `https://t.me/drugwars_bot/drugwars/start?startapp=${this.$store.state.auth.username}`,
    };
  },
  computed: {
    referrals() {
      return this.$store.state.game.user.referals;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
  },
  methods: {
    getReferralRewardsDWD(drugProductionRate) {
      const totalDailySteem = this.prizeProps.daily_percent;
      const referralRewards =
        (((drugProductionRate / this.prizeProps.drug_production_rate) * totalDailySteem) / 100) *
        15;
      return parseFloat(referralRewards).toFixed(3);
    },
  },
};
</script>

<style scoped lang="less">
.link {
  font-size: 26px;
}

.refferalimg {
  z-index: 0;
  position: absolute;
  width: 50%;
  bottom: 0px;
}

.referral {
  z-index: 1;
  position: relative;
  background: #0d0d0d7a;
}

@media screen and (min-width: 200px) and (max-width: 669px) {
  a {
    max-width: 100%;
    word-break: break-word;
    font-size: 20px;
  }
}
</style>
