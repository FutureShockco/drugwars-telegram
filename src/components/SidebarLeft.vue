<template>
  <div :style="sidebarVisible ? 'visibility:visible;' : 'visibility:hidden;'" :class="sidebarVisible ? 'show' : ''"
    id="menu-start-attached" style="width:280px;" class="offcanvas offcanvas-start">
    <div class="card card-style bg-23 mb-3 rounded-m mt-3" data-card-height="150">
      <div class="card-top m-3">
        <a href="#" data-bs-dismiss="offcanvas" class="icon icon-xs bg-theme rounded-s color-theme float-end"><i
            class="bi bi-caret-left-fill"></i></a>
      </div>
      <div class="card-bottom p-3">
        <h1 class="color-white font-20 font-700 mb-n2">Duo Mobile</h1>
        <p class="color-white font-12 opacity-70 mb-n1">Bootstrap 5 Mobile PWA</p>
      </div>
      <div class="card-overlay bg-gradient-fade rounded-0"></div>
    </div>

    <div class="bg-theme mx-3 rounded-m shadow-m mt-3 mb-3">
      <div class="d-flex px-2 pb-2 pt-2">
        <div>
          <a href="#"><img src="images/pictures/7s.jpg" width="45" class="rounded-s" alt="img"></a>
        </div>
        <div class="ps-2 align-self-center">
          <h5 class="ps-1 mb-0 line-height-xs pt-1">Karla Black</h5>
          <h6 class="ps-1 mb-0 font-400 opacity-40">Front End Designer</h6>
        </div>
        <div class="ms-auto">
          <a href="#" data-bs-toggle="dropdown" class="icon icon-m ps-3"><i
              class="bi bi-three-dots-vertical font-18 color-theme"></i></a>
          <div class="dropdown-menu  bg-transparent border-0 mt-n1 ms-3">
            <div class="card card-style rounded-m shadow-xl mt-1 me-1">
              <div class="list-group list-custom list-group-s list-group-flush rounded-xs px-3 py-1">
                <a href="page-profile-admin.html" class="color-theme opacity-70 list-group-item py-1"><strong
                    class="font-500 font-12">Your Profile</strong><i class="bi bi-chevron-right"></i></a>
                <a href="page-activity.html" class="color-theme opacity-70 list-group-item py-1"><strong
                    class="font-500 font-12">Notifications</strong><i class="bi bi-chevron-right"></i></a>
                <a href="page-login-2.html" class="color-theme opacity-70 list-group-item py-1"><strong
                    class="font-500 font-12">Log Out</strong><i class="bi bi-chevron-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <span class="menu-divider">NAVIGATION</span>
    <div class="menu-list">
      <div class="card card-style rounded-m p-3 py-2 mb-0">
        <a href="index.html" id="nav-homes"><i
            class="gradient-blue shadow-bg shadow-bg-xs bi bi-house-fill"></i><span>Homepage</span><i
            class="bi bi-chevron-right"></i></a>
        <a href="index-components.html" id="nav-comps"><i
            class="gradient-red shadow-bg shadow-bg-xs bi bi-gear-fill"></i><span>Components</span><i
            class="bi bi-chevron-right"></i></a>
        <a href="index-pages.html" id="nav-pages"><i
            class="gradient-green shadow-bg shadow-bg-xs bi bi-heart-fill"></i><span>Site Pages</span><i
            class="bi bi-chevron-right"></i></a>
        <a href="index-media.html" id="nav-media"><i
            class="gradient-yellow shadow-bg shadow-bg-xs bi bi-image-fill"></i><span>Media Styles</span><i
            class="bi bi-chevron-right"></i></a>
        <a href="index-contact.html" id="nav-mails"><i
            class="gradient-magenta shadow-bg shadow-bg-xs bi bi-envelope-fill"></i><span>Contact</span><i
            class="bi bi-chevron-right"></i></a>
      </div>
    </div>

    <span class="menu-divider mt-4">SETTINGS</span>
    <div class="menu-list">
      <div class="card card-style rounded-m p-3 py-2 mb-0">
        <a href="#" data-bs-toggle="offcanvas" data-bs-target="#menu-color">
          <i class="gradient-highlight shadow-bg shadow-bg-xs bi bi-palette-fill"></i>
          <span>Highlights</span>
          <i class="bi bi-chevron-right"></i>
        </a>
        <a href="#" data-toggle-theme data-trigger-switch="switch-1">
          <i class="gradient-dark shadow-bg shadow-bg-xs bi bi-moon-fill font-13"></i>
          <span>Dark Mode</span>
          <div class="form-switch ios-switch switch-green switch-s me-2">
            <input type="checkbox" data-toggle-theme class="ios-input" id="switch-1">
            <label class="custom-control-label" for="switch-1"></label>
          </div>
        </a>
      </div>
    </div>

    <span class="menu-divider mt-4">Messages</span>
    <div class="menu-content px-3">
      <div class="card card-style rounded-m p-2 mx-0 bg-theme mb-0">
        <div class="menu-list">
          <a href="#"><img src="images/avatars/6s.png" alt="img" class="gradient-orange"><span
              class="font-500 color-theme">Olivia Orange</span><em class="badge badge-s bg-red-dark">3</em></a>
          <a href="#"><img src="images/avatars/2s.png" alt="img" class="gradient-green"><span
              class="font-500 color-theme">Marcus Green</span><em class="badge badge-s bg-red-dark">5</em></a>
          <a href="#"><img src="images/avatars/5s.png" alt="img" class="gradient-blue"><span
              class="font-500 color-theme">Danny Blueish</span><em class="badge badge-s bg-red-dark">1</em></a>
        </div>
      </div>
    </div>

    <span class="menu-divider mt-4">Latest Updates</span>
    <div class="menu-content px-3">
      <div class="card card-style rounded-m p-2 mx-0 bg-theme">
        <a href="#">
          <div class="d-flex">
            <div class="align-self-center">
              <img src="images/pictures/14s.jpg" class="rounded-s me-2" width="60" alt="img">
            </div>
            <div class="align-self-center">
              <h5 class="font-14 mb-0 ps-1 pt-1">Duo 3.0 Released</h5>
              <p class="ps-1 pb-1 mb-0 font-11 line-height-s opacity-70">
                New design, more components. Bootstrap 5 and Vanilla JS.
              </p>
            </div>
          </div>
        </a>
        <div class="mb-2"></div>
        <a href="#">
          <div class="d-flex">
            <div class="align-self-center">
              <img src="images/pictures/5s.jpg" class="rounded-s me-2" width="60" alt="img">
            </div>
            <div class="align-self-center">
              <h5 class="font-14 mb-0 ps-1 pt-1">PWA Ready</h5>
              <p class="ps-1 pb-1 mb-0 font-11 line-height-s opacity-70">
                Add Duo to your home screen and enjoy it as you would a native app.
              </p>
            </div>
          </div>
        </a>
        <div class="mb-2"></div>
        <a href="#">
          <div class="d-flex">
            <div class="align-self-center">
              <img src="images/pictures/11s.jpg" class="rounded-s me-2" width="60" alt="img">
            </div>
            <div class="align-self-center">
              <h5 class="font-14 mb-0 ps-1 pt-1">Care & Quality</h5>
              <p class="ps-1 pb-1 mb-0 font-11 line-height-s opacity-70">
                We love all our customers, and we're always here to help out.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>

    <p class="text-center mb-0 mt-n3 pb-3 font-9 text-uppercase font-600 color-theme">Made with <i
        class=" font-9 px-1 bi bi-heart-fill color-red-dark"></i> by Enabled in <span class="copyright-year"></span>.
    </p>

  </div>

