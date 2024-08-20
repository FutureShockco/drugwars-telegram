<template>
  <div>
    <RewardsTabs />
    <div class="card mx-0 mb-1">
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
        <h2 class="mt-3">Both of you receive a drop of resources</h2>
        <h5>Instantly receive a box containing  <div>1000 <Icon name="drug"/> - 2500 <Icon name="weapon"/> - 2500 <Icon name="alcohol"/></div></h5>
        <h2 class="mt-3">Earn a 5% Bonus</h2>
        <h5>For every DW token reward your friends earn with production, you receive a 5% bonus on their rewards. This
          bonus is an extra
          benefit for you and does not affect their rewards at all!</h5>

      </div>
    </div>
    <div class="card mb-1">
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
    <div class="card">
      <div class="content">
        <h3>Your drops</h3>

        <div class="row g-2 mx-auto">
          <div class="col-4 text-center" :key="key" v-for="(box, key) in boxes">
            <div class="border rounded-s border-highlight">
              <img style="border: 1px solid #392828;    " :src="`/img/box.png`" class="img-fluid rounded-s">
              <h6 class="d-block mt-1" v-if="box.resources.drug">
                <Icon name="drug" size="10" />{{ box.resources.drug }}
              </h6>
              <h6 class="d-block" v-if="box.resources.weapon">
                <Icon name="weapon" size="10" />{{ box.resources.weapon }}
              </h6>
              <h6 class="d-block" v-if="box.resources.alcohol">
                <Icon name="alcohol" size="10" />{{ box.resources.alcohol }}
              </h6>
              <UiButton @click="claim(box)" class="btn w-100 bg-highlight rounded-xs text-uppercase font-700 btn-xxs mt-1"
                type="submit">
                Claim
              </UiButton>
            </div>
          </div>
        </div>
        <div v-if="!boxes.length">
          <p>You have nothing to claim yet.</p>
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
    ...mapActions(['closeModalVideo', 'claimBox']),
    load_boxes() {
      this.usertasks = [];
      const params = { user: { id: this.$store.state.auth.username } }
      client.requestAsync('get_boxes', params).then(result => {
        console.log(result)
        result.forEach(element => {
          element.resources = JSON.parse(element.resources)
        });
        this.boxes = result
      });
    },
    claim(box) {
      const self = this
      this.claimBox({ id: box.id })
      setTimeout(() => {
        self.load_boxes()
      }, 1000);

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
