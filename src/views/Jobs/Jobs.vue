<template>
  <div v-if="ownBase">
    <JobsTabs />
    <div class="text-center anim-fade-in">
      <h5 class="mt-2" v-if="jobleft > 0"> You can still start {{ jobleft }} job(s) today.</h5>
      <h5 class="mt-2 text-red" v-else> You have reached your daily limit of jobs.</h5>
      <div class="columns m-0" v-for="item in items" :key="item.id">
        <MissionCard :item="item" />
        <div class="columns m-0" v-for="job in ownJobs" :key="job.job + job.base">
          <div v-if="job.job === item.id">
            <div class="columns m-0" v-for="fight in fights" :key="fight.fight_key">
              <div v-if="job.territory === fight.target_territory && job.base === fight.target_base">
                <JobsFight :fight="fight" :job="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card card-style anim-fade-in">
    <div class="content">
      <h4 class="text-center">
        You must choose a location on the map first.
        <h2>
          <router-link :to="'/map/territory?location=' + rnd" class="text-yellow">Click here to choose a
            location.</router-link>
        </h2>
      </h4>
    </div>
  </div>
</template>

<script>
import { missions } from 'drugwars';
import { pickBy } from 'lodash';
import client from '@/helpers/client';

export default {
  data() {
    return {
      items: pickBy(missions, b => b.type === 'solo'),
      isLoading: false,
      user: this.$store.state.game.user.user,
      fights: null,
    };
  },
  created() {
    this.isLoading = true;
    this.load_jobs();
  },
  computed: {
    ownJobs() {
      return this.$store.state.game.user.jobs;
    },
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    jobleft() {
      const now = new Date();
      const day = now.getUTCDate();
      const month = now.getUTCMonth() + 1;
      const year = now.getUTCFullYear();
      const date = `${day}-${month}-${year}`;
      if (this.$store.state.game.user.user.active === date)
        return this.$store.state.game.user.user.tutorial;
      return 10;
    },
  },
  methods: {
    load_jobs() {
      client.requestAsync('get_sent_fights_npc', this.user.username).then(result => {
        this.fights = result;
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
