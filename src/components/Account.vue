<template>
  <div :class="open ? '' : 'd-none'" class="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme show"
    style="width: 340px; visibility: visible;" id="menu-call" aria-modal="true" role="dialog">
    <div class="content">
      <div class="d-flex pb-2">
        <div class="align-self-center">
          <h5 class="mb-n1 font-12 color-highlight font-700 text-uppercase pt-1">TON Network</h5>
          <h1 class="font-700">Connect your wallet</h1>
        </div>
        <div class="align-self-center ms-auto">
          <a href="#" data-bs-dismiss="offcanvas" class="icon icon-m"><i
              class="bi bi-x-circle-fill color-red-dark font-18 me-n4"></i></a>
        </div>
      </div>
      <p>
        To receive rewards and make payments through DrugWars you need to connect your TON wallet!
      </p>
      <div id="bloat" class="w-100"></div>
      <h2 v-if="hasWallet">You are connected!</h2>
      {{ wallet }}
      <button v-if="hasWallet" class="btn btn-xxs gradient-highlight" @click="toggleModalAccount">
        Close modal
      </button>
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
    open() {
      this.step = null;
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
        manifestUrl: 'https://dw-telegram-84740bd92ce1.herokuapp.com/tonconnect-manifest.json',
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
      this.tonConnectUI.onStatusChange(
        walletAndwalletInfo => {
          const currentWallet = this.tonConnectUI.wallet;
          if (currentWallet) {
            this.wallet = currentWallet.account.address.toString()
            if (!this.$store.state.game.user.user.wallet && this.tutorialStep > 7) {
              this.setWallet(this.wallet)
              this.setTutoDetail(3)
              this.toggleModalAccount()

            }
          }
        }
      );
    }
  },
  methods: {
    ...mapActions(['init', 'logout', 'send', 'toggleModalAccount', 'setTutoDetail']),
    setWallet() {
      const payload = {
        wallet: this.wallet,
        type: 'set-wallet',
      };
      this.send(payload)
        .then(() => {
          this.isLoading = false;
          this.init()
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
