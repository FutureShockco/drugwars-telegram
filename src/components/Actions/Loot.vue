<template>
    <div v-if="stolenResources" class="mini" :class="{ 'text-red' : result ==='lost', 'text-green' : result ==='win' }">
        <div v-if="stolenResources.drugs && number">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.drugs + ((stolenResources.drugs/100*2.5)*number.length) | amount }} <Icon name="drug" size="14"/>
        </div>
         <div v-else-if="stolenResources.drugs">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.drugs | amount }} <Icon name="drug" size="14"/>
        </div>
         <div v-else-if="stolenResources.drug">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.drug | amount }} <Icon name="drug" size="14"/>
        </div>
        <div v-if="stolenResources.weapons && number">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.weapons  + ((stolenResources.weapons/100*2.5)*number.length) | amount }} <Icon name="weapon" size="14"/>
        </div>
        <div v-else-if="stolenResources.weapons">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.weapons | amount }} <Icon name="weapon" size="14"/>
        </div>
        <div v-else-if="stolenResources.weapon">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.weapon | amount }} <Icon name="weapon" size="14"/>
        </div>
        <div v-if="(stolenResources.alcohols || stolenResources.alcohol) && number">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ (stolenResources.alcohols + ((stolenResources.alcohols/100*2.5)*number.length)) || (stolenResources.alcohol + ((stolenResources.alcohol/100*2.5)*number.length)) | amount }} <Icon name="alcohol" size="14"/>
        </div>
         <div v-else-if="stolenResources.alcohol">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.alcohol  | amount }} <Icon name="alcohol" size="14"/>
        </div>
        <div v-else-if="stolenResources.alcohols">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.alcohols  | amount }} <Icon name="alcohol" size="14"/>
        </div>
        <div v-if="stolenResources.dwd && number">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ parseFloat(Number(stolenResources.dwd) + ((stolenResources.dwd/100*2.5)*number.length)).toFixed(3) }} DWD
        </div>
        <div v-else-if="stolenResources.dwd">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.dwd | amount }} DWD
        </div>
         <div v-if="number" class="text-yellow">
             GANG BONUS +{{number.length*2.5}}%
         </div>
    </div>
</template>

<script>
export default {
  props: ['stolenResources', 'result', 'number'],
};
</script>
