<template>
  <div>
    <div v-if="!users || !users.length">
      <Loading />
    </div>
    <div v-else class="card card-style mx-0">
      <div class="content mx-0 mb-0">
        <div class="table-responsive">
          <table class="table color-theme mb-2">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th scope="col">Prod/Day</th>
                <th scope="col">Reward</th>
              </tr>
            </thead>
            <tbody>
              <Player board="prod" class="leaders" v-for="(user, key) in users" :player="user" :key="user.username"
                :rank="key + currentRank + 1" :reward="50">
              </Player>

            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <Paginate class="mx-auto pagination" :page-count="Math.ceil(count / 50)" :page-range="3" :margin-pages="2"
        :click-handler="load_leaders" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"
        :page-class="'page-item fight'"
        :page-link-class="'page-link rounded-xs color-white  bg-theme shadow-l border-0'"></Paginate>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      users: [],
      count: 0,
      currentRank: 0,
    };
  },
  created() {
    this.isLoading = true;
    this.load_leaders(1);
  },

  methods: {

    load_leaders(start) {
      this.users = [];
      this.currentRank = (start - 1) * 50;
      let end = 50;
      end = start * 50;
      start = end - 50; // eslint-disable-line no-param-reassign
      const params = { start, end };
      client.requestAsync('get_props', params).then(result => {
        this.users = result.players;
        this.count = result.count[0]['COUNT(*)'];
        this.isLoading = false;
      });
    },
  },
};
</script>
