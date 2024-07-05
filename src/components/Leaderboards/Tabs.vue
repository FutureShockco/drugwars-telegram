<template>
<div class="tabi card mb-0">
  <div class="content mt-1 mb-2">
      <div class="tabs tabs-box" id="tab-group-1">
        <div class="tab-controls rounded-s border-highlight">
          <router-link to="/leaderboards" class="font-13 color-highlight" active-class="active" exact>Prod</router-link>
          <router-link to="/leaderboards/heist" class="font-13 color-highlight" active-class="active"
            exact>Heist</router-link>
          <router-link to="/leaderboards/fights" class="font-13 color-highlight" active-class="active"
            exact>Fight</router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- <Header>
    <UiTabs>
      <UiTab to="/leaderboards">Prod</UiTab>
       <UiTab to="/leaderboards/cruelty">Cruelty</UiTab> 
      <UiTab to="/leaderboards/heist">Heist</UiTab>
      <UiTab to="/leaderboards/fights">Fight</UiTab>
       <UiTab to="/leaderboards/jobs">Job</UiTab> 
       <UiTab to="/leaderboards/lottery">Lottery</UiTab> 
    </UiTabs>
     <div class="coordbase text-right" v-if="base">
      <div class="text text-blue tab name" v-if="main">Primary</div>
      <div class="text text-orange tab name" v-else-if="base.custom">{{base.custom}}</div>
      {{base.territory}}:{{base.base}}
    </div> 
  </Header> -->
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
