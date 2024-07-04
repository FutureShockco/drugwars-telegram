<template>
  <div class="mb-6">
    <div class="d-flex border-bottom mb-4 pb-4">
      <div class="hide-sm hide-md">
        <img width="100" height="100" class="mr-4 mb-4" src="//img.drugwars.io/me.jpg" />
      </div>
      <p>Welcome to the city, newcomer! It's a tough world out there, and before you start making friends, you'll want
        to learn how to defend yourself. No one knows how long you'll last, but everyone will be trying to take what you
        build! Focus on completing these missions first to strengthen your defenses, and then you can think about new
        challenges. Good luck!</p>
    </div>
    <ul class="missions list-style-none">
      <li>
        <i class="fa mr-2" :class="mission0 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/map">1. Choose a location on the map</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission1 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/buildings">2. Upgrade the headquarters</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission2 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/buildings/drugs">3. Increase your DRUGS production</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission3 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/buildings/weapons">4. Increase your WEAPONS production</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission4 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/buildings/alcohol">5. Increase your ALCOHOL production</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission5 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/buildings">6. Build a training facility!</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission6 ? 'fa-check green' : 'fa-xmark red'"></i>

        <router-link to="/units">7. Recruit some units</router-link>
      </li>
      <li>
        <i class="fa mr-2" :class="mission7 ? 'fa-check green' : 'fa-xmark red'"></i>
        <router-link to="/actions">8. Start a fight</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { buildings } from 'drugwars';

export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      nickname: this.$store.state.game.user.user.nickname,
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
