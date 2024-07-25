<template>
  <div :class="open ? '' : 'd-none'" class="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme show"
    style="width: 340px; visibility: visible;" id="menu-call" aria-modal="true" role="dialog">
    <div class="content">
      <div class="pb-2">
        <div class="align-self-center">
          <h5 class="mb-n1 font-12 color-highlight font-700 text-uppercase pt-1">TON Network</h5>
          <h1 class="font-700">Connect your wallet</h1>
        </div>
      </div>
      <div class="mb-3">
        To receive rewards and make payments through DrugWars you need to connect your TON wallet!
      </div>
      <div id="bloat" class="w-100"></div>
      <div>
        <h2 class="mt-3" v-if="hasWallet">Good.You are connected!</h2>
        {{ wallet }}
        <UiButton v-if="hasWallet" class="btn btn-xs gradient-highlight" @click="toggleModalAccount">
          Close
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['open'],
  emits: ['close'],
  data() {
    return {
      step: null,
      path: './img/',
      wallet: null,
      tonConnectUI: null
    };
  },
  watch: {
    open(value) {
      const self = this;
      this.step = null;
      this.replaceButton()
    }
  },
  computed: {
    username() {
      return this.$store.state.game.user;
    },
    hasWallet() {
      return this.$store.state.game.user.user.wallet || false;
    },
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    tutoDetail() {
      return this.$store.state.game.tutoDetail
    },
  },
  mounted() {
    if (window.TON_CONNECT_UI) {
      this.tonConnectUI = new window.TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://telegram.drugwars.io/tonconnect-manifest.json',
        buttonRootId: 'bloat'
      });
      this.tonConnectUI.uiOptions = {
        actionsConfiguration: {
          modals: ['before', 'success', 'error'],
          notifications: ['before', 'success', 'error'],
          skipRedirectToWallet: 'ios'
        },
        twaReturnUrl: 'https://t.me/drugwars_bot/drugwars'
      };  
      window.tonConnectUI = this.tonConnectUI;
      const self = this;
      this.tonConnectUI.onStatusChange(
        walletAndwalletInfo => {
          self.replaceButton()
          const currentWallet = this.tonConnectUI.wallet;
          if (currentWallet) {
            self.wallet = currentWallet.account.address.toString()
            if (self.tutorialStep>=8) {
              this.setWallet()
              this.setTutoDetail(3)
              this.toggleModalAccount()
            }
          }
        }
      );
    }
  },
  methods: {
    ...mapActions(['logout', 'send', 'toggleModalAccount', 'setTutoDetail']),
    replaceButton() {
      if (document.querySelectorAll('button[data-tc-connect-button="true"]')[0]) {
        document.querySelectorAll('button[data-tc-connect-button="true"]')[0].style.margin = "auto"

      }
      else if (document.querySelectorAll('tc-root')[0] && document.querySelectorAll('tc-root')[0].children[0])
        document.querySelectorAll('tc-root')[0].children[0].classList.add("w-100")
      if (document.querySelectorAll('button[data-tc-dropdown-button="true"]')[0])
        document.querySelectorAll('button[data-tc-dropdown-button="true"]')[0].style.margin = "auto"
    },
    setWallet() {
      const payload = {
        wallet: this.wallet,
        type: 'set-wallet',
      };
      this.send(payload)
        .then(() => {
            this.init({ user: this.TWA.initData, showLoading: false })
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to set wallet' });
          console.error('Failed to set wallet', e);
          this.isLoading = false;
        });
    },
  },

};
</script>

<style lang="scss" scoped>
#bloat div {
  background: red;
}

tc-root div {
  width: 100%;
}
</style>