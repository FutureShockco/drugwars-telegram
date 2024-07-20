<template>
  <div class="page-content pb-0 overflow-hidden bg-dark-dark">
    <div v-if="rnd.length > 2" class="splide single-slider slider-no-dots slider-no-arrows"
      id="single-slider-walkthrough" data-splide='{"interval":5000}'>
      <div class="splide__track">
        <div class="splide__list">
          <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(./img/ban7.png); background-size:cover;" data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png"
                    style="width: 100%;" name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <div class="content mb-0">
                  <h1 class="text-center font-700">
                    "{{ bella[rnd[0]] }}"
                  </h1>
                  <h3 class="text-center font-700 pb-3">
                    Bella Ramirez
                  </h3>
                </div>
              </div>
              <div class="card-overlay bg-black opacity-40 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
          <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(./img/ban4.png); background-size:cover;" data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png"
                    style="width: 100%;" name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <div class="content mb-0">
                  <h3 class="text-center font-700">
                    {{ dyk[rnd[1]].q }}
                  </h3>
                  <h1 class="text-center font-700 pb-3">
                    {{ dyk[rnd[1]].a }}
                  </h1>
                </div>
              </div>
              <div class="card-overlay bg-black opacity-40 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
          <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(./img/ban6.png); background-size:cover;" data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png"
                    style="width: 100%;" name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <div class="content mb-0">
                  <h3 class="text-center font-700">
                    Anonymous tip
                  </h3>
                  <h1 class="text-center font-700 pb-3">
                    {{ anon[rnd[2]] }}
                  </h1>
                </div>
              </div>
              <div class="card-overlay bg-black opacity-40 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-bottom text-center mb-4">
      {{ this.$route.query.tgWebAppStartParam }}
      <button :disabled="!canLogin" @click="ok"
        class="btn w-50 gradient-highlight m-4 font-700 text-uppercase shadow-bg shadow-bg-s" style="color:black">Play
        Now</button>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
import dyk from '@/../dyk.json';
import anon from '@/../anon.json';
import bella from '@/../bella.json';
export default {
  data() {
    return {
      canLogin: process.env.VUE_APP_DEV || false,
      rnd: [],
      dyk: dyk,
      anon: anon,
      bella: bella,
    };
  },
  mounted() {
    window.init_template()

  },
  created() {
    if (this.TWA.onEvent)
      this.TWA.onEvent('web_app_ready', this.makeItok());
    this.rnd.push(Math.floor(Math.random() * Math.floor(bella.length)))
    this.rnd.push(Math.floor(Math.random() * Math.floor(anon.length)))
    this.rnd.push(Math.floor(Math.random() * Math.floor(dyk.length)))
    if (this.$route.query && this.$route.query.tgWebAppStartParam)
      localStorage.setItem('drugwars_referrer', this.$route.query.tgWebAppStartParam);
  },
  methods: {
    ...mapActions(['init', 'login']),
    ok() {
      if (this.TWA && this.TWA.initData)
        console.log(this.TWA.initData)
      this.login(this.TWA.initData).then((res) => {
        this.init(this.TWA.initData).then((result) => {
          this.$router.push({ path: this.$route.query.redirect || '/home' });
        })
      })
    },
    makeItok() {
      this.canLogin = true;

    },
    logout() {
      this.$auth.logOut();
      this.$router.push({ path: '/' });
    },
  },
  computed: {
    server() {
      return this.$store.state.game.server;
    },
    ready() {
      return this.TWA.ready();
    },

  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 65px;
  height: 20px;
  border-radius: 20px;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
  transform: rotate(-35deg);
  animation: bgmove 5s infinite linear;
  left: calc(50% - 33px);
  top: 50%;
  position: relative;
}


.wrapper:after {
  clear: both;
  display: table;
  content: '';
}

.wrapper:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 30px;
  width: 80%;
  height: 30%;
  background: linear-gradient(25deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
  left: 50%;
  margin-left: -40%;
  top: 20%;
}

.left {
  float: left;
  height: 100%;
  width: 50%;
  background: linear-gradient(#ffc012a8, #c7a200c7);
  border-radius: 40px 0 0 40px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-right: 1px solid #ffc400;
  box-shadow: inset 0 5px 0 #ffc400a2, inset 0 -10px 15px #facc02;
}

.right {
  float: right;
  height: 100%;
  width: 50%;
  border-radius: 0 40px 40px 0;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-left: 1px solid rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 5px 0 #ff1212a1, inset 0 -10px 15px #fa0202ab;
  background: linear-gradient(#ff1212a6, #fa0202ab);
}

@keyframes bgmove {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.forcelogout {
  position: absolute;
  bottom: 0px;
  left: calc(50% - 37px);
}
</style>
