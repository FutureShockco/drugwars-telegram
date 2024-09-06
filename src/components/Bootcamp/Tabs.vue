<template>

  <Header>
    <UiTabs>
      <UiTab to="/units">Units</UiTab>
      <UiTab to="/units/training">Training</UiTab>
      <!-- <UiTab to="/units/bunker">Bunker</UiTab> -->
      <!-- <UiTab to="/units/settings">Settings</UiTab> -->
      <UiTab to="/units/help">Help</UiTab>
      <UiTab :to="`/units/simulator/${link}`">Simulator</UiTab>
    </UiTabs>
  </Header>
</template>

<script>
import drugwars from 'drugwars';

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
    ownUnits() {
      const units = [];
      Object.keys(drugwars.units).forEach(unit => {
        const u = this.$store.state.game.user.units.find((u) => u.unit === unit)
        if (u && u.amount > 0)
          units.push({
            key: u.unit,
            amount: u.amount,
          });
      })
      return units;
    },
    link() {
      const myarmy = this.ownUnits.map(unit =>
        this.serialize({
          p: 1,
          key: unit.key,
          n: unit.amount,
        }),
      );
      const mytraining = this.$store.state.game.user.trainings.map(training =>
        this.serialize({
          p: 1,
          key: training.training,
          lvl: training.lvl,
        }),
      );

      let toOpen = `player,${myarmy}`;
      if (mytraining && mytraining.length > 0) toOpen += `,${mytraining}`;

      return toOpen
    }
  },
  methods: {
    serialize(obj) {
      const str = [];
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      return str.join('&');
    },
  }
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
