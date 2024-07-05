<template>

  <Header>
    <UiTabs>
      <UiTab to="/units">Units</UiTab>
      <UiTab to="/units/training">Training</UiTab>
      <!-- <UiTab to="/units/bunker">Bunker</UiTab> -->
      <UiTab to="/units/settings">Settings</UiTab>
      <UiTab to="/units/help">Help</UiTab>
    </UiTabs>
  </Header>
</template>

<script>
export default {
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
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
