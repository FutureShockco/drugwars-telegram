<template>
  <div class="tabi card mb-0">
    <div class="content mt-1 mb-2">
      <div class="tabs tabs-box" id="tab-group-1">
        <div class="tab-controls rounded-s border-highlight">
          <router-link to="/units" class="font-13 color-highlight" active-class="active" exact>Units</router-link>
          <router-link to="/units/training" class="font-13 color-highlight" active-class="active"
            exact>Training</router-link>
          <router-link to="/units/settings" class="font-13 color-highlight" active-class="active"
            exact>Settings</router-link>
          <router-link to="/units/help" class="font-13 color-highlight" active-class="active" exact>Help</router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- <Header>
        <UiTabs>
            <UiTab to="/units">Units</UiTab>
            <UiTab to="/units/training">Training</UiTab>
            <UiTab to="/units/bunker">Bunker</UiTab>
            <UiTab to="/units/settings">Settings</UiTab>
            <UiTab to="/units/help">Help</UiTab>
        </UiTabs>

    </Header> -->
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
