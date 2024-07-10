<template>
  <div>
    <UiCenter class="vue-ui-modal home">
      <Icon name="logo" class="logo-large mt-4 mb-3" />
      <div class="columns rel">
        <div class="column det col-4">
          <h5>Create your own virtual empire</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home1.jpg`" />
        </div>
        <div class="column det col-4">
          <h5>Build up a gang with your mates</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home2.jpg`" />
        </div>

        <div class="column det col-4">
          <h5>Fight with your opponents</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home3.jpg`" />
        </div>
      </div>
      <h4 class="ui white header">{{ 'message.login_message' | translate }}</h4>
      <div class="d-inline-grid">
        <div class="ui blue header big">
          <h1 v-if="this.TWA && this.TWA.initDataUnsafe && this.TWA.initDataUnsafe.user">{{
            this.TWA.initDataUnsafe.user.id }}</h1>
          <div class="btn-orange mb-2" @click="isOpen = !isOpen">CHANGE SERVER</div>
          <div :class="{ isOpen }" class="dropdown">
            <button class="btn btn-yellow btn-sm rp mr-2 mb-2" v-for="server in servers" @click="chooseServer(server)"
              :key="server.number">{{ server.number }}: {{ server.name }}
              <span v-if="server.number === 1">(Recommended)</span>
            </button>
          </div>
          SERVER {{ server.number }} : {{ server.name.toString().toUpperCase() }}
        </div>
        <button @click="ok" class="button button-blue button-large mt-2 mb-4">Play Now</button>
        {{ this.TWA }}

        {{ TWA }}
        {{ message }}
      </div>
    </UiCenter>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {

  data() {
    return {
      isAuthenticated: false,
      profile: {},
      isOpen: false,
      message: '',
      servers: [
        { api: process.env.VUE_APP_API, name: 'Chigaco', number: 1 },
      ],
    };
  },
  created() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('loggedIn');
    if (!localStorage.getItem('logintype'))
      localStorage.setItem('logintype', 'steem')
    if (this.TWA)
      this.TWA.ready();
  },
  computed: {
    server() {
      return this.$store.state.game.server;
    },
    TWA() {
      if (window && window.Telegram && window.Telegram.WebApp)
        return window.Telegram.WebApp
      else return null
    }
  },
  methods: {
    ...mapActions(['setServer','init']),
    ok() {
      this.message = window.Telegram.WebApp
    },
    logout() {
      this.$auth.logOut();
      this.$router.push({ path: '/' });
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    },
    chooseServer(value) {
      this.setServer(value);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-top: -15px;
}

.home {
  p {
    font-size: 24px;
  }

  // background-image: url('//img.drugwars.io/home/homecards.png')!important;
  // background-size: contain!important;
  // background-repeat: no-repeat!important;
  // background-position-y: 40px!important;
}

.bottomt {
  text-shadow: 0px 0px 5px black, 0px 0px 5px black, 3px 3px 5px black, -3px -3px 5px black;
}

.rounded-2 {
  border: 1px solid #eca301;
}

.white {
  color: white !important;
}

.rel {
  position: relative;
  // margin-top: 22%!important;
}

h4 {
  color: #fbbd08;
  font-size: 20px;
  text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black,
    3px 3px 5px black, -3px -3px 5px black;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
}

.btn-orange {
  border-radius: 0.25em;
  box-shadow: 0px 3px 10px orangered;
  background-size: cover;
  font-weight: bold;

}

.btn-yellow {
  border-radius: 0.25em;
  background-color: #fbbd08;
  color: black;
  background-image: linear-gradient(160deg, #fbe308 0%, #ffbb00 74%);
  box-shadow: 0px 3px 10px #c59400;
  background-size: cover;
  font-weight: bold;

  &:hover {
    background-image: linear-gradient(160deg, #fbe308 0%, #ffbb00 20%, #ffc21b 80%);
    opacity: 1;
  }

  &:disabled {
    color: white;
  }
}

.btn-blue {
  border-radius: 0.25em;
  background-color: #0679fc;
  color: rgb(250, 250, 250);
  background-image: linear-gradient(-180deg, #0679fc 0%, #0361cc 90%);
  box-shadow: 0px 3px 10px #0361cc;
  background-size: cover;
  font-weight: bold;

  &:hover {
    background-image: linear-gradient(-180deg, #0374f4 0%, #035cc2 90%);
    opacity: 1;
  }

  &:disabled {
    color: white;
  }
}

h5 {
  color: #FFC107;
  font-size: 15px;
  top: 5px;
  text-shadow: 0 0 5px #000000, 0 0 5px #000000, 0 0 5px #000000, 0 0 5px #000000, 3px 3px 5px #000000, -3px -3px 5px #000000;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  font-weight: 900;
  position: absolute;
  text-align: center;
  text-rendering: optimizeLegibility;
  text-transform: uppercase;
  overflow-wrap: break-word;
  white-space: pre-line;
  max-width: 27%;
}

.dropdown {
  left: 50%;
  transform: translatey(-30%) rotatex(90deg) scale(0);
  margin-top: 0.55em;
  transform-origin: 0 0;
  border-radius: 0.35em;
  display: none;
  opacity: 0;
  transition: all 200ms linear;

  &.isOpen {
    transform: translatey(0%);
    display: block;
    opacity: 1;
  }
}

.vue-ui-modal {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  padding: 0px 20px;
  width: 90vw;
  background: rgb(0, 0, 0);
  border-radius: 6px;
  border: 1px solid #fbbd08;
}
</style>
