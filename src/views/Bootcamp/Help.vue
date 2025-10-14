<template>
  <div>
    <BootcampTabs />
    <div class="card mb-1">
      <div class="card-body">
        <h3 class="text-uppercase pt-1">Symbols</h3>
        <div class="d-flex justify-content-between">
          <div class="item-skill text-center">
            <Icon name="skills/fire" size="18" />
            <div class="ms-1 mt-0 mb-0 skill-detail">Attack </div>

          </div>

          <div class="item-skill text-center">
            <Icon name="skills/carry" size="18" />
            <div class="ms-1 mt-0 mb-0 skill-detail">Carrying capacity</div>
          </div>
          <div class="item-skill text-center">
            <Icon name="skills/health" size="18" />
            <div class="ms-1 mt-0 mb-0 skill-detail">Health </div>

          </div>

          <div class="item-skill text-center">
            <Icon name="skills/physical" size="18" />
            <div class="ms-1 mt-0 mb-0 skill-detail">Defense </div>

          </div>
          <div class="item-skill text-center">
            <Icon name="skills/speed" size="18" />
            <div class="ms-1 mt-0 mb-0 skill-detail">Speed</div>
          </div>

          <div class="item-skill text-center">
            <Icon name="drug" size="18" />
            <div class="ms-1 mt-0 mb-0 skill-detail">Move cost</div>
          </div>
        </div>
      </div>
    </div>
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
    <div class="card">
      <div class="card-body">
        <h3 class="text-uppercase pt-1">Debug User Data</h3>
        {{ this.TWA.initData }}
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
