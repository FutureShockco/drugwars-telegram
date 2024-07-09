<template>
  <div>
    <SettingsTabs />
    <div class="card card-style anim-fade-in">
      <div class="content">
        <h2>Change your settings</h2>
        <h5 class="text-yellow">Server : {{ server }} Name : {{ name }}</h5>
        <!-- <h5>Be carefull, you can not change your nickname more than one time per month and/or 2 days after starting a fight</h5> -->
        <form class="form" @submit.prevent="handleSubmit">
          <p>Nickname</p>
          <input class="input input-primary mb-2" v-model="nickname" maxlength="32" :placeholder="user.nickname"
            v-lowercase />
          <p>Profile picture</p>
          <input class="input input-primary mb-4" v-model="picture" type="url" :placeholder="user.picture" />
          <button class="btn btn-xxs gradient-highlight" type="submit" :disabled="isLoading">
            <SmallLoading v-if="isLoading" />
            <span v-else>Edit</span>
          </button>
        </form>
        <a @click.prevent="alert.isActive ? stop_alerts(alert) : activate_alerts(alert)" v-for="alert in alerts"
          :key="alert.id">
          <div v-if="alert.isActive" class="iconfont icon-mute">Stop alerts on incoming Attacks</div>
          <div v-else class="iconfont icon-unmute">Activate alerts on incoming Attacks</div>
        </a>
        <div class="mt-3">
          Use this button if you have any issue with loading, deleting squads.
          <button class="btn btn-xxs gradient-red" @click="deleteFavCompo()">Delete Fav
            Squads</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      tonConnectUI: null,
      isLoading: false,
      nickname: null,
      picture: null,
      wallet: null,
      alerts: [
        {
          id: 'alert',
          name: 'Attack',
          isActive: localStorage.getItem('attack_alert') || false,
        },
      ],
    };
  },
 
  computed: {
    server() {
      return this.$store.state.game.server.number;
    },
    name() {
      return this.$store.state.game.server.name;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    lastUpdate() {
      return new Date(
        Date.parse(this.$store.state.game.user.user.last_profile_update),
      ).toLocaleString();
    },

  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      this.isLoading = true;
      let nick = '';
      if (this.nickname) nick = this.nickname.trim().toLowerCase();
      else nick = '';
      if (!this.picture) this.picture = this.user.picture;
      const payload = {
        nickname: nick,
        picture: this.picture.trim(),
        type: 'edit-profile',
      };
      this.send(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to edit profile' });
          console.error('Failed to edit profile', e);
          this.isLoading = false;
        });
    },
    activate_alerts(alert) {
      localStorage.setItem('attack_alert', true);
      alert.isActive = true; // eslint-disable-line no-param-reassign
    },
    stop_alerts(alert) {
      localStorage.setItem('attack_alert', false);
      alert.isActive = false; // eslint-disable-line no-param-reassign
    },
    deleteFavCompo() {
      localStorage.removeItem('fav_combi');
    }
  },
};
</script>

<style scoped lang="less"></style>
