<template>
  <div class="sunit text-center"
    :class="[tutorialStep === 7 && tutoDetail === 0 && unit.id === 'spy' ? 'tutobox' : '']">
    <div class="sunit" @click="handleClick">
      <div class="smalltitle">{{ unit.name }}</div>
      <img class="preview unit small" :src="`/img/units/${unit.id}.png`" />
    </div>
    <input class="input form-control mb-1 w-100" type="number" min="1" :max="item.amount" v-model="amount">
  </div>
</template>

<script>
import { units } from 'drugwars';

export default {
  props: ['item'],
  emits: ['select'],
  data() {
    return {
      amount: this.item.amount,
    };
  },
  computed: {
    unit() {
      return units[this.item.key];
    },
    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    tutoDetail() {
      return this.$store.state.game.tutoDetail
    },
  },
  methods: {
    handleClick() {
      this.$emit('select', {
        key: this.unit.id,
        amount: this.amount,
      });
    },
  },
};
</script>


<style scoped lang="less">
.mini {
  width: 60px;
}

.small {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}


input {
  width: 72px;
}

.icon-plus {
  text-shadow: 3px 3px 5px black;
  position: relative !important;
  font-size: 28px;
  top: -56px;
  color: #fbbd07;
  left: 0px;
}

.smalltitle {
  font-size: 8px;
  color: #fbbd07;
}
</style>
