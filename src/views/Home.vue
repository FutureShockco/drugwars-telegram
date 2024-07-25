<template>
  <Splash/>
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
    if(window && window.init_template)
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
    else localStorage.setItem('drugwars_referrer', 'null');

  },
  methods: {
    ...mapActions(['init', 'login']),
    ok() {
      if (this.TWA && this.TWA.initData)
        console.log(this.TWA.initData)
      this.login(this.TWA.initData).then((res) => {
        this.init({ user: this.TWA.initData, showLoading: true }).then((result) => {
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
