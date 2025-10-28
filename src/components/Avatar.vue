<template>
  <div>
    <router-link
      :to="`/actions?type=attack&nickname=${username}`"
      class="avatar"
      :style="{'width': `${size}px`,'height': `${size}px`,}"
    >
      <div v-if="picture && !picture.includes('multiavatar')"
        class="avatar-img"
        :style="{'background-image': `url(${picture})`,'background-size':`contain!important`,'width': `${size}px`,'height': `${size}px`,}"
      />
      <div v-else
        class="avatar-img"
        :style="{'background-image': `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${username})`,'background-size':`contain!important`,'width': `${size}px`,'height': `${size}px`,}"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['username', 'size', 'xp', 'rank', 'picture', 'reputation'],
  data() {
    return {
      config: {
        options: [
          // {
          //     value: "Message"
          // },
          {
            value: 'Attack',
          },
          {
            value: 'Transport',
          },
        ],
        backgroundColor: 'green',
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.avatar {
  position: relative;
  overflow: visible;
  display: block;
  .avatar-img {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgb(15, 15, 15);
  }
  .level {
    display: inline-block;
    position: absolute;
    top: 60 !important;
    left: -40px;
    font-size: 10px;
  }
  .avatar-border {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -8%;
    bottom: -18%;
    right: -8%;
    background-image: url('//img.drugwars.io/avatar-border-black.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .avatar-border1 {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -15%;
    bottom: -18%;
    right: -10%;
    background-image: url('//img.drugwars.io/avatar-border-gold.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .avatar-border2 {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -15%;
    bottom: -18%;
    right: -10%;
    background-image: url('//img.drugwars.io/avatar-border-silver.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .avatar-border3 {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -15%;
    bottom: -18%;
    right: -10%;
    background-image: url('//img.drugwars.io/avatar-border-copper.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
