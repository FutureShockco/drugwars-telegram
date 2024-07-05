<template>
  <div class="tabi card mb-0">
    <div class="content mt-1 mb-2">
      <div class="tabs tabs-box" id="tab-group-1">
        <div class="tab-controls rounded-s border-highlight">
          <router-link to="/buildings" class="font-13 color-highlight" active-class="active" exact>Office</router-link>
          <router-link to="/buildings/drugs" class="font-13 color-highlight" active-class="active"
            exact>Drug</router-link>
          <router-link to="/buildings/weapons" class="font-13 color-highlight" active-class="active"
            exact>Weapon</router-link>
          <router-link to="/buildings/alcohol" class="font-13 color-highlight" active-class="active"
            exact>Alcohol</router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- <Header>

    <UiTabs>
      <UiTab to="/buildings">Office</UiTab>
      <UiTab to="/buildings/drugs">Drug</UiTab>
      <UiTab to="/buildings/weapons">Weapon</UiTab>
      <UiTab to="/buildings/alcohol">Alcohol</UiTab>
    </UiTabs>
    <div class="coordbase text-right" v-if="base">
            <div class="text text-blue tab name" v-if="main">
                Primary
            </div>
            <div class="text text-orange tab name" v-else-if="base.custom">
                {{base.custom}}
            </div> {{base.territory}}:{{base.base}}
        </div>
  </Header> -->
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

