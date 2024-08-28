<template>
  <div>
    <ActionsTabs />
    <!-- <div class="d-flex">
      <Paginate class="mx-auto pagination" :page-count="Math.ceil(sent / 25)" :page-range="3" :margin-pages="2"
        :click-handler="load_fights" :prev-text="'Previous'" :next-text="'Next'" :container-class="'pagination'"
        :page-class="'page-item fight'"
        :page-link-class="'page-link rounded-xs color-white  bg-theme shadow-l border-0'"></Paginate>

    </div> -->
    <div>
      <div class="page-item fight" v-for="fight in fights" :key="fight.fight_key || fight.transport_key">
        <ActionsFight v-if="fight.type === 'fight'" :fight="fight" />
        <ActionsTransport v-if="fight.type === 'transport'" :fight="fight" />
      </div>
      <p v-if="!fights || !fights.length">
        <Loading />
      </p>
    </div>
    <div class="d-flex">
      <Paginate class="mx-auto pagination" :page-count="Math.ceil(sent / 25)" :page-range="3" :margin-pages="2"
        :click-handler="load_fights" :prev-text="'Previous'" :next-text="'Next'" :container-class="'pagination'"
        :page-class="'page-item fight'"
        :page-link-class="'page-link rounded-xs color-white  bg-theme shadow-l border-0'"></Paginate>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Paginate from 'vuejs-paginate';
import { orderBy } from 'lodash';

export default {
  components: {
    Paginate,
  },
  created() {
    this.load_fights(1);
  },
  computed: {
    fights() {
      return orderBy(this.$store.state.game.sent_fights.actions, 'end_date', 'desc');
    },
    sent() {
      if (this.$store.state.game.sent_fights.actions) return this.$store.state.game.sent_fights.all;
      return 0;
    },
  },
  methods: {
    ...mapActions(['init', 'notify', 'refresh_sent_fights', 'force_sent_fights_refresh']),
    load_fights(start) {
      let end = 25;
      end = start * 25;
      start = end - 25; // eslint-disable-line no-param-reassign
      if (start === 0) {
        this.force_sent_fights_refresh(true);
      } else {
        this.force_sent_fights_refresh(false);
      }
      this.refresh_sent_fights({ start, end })
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
  },
};
</script>