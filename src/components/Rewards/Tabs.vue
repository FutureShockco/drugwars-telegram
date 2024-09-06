<template>
  <Header>
    <UiTabs>
      <UiTab to="/home">Rewards</UiTab>
      <UiTab to="/pablo">Pablo</UiTab>
      <UiTab style="position: relative;" to="/tasks">
        <div class="count"> {{ taskCount }}</div><span>Task</span>
      </UiTab>
      <UiTab to="/boards">Boards</UiTab>
      <UiTab to="/referral">Referrals</UiTab>
    </UiTabs>
    <!-- <div class="coordbase text-right" v-if="base">
      <div class="text text-blue tab name" v-if="main">
        Primary
      </div>
      <div class="text text-orange tab name" v-else-if="base.custom">
        {{ base.custom }}
      </div> {{ base.territory }}:{{ base.base }}
    </div> -->
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
    taskCount() {
      let count = 0
      if (this.$store.state.game.userTasks.dailyRewards.last_connect !== this.dayCheck)
        count++
      this.$store.state.game.userTasks.upgradeTasks.forEach(element => {
        count++
      });
      this.$store.state.game.userTasks.usertasks.forEach(element => {
        if (!element.completed)
          count++
      });
      console.log(this.$store.state.game.userTasks)
      return count
    },
    dayCheck() {
      const rDate = new Date();
      return `${rDate.getUTCDate()}-${rDate.getUTCMonth() + 1}-${rDate.getUTCFullYear()}`; // Format date as DD-MM-YYYY
    },
  },
};
</script>


<style lang="less" scoped>
.count {
  height: 20px;
  top: 0px;
  right: 0%;
  position: absolute;
  background: #d84558;
  padding: 0px 6px;
  border-radius: 5px;
  z-index: 2;
  pointer-events: none;
  line-height: 20px;
  font-weight: 500;
  color: white !important;
}
</style>