<template>
    <div class="text-end">
        <h6 v-if="task.user.paid === 0" class="mb-1 opacity-80 color-highlight">You will receive</h6>
        <h6 v-else class="mb-1 opacity-80 color-highlight">Received</h6>
        <h3 class="d-inline-block" v-if="task.rewardType === 'resources' && task.rewards.drug">
            <Icon name="drug" size="14" />{{ task.rewards.drug }}
        </h3>
        <h3 class="d-inline-block ms-3" v-if="task.rewardType === 'resources' && task.rewards.weapon">
            <Icon name="weapon" size="14" />{{ task.rewards.weapon }}
        </h3>
        <h3 class="d-inline-block ms-3" v-if="task.rewardType === 'resources' && task.rewards.alcohol">
            <Icon name="alcohol" size="14" />{{ task.rewards.alcohol }}
        </h3>
        <h3 class="d-inline-block ms-3" v-if="task.rewardType === 'dwtoken' && task.rewards.dwtoken">
            <Icon name="dwd" size="14" />{{ task.rewards.dwtoken }}
        </h3>
        <h3 v-if="task.rewardType === 'unit' && task.rewards.unit.amount"> <img
                :src="`/img/units/${task.rewards.unit.name}.png`" class="img-fluid rounded-s mx-2" width="32"
                height="32">{{
                    task.rewards.unit.amount }} {{ units[task.rewards.unit.name].name }}</h3>

    </div>
</template>

<script>
import { buildings, units } from 'drugwars';
export default {
    data() {
        return {
            units,
            buildings,
        };
    },
    props: ['task'],
};
</script>
