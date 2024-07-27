<template>
  <div>
    <BootcampTabs />
    <div class="card mb-1">
      <div class="card-body">
        <h3 class="text-uppercase pt-1">Priority of units in fight</h3>
        <div>Units with lowest number get hit first at each round following this order.</div>
        <div class="units">
          <ArmyByPriority :units="unitsByPriority" :disableicon="true" />
        </div>
        <div>Reminder : Knifers does not respect this.</div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h3 class="text-uppercase pt-1">Priority of npcs in fight</h3>
        <div>Units with lowest number get hit first at each round following this order.</div>
        <div class="units">
          <ArmyByPriority :units="npcByPriority" :disableicon="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { units } from 'drugwars';

export default {
  data() {
    return {
      units,
    };
  },
  computed: {
    unitsByPriority() {
      let allunits = [];
      for (let [key, value] of Object.entries(units)) {
        value.key = key
        if (!value.npc)
          allunits.push(value)
      }
      return allunits.sort((a, b) => a.priority - b.priority);
    },
    npcByPriority() {
      let allunits = [];
      for (let [key, value] of Object.entries(units)) {
        value.key = key
        if (value.npc)
          allunits.push(value)
      }
      return allunits.sort((a, b) => a.priority - b.priority);
    }
  },
};
</script>
