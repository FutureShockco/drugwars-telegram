<template>
  <div>
    <div class="p-4 text-center mt-6" v-if="isLoading || users.length === 0">
      <Loading />
    </div>
    <div v-else class="card card-style mx-0">
      <div class="content mx-0 mb-0">
        <div class="table">
          <table class="table color-theme mb-2">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th scope="col">Killed pop.</th>
                <th scope="col">Reward</th>
              </tr>
            </thead>
            <tbody>
              <div class="mb-4">
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
    client.requestAsync('get_fightboard', null).then(result => {
      this.users = result.players;
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
.revolver_part::before {
  background: #0f1117;
}

.revolver_part:after {
  background: #0f1117;
}
</style>