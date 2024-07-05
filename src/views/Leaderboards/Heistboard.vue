<template>
  <div>
    <LeaderboardsTabs />
    <div class="card overflow-visible card-style">
      <div class="content mb-0">
        <h4>Heist Board</h4>
        <p>
          Daily reset.
        </p>
        <div class="table-responsive">
          <table class="table color-theme mb-2">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th scope="col">Info</th>
                <th scope="col">Deposit</th>
                <th scope="col">Reward</th>
                <th scope="col">Bonus</th>
              </tr>
            </thead>
            <tbody>

              <div class="p-4 text-center mt-6" v-if="isLoading || users.length === 0">
                <Loading />
              </div>

              <div class="mb-4" v-else>
                <Player v-for="(user, key) in users" :player="user" :key="user.username" :rank="key + 1" />
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      users: [],
    };
  },
  created() {
    this.isLoading = true;
    client.requestAsync('get_heistboard', null).then(result => {
      this.users = result.players;
      this.isLoading = false;
    });
  },
};
</script>
