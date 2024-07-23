<template>
  <div>
    <RewardsTabs />
    <div class="card card-style">
      <div class="content">
        <div class="d-flex">
          <div>
            <h1 class="text-yellow">DrugWars Referral Program</h1>
          </div>
        </div>
        <h2 class="mt-3">Invite Your Friends</h2>
        <h5>Share this link with your friends: <a :href="url" target="_blank">
            {{ url }}
          </a></h5>
        <h6 @click="copy" :class="(copied === 'Copied to clipboard') ? 'text-green' : ''">{{ copied }} <i
            class="fad fa-copy font-24 color-green-dark"></i></h6>
        <h2 class="mt-3">Help Them Succeed</h2>
        <h5>Encourage your friends to win resources and achieve great rewards!</h5>
        <h2 class="mt-3">Earn a 5% Bonus</h2>
        <h5>For every DW token reward your friends earn with production, you receive a 5% bonus on their rewards. This
          bonus is an extra
          benefit for you and does not affect their rewards at all!</h5>

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
          Start referring now and boost your rewards while helping your friends thrive in DrugWars!
        </div>
      </div>
    </div>
    <div class="card card-style">
      <div class="content">
        <h3>Your drops</h3>

        <div class="d-flex">
          <div class="col-3" :key="key" v-for="(box, key) in boxes">
            <img style="border: 1px solid #392828;    " :src="`/img/box.png`" class="img-fluid rounded-s" width="100"
              height="100">
            <UiButton class="btn w-100 bg-green-dark rounded-xs text-uppercase font-700 btn-xxs mt-2" type="submit">
              Claim
            </UiButton>
          </div>
        </div>
        <div v-if="!boxes.length">
          <p>You have nothign to claim yet.</p>
          Start referring now and obtain drop boxes!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      url: `https://t.me/drugwars_bot/drugwars/start?startapp=${this.$store.state.auth.username}`,
      copied: 'Copy to clipboard',
      green: false,
      boxes: []
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
  created() {
    this.closeModalVideo()
    this.load_boxes()
  },
  methods: {
    ...mapActions(['closeModalVideo']),
    load_boxes() {
      this.usertasks = [];
      const params = { user: { id: this.$store.state.auth.username } }
      client.requestAsync('get_boxes', params).then(result => {
        console.log(result)
        this.boxes = result
      });
    },
    getReferralRewardsDWD(drugProductionRate) {
      const totalDailySteem = this.prizeProps.daily_percent;
      const referralRewards =
        (((drugProductionRate / this.prizeProps.drug_production_rate) * totalDailySteem) / 100) *
        15;
      return parseFloat(referralRewards).toFixed(3);
    },
    copy() {
      var copyText = this.url;

      this.copied = 'Copied to clipboard'
      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText);
      const self = this;
      setTimeout(() => {
        self.copied = 'Copy to clipboard'
      }, 1000);
    }
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
