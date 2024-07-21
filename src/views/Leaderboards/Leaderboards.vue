<template>
  <div>
    <LeaderboardsTabs />
    <div class="card overflow-visible card-style">
      <div class="content mb-0">
        <h4>Production Board</h4>
        <p>
          Yearly reset.
        </p>
        <div class="table-responsive">
          <table class="table color-theme mb-2">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th scope="col">Prod/Day</th>
                <th scope="col">Reward</th>
                <th scope="col">Bonus</th>
              </tr>
            </thead>
            <tbody>
              <Player class="leaders" v-for="(user, key) in users" :player="user" :key="user.username"
                :rank="key + currentRank + 1" :reward="50">
              </Player>
              <p v-if="!users || !users.length">
                <Loading />
              </p>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Paginate class="ml-6 mt-4 text-center width-full" :page-count="Math.ceil(count / 50)" :page-range="3"
      :margin-pages="2" :click-handler="load_leaders" :prev-text="'Prev'" :next-text="'Next'"
      :container-class="'pagination'" :page-class="'leaders'"></Paginate>
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

