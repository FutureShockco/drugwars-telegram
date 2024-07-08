<template>
  <div id="notification-bar-3" class="notification-bar glass-effect detached rounded-m shadow-l fade show"
    data-bs-delay="7000">
    <div class="toast-header px-3 py-3">
      <i class="bi bi-bell-fill pe-2 color-yellow-dark"></i>
      <strong class="me-auto color-theme">Selecting Your Base of Operations</strong>
      <small>Masterclass {{ tutorialStep + 1 }}</small>
    </div>
    <div class="d-flex p-3 pb-0" v-if="tutorialStep === 0">
      <div class="ms-auto">
        <img src="/img/pablo.png" width="112" class="rounded-s" alt="img">
      </div>
      <div class="ps-4">
        {{ this.$route.path }}
        <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
        <h3 v-if="this.$route.path === '/home'">"Listen up, amigo. The first move to power is picking the
          right turf. You need a spot where you can defend yourself and expand without too much heat. Choose wisely, and
          you'll be the king of your own empire."</h3>

        <h3 v-if="this.$route.path === '/map/territory'">"Alright, jefe, now you can see the map in
          front of you. Use the buttons to navigate through different neighborhoods. This is where you'll start building
          your empire, so make it count."</h3>
        <p class="mb-0">
          TIP:Look for areas with fewer neighboring enemies. This will give you a safer start.
        </p>
        <router-link v-if="this.$route.path === '/home'" :to="'/map/territory?location=' + rnd"
          class="btn p-3 color-green-dark font-11 pt-3 d-inline-block float-end">Choose a location</router-link>
        <div @click="this.hideTutorial" v-if="this.$route.path === '/map/territory'"
          :to="'/map/territory?location=' + rnd" class="btn p-3 color-green-dark font-11 pt-3 d-inline-block float-end">
          Close and choose</div>
      </div>

    </div>
    <div class="d-flex p-3 pb-0" v-if="tutorialStep === 1">
      <div class="ms-auto">
        <img src="/img/pablo.png" width="112" class="rounded-s" alt="img">
      </div>
      <div class="ps-4">
        {{ this.$route.path }}
        <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
        <h3 >Felicitaciones, amigo! You've chosen your turf. Now, it's time to
          make it your stronghold. The next move is upgrading your headquarters.</h3>
        <p class="mb-0">
          TIP: A solid HQ is the heart of your empire,
          where all the big decisions are made and operations are controlled. Let's get to it.
        </p>
        <div @click="this.hideTutorial" v-if="this.$route.path === '/buildings'" :to="'/map/territory?location=' + rnd"
          class="btn p-3 color-green-dark font-11 pt-3 d-inline-block float-end">
          Close and choose</div>
          <router-link v-else to="/buildings"
          class="btn p-3 color-green-dark font-11 pt-3 d-inline-block float-end">Go to your base</router-link>
      </div>

    </div>
  </div>
  <!-- <div id="notification-bar-1" class="notification-bar glass-effect rounded-s shadow-xxl fade show"
    :class="showTutorial ? 'show' : ''" data-bs-delay="5000">
    <router-link :to="'/map/territory?location=' + rnd" class="toast-header px-3 py-3">
      <strong class="me-auto color-theme">Get started</strong>

      <i class="fad fa-check pe-2 color-green-dark"></i>
    </router-link>
    <div v-if="!mission0" class="toast-body px-3 py-3">
      <div>Choose a location on the map.</div>
    </div>
  </div> -->
  <!-- <div class="card card-style">
    <div class="content">
      <h4>With Simple Icons</h4>
      <p>
        Default list groups with or without flushed borders with simple no background icons.
      </p>
      <div class="list-group list-custom list-group-m rounded-xs">
        <a href="#" class="list-group-item" data-trigger-switch="switch-2">
          <i class="bi color-blue-dark bi-gear-fill"></i>
          <i class="fad mr-2" :class="mission2 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <div>List Item 3</div>
          <div class="form-switch ios-switch switch-green switch-s">
            <input type="checkbox" class="ios-input" id="switch-2" checked="">
            <label class="custom-control-label" for="switch-2"></label>
          </div>
        </a>
      </div>
    </div>

    <div class="content">
      <div class="hide-sm hide-md">
        <img width="100" height="100" class="mr-4 mb-4" src="//img.drugwars.io/me.jpg" />
      </div>
      <p>Welcome to the city, newcomer! It's a tough world out there, and before you start making friends, you'll want
        to learn how to defend yourself. No one knows how long you'll last, but everyone will be trying to take what you
        build! Focus on completing these missions first to strengthen your defenses, and then you can think about new
        challenges. Good luck!</p>
    </div>
    <div class="row mb-n3">
      <div class="missions list-group list-custom list-group-m rounded-xs">
        <router-link :to="'/map/territory?location=' + rnd" class="list-group-item">
          <i class="bi color-blue-dark bi-gear-fill" data-trigger-switch="switch-2"></i>
         <i class="fa mr-2" :class="mission0 ? 'fa-check text-green' : 'fa-xmark text-red'"></i> 
          <h5>1. Choose a location on the map</h5>
        </router-link>
        <li>
          <i class="fa mr-2" :class="mission1 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings">2. Upgrade the headquarters</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission2 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings/drugs">3. Increase your DRUGS production</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission3 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings/weapons">4. Increase your WEAPONS production</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission4 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings/alcohol">5. Increase your ALCOHOL production</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission5 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings">6. Build a training facility!</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission6 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>

          <router-link to="/units">7. Recruit some units</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission7 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/actions">8. Start a fight</router-link>
        </li>
      </div>
    </div>
  </div> -->
</template>

<script>
import { buildings } from 'drugwars';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      nickname: this.$store.state.game.user.user.nickname,
      rnd: Math.floor(Math.random() * Math.floor(250)) + 1,
      showTutorial: false,

    };
  },
  methods: {
    ...mapActions(['showTutorial', 'hideTutorial']),
  },
  computed: {
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    mission0() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters' && b.territory !== 0,
      );
      return !!(building && building.lvl > 0);
    },
    mission1() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters',
      );
      return !!(building && building.lvl > 0);
    },
    mission2() {
      return !!this.$store.state.game.user.buildings.find(
        b =>
          b.building &&
          buildings[b.building].production_type === 'drugs' &&
          buildings[b.building].production_rate > 0,
      );
    },
    mission3() {
      return !!this.$store.state.game.user.buildings.find(
        b =>
          b.building &&
          buildings[b.building].production_type === 'weapons' &&
          buildings[b.building].production_rate > 0,
      );
    },
    mission4() {
      return !!this.$store.state.game.user.buildings.find(
        b =>
          b.building &&
          buildings[b.building].production_type === 'alcohol' &&
          buildings[b.building].production_rate > 0,
      );
    },
    mission5() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'training_facility',
      );
      return !!(building && building.lvl > 0);
    },
    mission6() {
      return this.$store.state.game.user.units.length > 0;
    },
    mission7() {
      if (this.$store.state.game.sent_fights)
        return this.$store.state.game.sent_fights.find(f => f.attacker_nickname === this.nickname);
      return false;
    },
  },
};
</script>

<style scoped lang="less">
.missions {
  li {
    font-size: 18px;
    margin-bottom: 12px;

    .iconfont {
      font-size: 18px;
    }
  }
}
</style>
