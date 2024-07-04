<template>
  <div class="sidebar sidebar-left" :class="{ 'sidebar-open': sidebarVisible }">
    <div class="d-flex flex-column height-full">
      <!-- <div class="text-center pt-3">
        <Avatar
          v-if="user.nickname && rank"
          :size="100"
          :username="user.nickname"
          :xp="xp"
          :rank="rank"
          :picture="user.picture"
          :reputation="reputation"
        />
        <Avatar
          v-else
          :size="100"
          :username="user.nickname"
          :xp="xp"
          :picture="user.picture"
          :reputation="reputation"
        />
        <div class="username text-xs">{{ rankname }}</div>
        <div class="username" >
          {{ user.nickname }}
        </div>
        <div class="gang-label" v-if="user.ticker">[{{ user.ticker }}]</div>
      </div> -->
      <div class="height-full">
        <!-- <ul class="pt-1 border-bottom">
          <li>
            <BaseDropdown class="pb-2 px-3 d-block" :config="config" />
          </li>
        </ul> -->
        <ul class="pt-1 pb-2 border-bottom">
          <li>
            <router-link to="/tutorial" class="py-2 px-2 d-block">
              <i class="fad fa-satellite-dish"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/overview" class="py-2 px-2 d-block">
              <i class="fad fa-chart-area"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/buildings" class="py-2 px-2 d-block">
              <i class="fad fa-house-chimney"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/units" class="py-2 px-2 d-block">
              <i class="fad fa-campground"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/actions" class="py-2 px-2 d-block">
              <i class="fad fa-explosion"></i>
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
          <li>
            <router-link to="/map/territory?location=8" class="py-2 px-2 d-block">
              <i class="fad fa-map-location-dot"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/leaderboards" class="py-2 px-2 d-block">
              <i class="fad fa-chalkboard-user"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/gangs" class="py-2 px-2 d-block">
              <i class="fad fa-people-group"></i>
            </router-link>
          </li>
          <!-- <li>
                <router-link
                  to="/contracts"
                  class="py-2 px-2 d-block"
                  
                >
                  Contracts
                </router-link>
              </li> -->
          <!-- <li>
            <router-link to="/jobs" class="py-2 px-2 d-block" >
              {{ 'sidebar.jobs' | translate }}
              <span class="text-red" v-if="jobs > 0"> ({{ jobs }}) </span>
            </router-link>
          </li> -->
          <li>
            <router-link to="/rewards" class="py-2 px-2 d-block sidebar-rewards">
              <i class="fad fa-vault"></i>
            </router-link>
          </li>
          <!-- <li>
            <router-link
              to="/market?token=dwd"
              class="py-2 px-2 d-block"
              
            >
              {{ 'sidebar.market' | translate }}
            </router-link>
          </li>
          <li>
            <router-link to="/shop" class="py-2 px-2 d-block" >
              {{ 'sidebar.shop' | translate }}
            </router-link>
          </li> -->
          <!-- <li>
                        <router-link to="/cards/mycollection" class="py-2 px-2 d-block" >
                            {{'sidebar.cards' | translate}}
                        </router-link>
                    </li> -->


          <!-- <li>
                        <router-link to="/referral" class="py-2 px-2 d-block " >
                            {{'sidebar.referral' | translate}}
                        </router-link>
                    </li> -->
          <li>
            <router-link to="/settings" class="py-2 px-2 d-block">
              <i class="fad fa-gears"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/help" class="py-2 px-2 d-block">
              <i class="fad fa-hands-holding-circle"></i>
            </router-link>
          </li>
          <!-- <li>
                        <a href="https://forum.drugwars.io/" target="_blank" class="py-2 px-2 d-block">
                   {{'sidebar.forum' | translate}}
                </a>
                    </li> -->
        </ul>
        <!-- <ul class="pt-1 pb-2 border-bottom">
                    <li>
                        <a @click.prevent="logout" class="py-2 px-2 text-gray d-block">
                    {{'sidebar.logout' | translate}}
                </a>
                    </li>
                </ul> -->
      </div>
      <Footer />
    </div>
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
        background-image: radial-gradient(ellipse farthest-corner at center 0px,
            #2b2b2b -150%,
            #272626 45%,
            #000000 85%) !important;
        background-size: cover;
        background-repeat: no-repeat;
        color: black !important;
        background-size: cover;
        background-repeat: no-repeat;

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
