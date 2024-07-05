<template>
  <!-- Header -->
  <div class="header-bar header-fixed header-app header-bar-detached">
    <a @click="toggleSidebarVisibility" data-bs-toggle="offcanvas" data-bs-target="#menu-main" href="#"><i
        class="fad fa-bars color-theme"></i></a>
    <a href="#" class="header-title color-theme">DrugWars</a>
    <a href="#" data-bs-toggle="offcanvas" data-bs-target="#menu-color"><i
        class="bi bi-palette-fill font-13 color-highlight"></i></a>
    <a href="#" data-bs-toggle="offcanvas" data-bs-target="#menu-bell"><em class="badge bg-highlight ms-1">3</em><i
        class="font-14 bi bi-bell-fill"></i></a>
    <a href="#" class="show-on-theme-light" data-toggle-theme><i class="bi bi-moon-fill font-13"></i></a>
    <a href="#" class="show-on-theme-dark" data-toggle-theme><i
        class="bi bi-lightbulb-fill color-yellow-dark font-13"></i></a>
  </div>
  <!-- <nav class="topnav topnav-detached brush-black" data-options="scrolltop: false">
    <div class="topnav-content mx-auto">
      <div class="topnav-logo hide-sm hide-md hide-lg text-center">
        <router-link to="/">
          <Icon class="logo" name="logo" />
        </router-link>
      </div>
      <!-- <button class="float-left px-3 py-3 border-right" @click="toggleSidebarVisibility">
            <span class="iconfont icon-three-bars"/>
          </button> -->

  <!-- <Balances class="width-full text-center" />
      <div class="bottomnav text-center">

        <div class="d-flex pt-1 pb-2 border-bottom list-style-none ">
          <div class="col-2">
            <router-link to="/tutorial" class="py-2 px-2 d-block">
              <i class="fad fa-satellite-dish"></i>
            </router-link>
          </div>
          <div class="col-2">
            <router-link to="/overview" class="py-2 px-2 d-block">
              <i class="fad fa-chart-area"></i>
            </router-link>
          </div>

          <div class="col-2">
            <router-link to="/map/territory?location=8" class="py-2 px-2 d-block">
              <i class="fad fa-map-location-dot"></i>
            </router-link>
          </div>

          <div class="col-2">
            <router-link to="/rewards" class="py-2 px-2 d-block sidebar-rewards">
              <i class="fad fa-vault"></i>
            </router-link>
          </div>

          <div class="col-2">
            <router-link to="/settings" class="py-2 px-2 d-block">
              <i class="fad fa-gears"></i>
            </router-link>
          </div>
          <div class="col-2">
            <router-link to="/help" class="py-2 px-2 d-block">
              <i class="fad fa-hands-holding-circle"></i>
            </router-link>
          </div>

        </div>

      </div>
      <div class="shield text-center hide-sm hide-md hide-lg mt-2 d-flex">
        <Icon v-if="shieldEnd" name="shield" size="26" class="text-gray" />
        <div v-if="shieldEnd" class="text-gray">{{ shieldEnd | ms }}</div>
        <Icon v-if="booster" name="machine_gun" size="26" class="text-gray" />
        <div v-if="booster" class="text-gray">{{ boosterEnd | ms }}</div>
      </div>
    </div>
  </nav> -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    shieldEnd() {
      const diff =
        this.$store.state.game.user.user.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
    totalDaily() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.daily_percent;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    booster() {
      const date = new Date().getTime() / 1000;
      return Number(this.$store.state.game.user.user.booster) > date;
    },
    boosterEnd() {
      const diff = this.$store.state.game.user.user.booster * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    overall() {
      return parseFloat(
        (100 * this.$store.state.game.user.user.drug_production_rate) /
        this.$store.state.game.prizeProps.drug_production_rate,
      ).toFixed(3);
    },
    totalRewards() {
      const daily = parseFloat(
        (this.user.drug_production_rate / this.prizeProps.drug_production_rate) * this.totalDaily,
      ).toFixed(3);
      return { daily };
    },
  },
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';
@media screen and (min-width: 200px) and (max-width: 1119px) {
  .prize {
    visibility: hidden;
  }
}

.prize {
  color: rgb(153, 153, 153);
  position: fixed;
  top: 74px;
  z-index: 1500;
  text-align: center;
  font-size: 12px; // max-width: 1120px;
  width: 100%;
}

.topnav {
  color: @heading-color;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 160px;
  overflow: hidden;
  display: flex;
  align-items: center;
  transition: 0.5s;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .55);

  @media @bp-small {
    height: @topnav-height;
  }

  &-detached {
    border-radius: 20px;
    left: 10px !important;
    right: 10px !important;
    top: 8px !important;
    padding-top: 0 !important;
    margin-top: calc(env(safe-area-inset-top)* .8) !important;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1) !important;
  }

  .logo {
    margin-top: 0px;
    height: 60px;
  }

  .topnav-logo {
    width: 100%;
    max-width: 200px;

    .iconfont {
      margin-top: 10px;
      font-size: 40px;
      color: white;
    }
  }

  .topnav-content {
    max-width: @main-width;
    width: 100%;
    height: 120px;

    .prize {
      font-size: 22px;
      font-family: @heading-font;
    }

    .username {
      font-size: 22px;
    }
  }

  button {
    line-height: 22px;
    background: none;
    border: none;
    outline: none;

    @media @bp-small {
      display: none;
    }

    .iconfont {
      color: @border-color !important;
      font-size: 20px;
    }
  }

  .shield {
    min-width: 80px;
    font-size: 10px;
  }

  @media screen and (min-width: 399px) and (max-width: 1119px) {
    .shield {
      min-width: 80px;

      img {
        width: 24px;
        height: 24px;
        margin-top: 10px;
      }
    }
  }
}


.bottomnav {
  color: @heading-color;
  width: 100%;
  color: white;
  font-size: 26px;
  font-weight: 500;
  line-height: 25px;
  font-family: @heading-font;

  a {
    color: white;
    font-size: 16px;
    border-bottom: 1px solid #efbf2c;
  }

  .logo {
    margin-top: 0px;
    height: 45px;
  }

  .bottomnav-logo {
    width: 100%;
    max-width: 200px;

    .iconfont {
      margin-top: 10px;
      font-size: 40px;
      color: white;
    }
  }

  li {

    border-right: 1px solid rgb(25, 25, 25);
  }

  li:last-of-type {
    border-right: 0px solid rgb(43, 43, 43);
  }

  .router-link-active {
    opacity: 1;
    color: black;
    border-bottom: 1px solid red;
    background-size: cover;
    background-repeat: no-repeat;
    color: white !important;
    background-size: cover;
    background-repeat: no-repeat;

    i {
      font-size: 28px;
      --fa-primary-color: red;
      --fa-secondary-color: white;
      --fa-primary-opacity: 1.0;
      --fa-secondary-opacity: 1.0;
    }
  }

  button {
    line-height: 22px;
    background: none;
    border: none;
    outline: none;

    @media @bp-small {
      display: none;
    }

    .iconfont {
      color: @border-color !important;
      font-size: 20px;
    }
  }

  .shield {
    min-width: 80px;
  }


}
</style>
