<template>
  <div v-if="units">
    <div v-for="(unit, index) in units" v-if="unit.amount !== 0" :key="unit.key"
      class="d-inline-block mx-1 my-1 text-center all" @click="handleClick(unit.key)">
      <img class="preview unit mini" style="border: 1px solid #392828;" width="50" :src="`/img/units/${unit.key}.png`">
      <span class="inde"> {{ index + 1 }}</span>
      <i v-if="index + 1 !== units.length" class="fad fa-right " style="--fa-primary-color: green;
      --fa-secondary-color: green;
      --fa-primary-opacity: 1.0;
      --fa-secondary-opacity: 1.0;"></i>
    </div>
  </div>
</template>
.small
<script>
export default {
  props: ['units', 'withDead', 'disableicon'],
  computed: {
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
  },
  methods: {
    handleClick(key) {
      if (!this.disableicon)
        this.$parent.$data.selectedUnits = this.units.filter(unit => unit.key != key);
    },
  },
};
</script>

<style scoped lang="less">
.all {
  position: relative;
}

.inde {
  text-shadow: 3px 3px 5px black;
  position: absolute !important;
  font-size: 28px;
  top: 14px;
  color: #fbbd07;
  left: 6px;
}

.smalltitle {
  font-size: 8px;
  color: #fbbd07;
}
</style>
