<template>
  <Header>
    <UiTabs>
      <UiTab v-if="hasBase" :to="'/map/territory?location=' + base.territory">Main</UiTab>
      <UiTab v-else :to="'/map/territory?location=' + rnd">Main</UiTab>
    </UiTabs>
  </Header>
</template>



<script>
export default {
  data() {
    return {
      share: false,
      details: false,
      rnd: Math.floor(Math.random() * Math.floor(250)) + 1,
    };
  },
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    hasBase() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters' && b.territory !== 0,
      );
      return !!(building && building.lvl > 0);
    },
    main() {
      return (
        this.$store.state.game.user.buildings.find(
          b => b.main === 1 && b.base === this.base.base && b.territory === this.base.territory,
        ) || null
      );
    },
    user() {
      return this.$store.state.game.user.user;
    },
    username() {
      return this.$store.state.auth.username;
    },
    json() {
      return jsonParse(this.fight.json) || {};
    },
  },
  methods: {
    showDetails() {
      this.details = true;
    },
    hideDetails() {
      this.details = false;
    },
  },
};
</script>
