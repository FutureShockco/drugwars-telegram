<template>

  <i v-if="name === 'drug'" :class="'fad fa-pills'" style="--fa-primary-color:white;--fa-secondary-color:#fbbd08;--fa-secondary-opacity:1;line-height: 20px;"></i>
  <i v-else-if="name === 'weapon'" :class="'fad fa-gun'" style="--fa-primary-color:#fbbd08;--fa-secondary-color:white;--fa-secondary-opacity:1;line-height: 20px;"></i>
  <i v-else-if="name === 'alcohol'" :class="'fad fa-wine-bottle'" style="--fa-primary-color:#fbbd08;--fa-secondary-color:white;--fa-secondary-opacity:1;line-height: 20px;"></i>
  <i v-else-if="name === 'dwd'" :class="'fad fa-box-dollar'" style="--fa-primary-color:#fbbd08;--fa-secondary-color:white;--fa-secondary-opacity:1;line-height: 20px;"></i>
  <img v-else :class="'icon'" :src="`/img/icons/${name}.png`" :width="size" :height="size" />
</template>

<script>
export default {
  props: ['name', 'size', 'shop'],
};
</script>
