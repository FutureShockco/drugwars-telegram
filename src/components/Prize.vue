<template>
  <div class="card card-style">
    <div class="content">
      <div>
        <Countdown :starttime="now" :endtime="timeToWait" trans='{  
             "day":"Day",
             "hours":"Hours",
             "minutes":"Minutes",
             "seconds":"Seconds",
             "expired":"Payments are gone!.",
             "running":"Till the daily payments.",
             "status": {
                "expired":"Expired",
                "running":"Running",
                "upcoming":"Future"
               }}' />
      </div>
      <div class="prize">
        <!-- <h1 class="mb-0">
          {{ totalDWD | amount }}
          <Icon name="dwd" />
        </h1> -->
        <div class="border border-yellow-dark rounded-s overflow-hidden">
          <table class="table color-theme border-yellow-dark mb-0">
            <thead class="rounded-s bg-yellow-dark border-l">
              <tr class="color-black">
                <th scope="col">
                  <h5 class="color-black font-15 mb-0">Prize</h5>
                </th>
                <th scope="col">
                  <h5 class="color-black font-15 mb-0">Tokens</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Production</strong></td>
                <td>{{ totalDaily | amount }}  <Icon name="dwd" /></td>
              </tr>
              <tr>
                <td><strong>Pablo</strong></td>
                <td>{{ totalHeist | amount }}  <Icon name="dwd" /></td>
              </tr>
              <tr>
                <td><strong>Fight</strong></td>
                <td> {{ totalFight + prizeProps.free_dwd - prizeProps.daily_rewards | amount }}  <Icon name="dwd" /></td>
              </tr>

            </tbody>
          </table>
        </div>
        <!-- <div class="prizes">
          <div class="sub">
            <div>FIGHT</div>
            {{ totalFight + prizeProps.free_dwd - prizeProps.daily_rewards | amount }}
          </div>
          <div class="sub">
            <div>DAILY</div>
            {{ totalDaily | amount }}
          </div>
        </div>
        <div class="prizes">
          <div class="sub">
            <div>HEIST</div>
            {{ totalHeist | amount }}
          </div>
          <div class="sub">
            <div>LOTTERY</div>
            {{ parseFloat(totalLottery).toFixed(3) }}
          </div>
        </div> -->
        <div class="popdetail mb-0 mt-3">POPULATION : {{ this.prizeProps.fight_supply | amount }} = Total units x supply
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      population: null,
    };
  },
  computed: {
    now() {
      return new Date();
    },
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.fight_percent + prizeProps.daily_percent + prizeProps.heist_percent;
    },
    totalUSD() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(this.total * (this.dwd_price * prizeProps.steemprice)).toFixed(2);
    },
    totalDWD() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.fight_percent + prizeProps.daily_percent + prizeProps.heist_percent;
    },
    totalSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(this.totalUSD / prizeProps.steemprice).toFixed(2);
    },
    totalLottery() {
      const { prizeProps } = this.$store.state.game;
      return 5 + prizeProps.all_tickets / 1000;
    },
    totalDaily() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.daily_percent;
    },
    totalFight() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.fight_percent;
    },
    totalHeist() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.heist_percent;
    },
    user() {
      return this.$store.state.game.user.user;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../vars';

.prize {
  display: block;
  margin: 0 auto;
  margin-right: 0px;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-animation: aitf 80s linear infinite;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  text-align: center;



  .popdetail {
    margin-top: 5px;
    line-height: 20px;
    margin-bottom: 5px;
  }

  .popsubdetail {
    margin-top: 0px;
    line-height: 20px;
    margin-bottom: 0px;
  }

  .population {
    font-size: 20px;
    line-height: 18px;
    -webkit-text-fill-color: #c9c9c9;
    color: #cfcfcf !important;
  }

  .sub {
    font-size: 18px;
  }

  .prizes {
    background: #ffc508;
    background-image: radial-gradient(ellipse farthest-corner at center 0px,
        #ffc400 -150%,
        #ffc400 45%,
        #ff8800 85%) !important;
    -webkit-text-fill-color: #000000;
    margin-top: 0px;
    display: -webkit-box;
    padding: 5px;

    .sub {
      margin-left: 12px;
      margin-top: 0px;
      width: 40%;
      font-size: 17px;
      line-height: 20px;
    }

    .subdetail {
      font-size: 14px;
    }
  }
}

@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

@keyframes aitf {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}
</style>
