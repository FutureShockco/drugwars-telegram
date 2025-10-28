<template>
  <div class="gang-member-card p-3 border rounded mb-2">
    <div class="d-flex align-items-center">
      <!-- Member Info Section -->
      <div class="flex-grow-1">
        <div class="d-flex align-items-center mb-2">
          <div class="member-avatar me-3">
            <Avatar :username="member.nickname" :picture="member.picture" size="50" />
          </div>
          <div>
            <h5 class="mb-0">
              <router-link :to="`/actions?type=attack&nickname=${member.nickname}`" class="text-decoration-none">
                {{ member.nickname }}
              </router-link>
            </h5>
            <div class="d-flex align-items-center">
              <span class="badge me-2" :class="getRoleBadgeClass(member.role)">
                <i :class="getRoleIcon(member.role)" class="me-1"></i>
                {{ member.role }}
              </span>
              <span v-if="isCapo || isBoss" class="activity-indicator">
                <i :class="'fad fa-circle ' + isActive(member.active)" class="me-1"></i>
                <small class="opacity-80">{{ getActivityText(member.active) }}</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons Section -->
      <div class="member-actions d-flex flex-wrap gap-2 ">
        <!-- Leave Gang Button (for current user, non-boss) -->
        <UiButton v-if="member.nickname === user.nickname && !isBoss" @click="handleLeave()"
          class="btn btn-sm gradient-red" :disabled="isLoading">
          <SmallLoading v-if="isLoading" />
          <span v-else><i class="fad fa-sign-out-alt me-1"></i>Leave</span>
        </UiButton>

        <!-- Boss Actions -->
        <template v-if="isBoss && member.nickname !== user.nickname">
          <!-- Promote to Capo -->
          <UiButton v-if="member.role === 'soldier'" @click="handleAddCapo(member.nickname)"
            class="btn btn-sm gradient-green" :disabled="isLoadingCapo">
            <SmallLoading v-if="isLoadingCapo" />
            <span v-else><i class="fad fa-arrow-up me-1"></i>Promote</span>
          </UiButton>

          <!-- Demote Capo -->
          <UiButton v-if="member.role === 'capo'" @click="handleDemoteCapo(member.nickname)"
            class="btn btn-sm gradient-orange" :disabled="isLoadingDemoteCapo">
            <SmallLoading v-if="isLoadingDemoteCapo" />
            <span v-else><i class="fad fa-arrow-down me-1"></i>Demote</span>
          </UiButton>


          <!-- Kick Member -->
          <UiButton @click="handleKick(member.nickname)" class="btn btn-sm gradient-red" :disabled="isLoading">
            <SmallLoading v-if="isLoading" />
            <span v-else><i class="fad fa-user-times me-1"></i>Kick</span>
          </UiButton>
        </template>

        <!-- Boss Self (cannot be kicked) -->
        <template v-if="isBoss && member.nickname === user.nickname">
          <span class="badge bg-warning">
            <i class="fad fa-crown me-1"></i>Gang Leader
          </span>
        </template>

        <!-- Attack Action (for other members) -->
        <router-link v-if="member.nickname !== user.nickname && member.gang !== user.gang" :to="`/actions?type=attack&nickname=${member.nickname}`"
          class="btn btn-sm gradient-red text-decoration-none">
          <i class="fad fa-sword me-1"></i>Attack
        </router-link>

        <!-- Give Boss Role -->
        <UiButton v-if="member.role === 'capo'" @click="handleSetBoss(member.nickname)" class="btn btn-sm gradient-blue"
          :disabled="isLoadingCapo">
          <SmallLoading v-if="isLoadingCapo" />
          <span v-else><i class="fad fa-crown me-1"></i>Make Boss</span>
        </UiButton>
      </div>



    </div>

    <!-- Additional Info Row -->
    <div v-if="(isCapo || isBoss) && member.nickname !== user.nickname" class="mt-2 pt-2 border-top">
      <div class="row text-center">
        <div class="col-4">
          <small class="text-muted d-block">Activity</small>
          <span :class="'badge ' + getActivityBadgeClass(member.active)">
            {{ getActivityText(member.active) }}
          </span>
        </div>
        <div class="col-4">
          <small class="text-muted d-block">Role</small>
          <span class="font-weight-bold">{{ member.role }}</span>
        </div>
        <div class="col-4">
          <small class="text-muted d-block">Fights (Last 24h)</small>
          <span class="font-weight-bold">{{ member.fights_24h }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  props: ['member', 'id'],
  data() {
    return {
      isLoading: false,
      isLoadingCapo: false,
      isLoadingDemoteCapo: false,
      gang: null,
      user: this.$store.state.game.user.user,
    };
  },
  computed: {
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
    isCapo() {
      return this.user.role === 'capo' && this.user.gang === this.id;
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    resetForm() {
      this.message = null;
    },
    getRoleBadgeClass(role) {
      switch (role) {
        case 'boss': return 'bg-warning text-dark';
        case 'capo': return 'bg-info';
        case 'soldier': return 'bg-secondary';
        default: return 'bg-secondary';
      }
    },
    getRoleIcon(role) {
      switch (role) {
        case 'boss': return 'fad fa-crown';
        case 'capo': return 'fad fa-star';
        case 'soldier': return 'fad fa-user';
        default: return 'fad fa-user';
      }
    },
    getActivityBadgeClass(activedate) {
      const activityClass = this.isActive(activedate);
      if (activityClass === 'text-green') return 'bg-success';
      if (activityClass === 'text-orange') return 'bg-warning';
      return 'bg-danger';
    },
    getActivityText(activedate) {
      const activityClass = this.isActive(activedate);
      if (activityClass === 'text-green') return 'Today';
      if (activityClass === 'text-orange') return 'This Month';
      return 'Inactive';
    },
    getActionCount() {
      // Placeholder for action count - could be expanded with real data
      return Math.floor(Math.random() * 10) + 1;
    },
    isActive(activedate) {
      if (!activedate) return 'text-red';

      const now = new Date();
      const activeTimestamp = new Date(activedate);

      // Check if active today
      const isToday =
        now.getUTCFullYear() === activeTimestamp.getUTCFullYear() &&
        now.getUTCMonth() === activeTimestamp.getUTCMonth() &&
        now.getUTCDate() === activeTimestamp.getUTCDate();

      if (isToday) return 'text-green';

      // Check if active this month
      const isThisMonth =
        now.getUTCFullYear() === activeTimestamp.getUTCFullYear() &&
        now.getUTCMonth() === activeTimestamp.getUTCMonth();

      if (isThisMonth) return 'text-orange';

      return 'text-red';
    },
    handleKick(soldier) {
      this.isLoading = true;
      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-kick-soldier',
      };
      this.send(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to kick member' });
          console.error('Failed to kick member', e);
          this.isLoading = false;
        });
    },
    handleAddCapo(capo) {
      this.isLoadingCapo = true;
      const payload = {
        gang: this.id,
        capo,
        type: 'gang-add-capo',
      };

      this.send(payload)
        .then(() => {
          this.isLoadingCapo = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to add capo' });
          console.error('Failed to add capo', e);
          this.isLoadingCapo = false;
        });
    },
    handleDemoteCapo(capo) {
      this.isLoadingDemoteCapo = true;
      const payload = {
        gang: this.id,
        capo,
        type: 'gang-demote-capo',
      };

      this.send(payload)
        .then(() => {
          this.isLoadingDemoteCapo = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to add capo' });
          console.error('Failed to add capo', e);
          this.isLoadingDemoteCapo = false;
        });
    },
    handleSetBoss(capo) {
      this.isLoadingCapo = true;
      const payload = {
        gang: this.id,
        capo,
        type: 'gang-set-boss',
      };

      this.send(payload)
        .then(() => {
          this.isLoadingCapo = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to add capo' });
          console.error('Failed to add capo', e);
          this.isLoadingCapo = false;
        });
    },
    handleLeave() {
      this.isLoading = true;
      const payload = {
        gang: this.id,
        username: this.user.username,
        type: 'gang-leave',
      };
      this.send(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to leave gang' });
          console.error('Failed to leave gang', e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.gang-member-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.gang-member-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.member-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.member-actions {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.activity-indicator {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .member-actions {
    margin-top: 1rem;
    justify-content: flex-start;
  }

  .gang-member-card {
    padding: 1rem;
  }
}
</style>
