<template>
  <Header>
    <UiTabs>
      <UiTab to="/buildings">Main</UiTab>
      <UiTab to="/buildings/drugs">Drug</UiTab>
      <UiTab to="/buildings/weapons">Weapon</UiTab>
      <UiTab to="/buildings/alcohol">Alcohol</UiTab>
      <UiTab to="/overview">Info</UiTab>
    </UiTabs>
  </Header>
</template>



<script>
export default {
  data() {
    return {
      share: false,
      details: false,
    };
  },
  computed: {
    base() {
      return this.$store.state.game.mainbase;
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