</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  data() {
    return {};
  },
  computed: {
    config() {
      return {
        options: [
          {
            value: 'Attack',
          },
          {
            value: 'Transport',
          },
        ],
        backgroundColor: 'green',
      };
    },
    sidebarVisible() {
      return this.$store.state.ui.sidebarVisible;
    },
    username() {
      return this.$store.state.auth.username;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    rankname() {
      let i = 10;
      let rank = 10;
      let names = [
        'recruit',
        'grifter',
        'outlaw',
        'enforcer',
        'smuggler',
        'lieutenant',
        'boss',
        'legend',
        'divine',
        'immortal',
      ];
      let totalprod = this.$store.state.game.prizeProps.max_prod[0].max_prod;
      let userprod = this.$store.state.game.user.total_production;
      rank = Math.floor((userprod / totalprod) * 10) - 1;
      if (rank < 0) rank = 0;
      return names[rank];
    },
    reputation() {
      if (
        this.$store.state.game.user.reputation &&
        this.$store.state.game.user.reputation[0] &&
        this.$store.state.game.user.reputation[0].reputation
      )
        return this.$store.state.game.user.reputation[0].reputation;
      return 1000;
    },
    rank() {
      if (
        this.$store.state.game.user.rank &&
        this.$store.state.game.user.rank[0] &&
        this.$store.state.game.user.rank[0].rank
      )
        return this.$store.state.game.user.rank[0].rank;
    },
    xp() {
      return this.$store.state.game.user.user.xp;
    },
    jobs() {
      let jobs = 0;
      if (this.$store.state.game.user.jobs)
        this.$store.state.game.user.jobs.forEach((element) => {
          const pendingUpdate = new Date(element.date).getTime();
          const now = new Date().getTime();
          if (pendingUpdate >= now) jobs++;
        });
      if (this.$store.state.game.user.gangjobs)
        this.$store.state.game.user.gangjobs.forEach((element) => {
          const pendingUpdate = new Date(element.date).getTime();
          const now = new Date().getTime();
          if (pendingUpdate >= now) jobs++;
        });
      return jobs;
    },
    activeIncFightsCount() {
      if (this.$store.state.game.fights_count) return this.$store.state.game.fights_count.inc;
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.fights_count) {
        return this.$store.state.game.fights_count.sent;
      }
      return 0;
    },
    activeTransportsCount() {
      if (this.$store.state.game.transports_count) {
        if (
          this.$store.state.game.transports_count.sent ===
          this.$store.state.game.transports_count.inc
        )
          return this.$store.state.game.transports_count.sent;
        return (
          this.$store.state.game.transports_count.sent + this.$store.state.game.transports_count.inc
        );
      }
      return 0;
    },
    activeStationsCount() {
      if (this.$store.state.game.stations_count) {
        return this.$store.state.game.stations_count.sent;
      }
      return 0;
    },
    isConnected() {
      if (store.state.auth.username) return this.$store.state.game.isconnected;
      return true;
    },
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility']),
    toggleSidebar() {
      if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1011px)').matches) {
        this.toggleSidebarVisibility();
      }
    },
    logout() {
      this.$auth.logOut();
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';
@media screen and (min-width: 1119px) {
  .sidebar-rewards {
    display: none !important;
  }
}

.sidebar-left {
  left: -@sidebar-width;

  @media @bp-small {
    left: 0;
  }

  &.sidebar-open {
    left: 0;
  }

  ul {
    list-style: none;
    font-family: @heading-font;
    font-size: 20px;

    li {
      clear: both;
      font-family: @special-font;
      border-bottom: 1px solid rgb(28, 28, 28);

      .router-link-active {
        opacity: 1;
        color: black;
        i {
          font-size: 30px;
          --fa-primary-color: red;
          --fa-secondary-color: white;
          --fa-primary-opacity: 1.0;
          --fa-secondary-opacity: 1.0;
        }
      }

      i {
        font-size: 30px;
        --fa-primary-opacity: 1.0;
        --fa-secondary-opacity: 0.2;
      }

      a {
        color: @white-darker;
        opacity: 0.8;
      }
    }
  }
}

.referral {
  background-image: linear-gradient(180deg, #b40000 0%, #7a0000 74%);
}

.button span,
i {
  position: inherit !important;
  text-shadow: 0px 0px 0px #5a5a5a;
}
</style>
