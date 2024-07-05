<template>
  <div class="page-content pb-0 overflow-hidden bg-dark-dark">
    <!-- <h5 class="text-center mb-0">Server ({{ server.number }}) : {{ server.name }}</h5>
    <Icon class="logo-large" name="logo" /> 
    <div class="wrapper">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <button @click="ok"
      class="default-link btn btn-m rounded-s gradient-highlight shadow-bg shadow-bg-s px-5 mb-0 mt-2">Play</button>
    <ul class="forcelogout">
      <a href="https://discord.me/drugwars">{{ 'message.contact_us' | translate }}</a>
    </ul> -->

    <div class="splide single-slider slider-no-dots slider-no-arrows" id="single-slider-walkthrough"
      data-splide='{"interval":5000}'>
      <div class="splide__track">
        <div class="splide__list">
          <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(./img/ban4.png); background-size:cover;" data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png"
                    style="width: 100%;" name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <p class="color-white font-16 text-center boxed-text-xl">
                  Take the role of a gangster, build up your empire by producing and selling drugs, fighting rival
                  gangs, and completing missions.
                </p>
              </div>
              <div class="card-overlay bg-black opacity-40 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
          <!-- <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmZxKom9qQxPxgCTBHFqY2nGt2CGxET9h677YaXszVE9We/wp1.png); background-size:cover;" data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png" style="width: 100%;"  name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <p class="color-white font-16 text-center boxed-text-xl">
                  Many players find the core gameplay loop of building a drug empire, battling rivals, and completing missions to be addictive and enjoyable.
                </p>
              </div>
              <div class="card-overlay bg-black opacity-40 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div> -->
          <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmQWKQ3cfkXDDx7csJQ378TqDjxdTLKwVowhHP3QDrjyhd/cover.png); background-size:cover;"
              data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png"
                    style="width: 100%;" name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <p class="color-white font-16 text-center boxed-text-xl">
                  Drugwars.io has a dedicated player base, with forums and social media groups where players discuss
                  strategies, share tips, and socialize.
                </p>
              </div>
              <div class="card-overlay bg-black opacity-40 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
          <div class="splide__slide">
            <div class="card bg-dark-dark rounded-0"
              style="background-image:url(https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmQWKQ3cfkXDDx7csJQ378TqDjxdTLKwVowhHP3QDrjyhd/cover.png); background-size:cover;"
              data-card-height="cover">
              <div class="card-center">
                <h1 class="color-white font-40 text-center"><img src="//img.drugwars.io/icons/logo.png"
                    style="width: 100%;" name="logo" /> </h1>
                <p class="color-white text-center opacity-70">Massively Multiplayer Simulation Game on Blockchain</p>
                <p class="color-white font-16 text-center boxed-text-xl">
                  The developers regularly release updates with new content, features, and bug fixes.
                </p>
              </div>
              <div class="card-overlay bg-black opacity-60 rounded-0"></div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-bottom">
      <a href="#" @click="ok" class="btn btn-full gradient-highlight m-4 font-700 text-uppercase shadow-bg shadow-bg-s"
        style="color:black">Play Now</a>
      <div class="btn-full text-center mb-4">
        <div id="bloat" class="btn"></div>
        <div id="winfo" class="btn"></div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['init', 'login']),
    ok() {
      if (this.TWA && this.TWA.initDataUnsafe && this.TWA.initDataUnsafe.user)
        this.init(this.TWA.initDataUnsafe).then((result) => {
          this.$router.push({ path: '/buildings' });
        })

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
