<template>
  <div id="notification-bar-1" class="notification-bar glass-effect rounded-s shadow-xxl fade show"
    :class="showTutorial ? 'show' : ''" data-bs-delay="5000">
    <router-link :to="'/map/territory?location=' + rnd" class="toast-header px-3 py-3">
      <strong class="me-auto color-theme">Get started</strong>

      <i class="fad fa-check pe-2 color-green-dark"></i>
      <!-- <button @click="showTutorial = !showTutorial" type="button" class="font-10 pe-2" data-bs-dismiss="toast" aria-label="Close"></button> -->
    </router-link>
    <div v-if="mission0" class="toast-body px-3 py-3">
        <div>Choose a location on the map.</div>
    </div>
  </div>
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

export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      nickname: this.$store.state.game.user.user.nickname,
      rnd: Math.floor(Math.random() * Math.floor(250)) + 1,
      showTutorial: false
    };
  },
  computed: {
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
