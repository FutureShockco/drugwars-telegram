<template>
  <div v-if="items">
    <div v-for="item in trainingsByPriority" v-if="item.lvl !== 0" :key="item.training"
      class="d-inline-block mx-1 my-1 text-center">
      <img width="50" :src="`/img/trainings/${item.training}.png`" />
      <div>
        {{ item.lvl }}
        <div>
          <h5 class="text-yellow label small">{{ item.training }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drugwars from 'drugwars';

export default {
  props: ['items'],
  computed: {
    trainingsByPriority() {
      const trainings = [];
      Object.keys(drugwars.trainings).forEach(training => {
        const u = this.items.find((u) => u.training === training)
        if (u && u.lvl > 0)
          trainings.push({
            training: u.training,
            lvl: u.lvl,
          });
        else
          trainings.push({
            training: u.training,
            lvl: 0,
          });
      })
      return trainings;
    },
  },

};
</script>
