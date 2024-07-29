<template>
  <div id="app">
    <Splash v-if="showLoading" />
    <template>
      <TopNav v-if="username && (!showLoading || (showLoading && !firstLoad))" />
      <!--<SidebarLeft v-if="username && showSidebar" />-->

      <div class="page-content" :class="{
        content: showSidebar,
        'content--nav-open': sidebarVisible, 'header-clear-medium': !isHome
      }" style="height: 100vh; overflow-y: scroll">
        <router-view />
        <div @click="closeModalAccount(), toggleSidebarVisibility(), toggleModalPayment(),  setCurrentPayment(null)"
          :class="(username && showTutoOverlay) || modalWalletVisible || modalVideoVisible || modalPaymentVisible ? 'show' : 'd-none'"
          class="offcanvas-backdrop fade">
        </div>
      </div>
      <PaymentModal v-if="username && modalPaymentVisible" />

      <Quickstart v-if="username && showTutorial" />
      <!-- <BottomNav v-if="username" /> -->

    </template>
    <Account v-if="username" :open="modalWalletVisible" @close="toggleModalAccount()" />

    <Notifications />

  </div>
</template>

<script>

import { mapActions } from 'vuex';
import Quickstart from './components/Quickstart.vue';
import client from '@/helpers/client';
import PaymentModal from './components/PaymentModal.vue';

export default {
  watch: {
    showLoading: function (val) {
      const el = document.body;
      el.classList[val ? 'add' : 'remove']('overflow-hidden');
    }
  },
  data() {
    return {
      modalIsOpen: localStorage.firstime || false,
      messageIsOpen: localStorage.message || false,
      attempt: 1,
      connected: false,
      timeIsopen: false
    };
  },
  created() {
    const self = this;
    setTimeout(() => {
      setInterval(function () {
        if (this.username && client.ws.readyState === 3)
          self.checkWS()
      }, 5000);
    }, 5000);
    self.checkWS()
    if (this.TWA && this.TWA.expand)
      this.TWA.expand()
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility', 'init', 'login', 'toggleModalAccount','closeModalAccount', 'toggleModalPayment', 'setCurrentPayment']),
    checkWS() {
      if (this.TWA && this.TWA.initData)
        client.restart();
      this.login(this.TWA.initData).then((res) => {
        this.init({ user: this.TWA.initData, showLoading: true }).then((result) => {
          this.$router.push({ path: this.$route.query.redirect || '/home' });
        })
      })
    },
  },
  computed: {
    showTutoOverlay() {
      return ((this.tutorialStep === 8 && this.$route.path !== '/actions/outgoing') || (this.tutorialStep === 7 && this.$route.path !== '/actions') || (this.tutorialStep === 6 && this.$route.path !== '/units') || (this.tutorialStep === 5 && this.$route.path !== '/buildings') || (this.tutorialStep === 4 && this.$route.path !== '/buildings/alcohol') || (this.tutorialStep === 3 && this.$route.path !== '/buildings/weapons') || (this.tutorialStep === 2 && this.$route.path !== '/buildings/drugs') || (this.tutoDetail === 0 && this.tutorialStep === 0 && this.$route.path !== '/map/territory'))
    },
    tutoDetail() {
      return this.$store.state.game.tutoDetail
    },
    modalWalletVisible() {
      return this.$store.state.ui.modalAccountVisible;
    },
    modalVideoVisible() {
      return this.$store.state.ui.modalVideoVisible;
    },
    modalPaymentVisible() {
      return this.$store.state.ui.modalPaymentVisible;
    },
    username() {
      return this.$store.state.game.user;
    },
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    wallet() {
      if (this.$store.state.game.user.user.wallet)
        return false
      else return true
    },
    showLoading() {
      return this.$store.state.ui.showLoading;
    },
    firstLoad() {
      return this.$store.state.ui.firstLoad;
    },
    showSidebar() {
      return !this.$route.meta.hideSidebar;
    },
    isHome() {
      return this.$route.path === '/';
    },
    sidebarVisible() {
      return this.$store.state.ui.sidebarVisible;
    },

    showTutorial() {
      return this.$store.state.ui.showTutorial;
    }
  },
};
</script>

<style scoped lang="less">
@import './vars';

#app {
  min-height: 60vh;
  z-index: 1;
  position: relative;
}

.video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 99%;
  width: auto;
  height: auto;
  z-index: -100;
  background: url(//img.drugwars.io/bg4.jpg) no-repeat;
  background-size: cover;
}

.vue-ui-modal {
  z-index: 102;
  background: #0000005e;

  a {
    padding: 8px;
  }
}

.content {
  margin: 0px;
}

// .content {
//   position: relative;
//   left: 0;
//   transition: left 0.3s;
//   background: #000000;
//   background-image: linear-gradient(to top, #0e0e0e, #0c0c0c 74%) !important;
//   min-height: 93vh;

//   @media @bp-small {
//     margin-left: @sidebar-width !important;
//     margin-right: @sidebar-width !important;
//     margin-top: @topnav-height;
//   }

//   &--nav-open {
//     left: @sidebar-width;
//     width: calc(100% - 60px);

//     @media @bp-small {
//       left: 0;
//     }
//   }
// }</style>
