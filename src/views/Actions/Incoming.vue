<template>
  <div>
    <ActionsTabs />

    <div>
      <div class="fight" v-for="fight in fights" :key="fight.fight_key || fight.transport_key">
        <ActionsFight v-if="fight.type === 'fight'" :fight="fight" />
        <ActionsTransport v-if="fight.type === 'transport'" :fight="fight" />
      </div>
      <p v-if="!fights || !fights.length">
        <Loading />
      </p>
    </div>
    <div class="d-flex">
    <Paginate class="mx-auto pagination" :page-count="Math.ceil(inc / 25)" :page-range="3" :margin-pages="2"
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
      return orderBy(this.$store.state.game.inc_fights, 'end_date', 'desc');
    },
    inc() {
      if (this.$store.state.game.fights_count) return this.$store.state.game.fights_count.all;
      return 0;
    },
  },
  methods: {
    ...mapActions(['init', 'notify', 'refresh_inc_fights']),
    load_fights(start) {
      let end = 25;
      end = start * 25;
      start = end - 25; // eslint-disable-line no-param-reassign
      this.refresh_inc_fights({ start, end })
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

<style lang="less">
.pagination {
  margin-left: auto;
  margin-right: auto;
  display: -webkit-inline-box;
  list-style: none;

  a,
  span,
  em {
    background-color: #8080803b !important;
  }
}

li .disabled {
  background-color: #8080803b !important;
  color: #000000 !important;

  .pagination a {
    color: #000000 !important;
  }
}

.pagination a,
.pagination span,
.pagination em {
  background-color: #8080803b !important;
  color: #fbbd08;
  background: #1c1c1c !important;
  border: 1px solid #3e3e3e;
}

.pagination .gap,
.pagination .disabled,
.pagination .gap:hover,
.pagination .disabled:hover {
  color: #d1d5da;
  cursor: default;
  background-color: #8080803b !important;
}

.pagination a:hover,
.pagination a:focus,
.pagination span:hover,
.pagination span:focus,
.pagination em:hover,
.pagination em:focus {
  border: 1px solid #fbbd08;
}
</style>
