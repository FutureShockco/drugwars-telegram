<template>
  <Header>
    <UiTabs>
      <UiTab to="/gangs">Gangs</UiTab>
      <UiTab v-if="!user.gang" to="/gangs/create">
        Create gang
      </UiTab>
      <UiTab :to="`/gangs/gang/${user.gang}`" v-if="user.gang">
        {{ user.ticker }}
      </UiTab>
      <UiTab :to="`/gangs/gang/${user.gang}/buildings`" v-if="user.gang">
        Office
      </UiTab>
      <UiTab :to="`/gangs/gang/${user.gang}/diplomacy`" v-if="user.gang">
        State
      </UiTab>
      <UiTab :to="`/gangs/gang/${user.gang}/deposit`" v-if="user.gang">
        Deposit
      </UiTab>
      <UiTab :to="`/gangs/gang/${user.gang}/fights`" v-if="user.gang">
        Fights
      </UiTab>
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
