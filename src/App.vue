<template>
  <div id="app">
    <Splash v-if="showLoading" />
    <template v-else>
      <TopNav v-if="username" />
      <SidebarLeft v-if="username && showSidebar" />
      <router-view class="page-content" :class="{
        content: showSidebar,
        'content--nav-open': sidebarVisible, 'header-clear-medium': !isHome
      }" />
      <Quickstart v-if="username && showTutorial" />
      <!-- <BottomNav v-if="username" /> -->
      <div @click="toggleSidebarVisibility" :class="sidebarVisible ? 'show' : 'd-none'" class="offcanvas-backdrop fade">
      </div>
    </template>
    <Account v-if="username"
      :open="modalWalletVisible" @close="toggleModalAccount()" />

    <Notifications />

  </div>
</template>

<script>

import { mapActions } from 'vuex';
import Quickstart from './components/Quickstart.vue';
import client from '@/helpers/client';

export default {
  data() {
    return {
      modalIsOpen: localStorage.firstime || false,
      messageIsOpen: localStorage.message || false,
      attempt: 1,
      connected: false,
      timeIsopen: false,
      firstLoad: true,
    };
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility', 'init', 'toggleModalAccount']),
  },
	created() {
		if(this.TWA)
		{
	    this.TWA.onEvent('viewportChanged', this.checkWS());
	    //this.TWA.onEvent('themeChanged', alert("theme"));
		}
	},
methods: {
    ...mapActions(['init', 'login']),
    checkWS() {
      if (client.ws.readyState === 3 && this.TWA && this.TWA.initDataUnsafe && this.TWA.initDataUnsafe.user)
        this.login(this.TWA.initDataUnsafe).then((res) => {
          this.init(this.TWA.initDataUnsafe).then((result) => {
            this.$router.push({ path: this.$route.query.redirect || '/home' });
          })
        })
    },
  },
  computed: {
    tutoDetail() {
      return this.$store.state.game.tutoDetail
    },
    modalWalletVisible() {
      return this.$store.state.ui.modalAccountVisible;
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
