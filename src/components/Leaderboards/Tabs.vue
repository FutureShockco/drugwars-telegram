<template>

  <Header>
    <UiTabs>
      <UiTab to="/leaderboards">Prod</UiTab>
      <!-- <UiTab to="/leaderboards/cruelty">Cruelty</UiTab> -->
      <UiTab to="/leaderboards/heist">Heist</UiTab>
      <UiTab to="/leaderboards/fights">Fight</UiTab>
      <!-- <UiTab to="/leaderboards/jobs">Job</UiTab> -->
      <!-- <UiTab to="/leaderboards/lottery">Lottery</UiTab> -->
    </UiTabs>
  </Header>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.game.user.user,
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
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
