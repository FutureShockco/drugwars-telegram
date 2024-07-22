<template>
  <div id="footer-bar" class="footer-bar footer-bar-detached"
    v-if="username && (!showLoading || (showLoading && !firstLoad)) && this.$store.state.game.user.buildings">
    <router-link to="/home"><i class="fad fa-trophy font-20"></i><span>Home</span></router-link>
    <router-link to="/buildings"><i class="fad fa-building font-20"></i><span>HQ</span></router-link>
    <router-link to="/units"><i class="fad fa-campground font-20"></i><span>Camp</span></router-link>
    <router-link to="/actions"><i class="fad fa-explosion font-20"></i><span>Fight</span></router-link>

    <!-- <router-link v-if="hasBase" :to="'/map/territory?location=' + base.territory"><i
        class="fad fa-map-location-dot font-20"></i><span>Map</span></router-link>

    <router-link v-else :to="'/map/territory?location=' + rnd"><i
        class="fad fa-map-location-dot font-20"></i><span>Map</span></router-link> -->
    <!-- <router-link to="/rewards"><i class="fad fa-award font-20"></i><span>Rewards</span></router-link> -->
    <!-- <router-link to="/leaderboards"><i class="fad fa-trophy font-20"></i><span>Board</span></router-link> -->

    <!-- <router-link to="/gangs"><i class="fad fa-people-group font-20"></i><span>Gang</span></router-link> -->
  </div>
  <!-- <div>
    <ul class="bottomnav d-flex list-style-none text-center">
      <li class="col-3">
        <router-link to="/buildings" class="py-2 px-2 d-block">
          <i class="fad fa-house-chimney"></i>
          <div>
            HQ
          </div>
        </router-link>
      </li>
      <li class="col-3">
        <router-link to="/units" class="py-2 px-2 d-block">
          <i class="fad fa-campground"></i>
          <div>
            Camp
          </div>
        </router-link>
      </li>
      <li class="col-3">
        <router-link to="/actions" class="py-2 px-2 d-block">
          <i class="fad fa-explosion"></i>
          <div>
            Fight
          </div>
          <span class="text-red label p-0" v-if="activeIncFightsCount > 0">
            {{ activeIncFightsCount }}<i class="iconfont icon-arrow-down"></i>
          </span>
          <span class="text-green label p-0" v-if="activeFightsCount > 0">
            {{ activeFightsCount }}<i class="iconfont icon-arrow-up"></i>
          </span>
          <span class="text-blue label p-0" v-if="activeTransportsCount > 0">
            {{ activeTransportsCount }}<i class="iconfont icon-arrow-up"></i>
          </span>
          <span class="text-orange label p-0" v-if="activeStationsCount > 0">
            {{ activeStationsCount }}<i class="iconfont icon-arrow-up"></i>
          </span>
        </router-link>
      </li>

      <li class="col-3">

        <router-link to="/leaderboards" class="py-2 px-2 d-block">
          <i class="fad fa-trophy"></i>
          <div>
            Board
          </div>
        </router-link>
      </li>
      <li class="col-3">

        <router-link to="/gangs" class="py-2 px-2 d-block">
          <i class="fad fa-people-group"></i>
          <div>
            Gang
          </div>
        </router-link>
      </li>

    </ul>

  </div> -->

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      rnd: Math.floor(Math.random() * Math.floor(250)) + 1,

    };
  },
  computed: {
    showLoading() {
      return this.$store.state.ui.showLoading;
    },
    username() {
      return this.$store.state.game.user;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    hasBase() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters' && b.territory !== 0,
      );
      return !!(building && building.lvl > 0);
    },
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
    firstLoad() {
      return this.$store.state.ui.firstLoad;
    },
    username() {
      return this.$store.state.auth.username;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    rank() {
      return this.$store.state.game.user.rank[0].rank;
    },
    xp() {
      return this.$store.state.game.user.user.xp;
    },
    activeIncFightsCount() {
      if (this.$store.state.game.fights_count) {
        return this.$store.state.game.fights_count;
      }
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.sent_fights_count) {
        return this.$store.state.game.sent_fights_count;
      }
      return 0;
    },
    activeIncTransportsCount() {
      if (this.$store.state.game.inc_transports_count) {
        return this.$store.state.game.inc_transports_count;
      }
      return 0;
    },
    activeTransportsCount() {
      if (this.$store.state.game.sent_transports_count) {
        return this.$store.state.game.sent_transports_count;
      }
      return 0;
    },
    activeStationsCount() {
      if (this.$store.state.game.stations_count) {
        return this.$store.state.game.stations_count.sent;
      }
      return 0;
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

.bottomnav {
  background: #0c0c0c;
  color: @heading-color;
  position: fixed;
  z-index: 100;
  top: calc(100vh - 80px);
  left: 0;
  width: 100%;
  height: 80px;
  color: white;
  font-size: 26px;
  font-weight: 500;
  display: inline-flex;
  line-height: 22px;
  font-family: @heading-font;
  text-align: center !important;
  transition: width 0.3s;
  z-index: 1000;

  @media @bp-small {
    height: @bottomnav-height;
  }

  a {
    color: white;
    font-size: 16px;
    border-top: 1px solid #efbf2c;
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

.router-link-active {
  opacity: 1;

  color: white !important;


  i {
    margin-bottom: 5px;
    font-size: 28px;
    --fa-primary-color: red;
    --fa-secondary-color: white;
    --fa-primary-opacity: 1.0;
    --fa-secondary-opacity: 1.0;
  }
}
</style>
