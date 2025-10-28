<template>
  <div>
    <GangsTabs />
    <div class="anim-fade-in">
      <!-- Loading State -->
      <div v-if="isInit" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content text-center">
          <Loading />
        </div>
      </div>

      <div v-else>
        <!-- Gang Header Card -->
        <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div class="d-flex align-items-center">
                <GangImage 
                  v-if="gang && gang.image" 
                  class="me-3" 
                  size="80" 
                  :image="gang.image" 
                />
                <div v-else class="me-3 d-flex align-items-center justify-content-center" 
                     style="width: 80px; height: 80px; background: #333; border-radius: 12px;">
                  <i class="fad fa-users font-32 color-highlight"></i>
                </div>
                <div>
                  <h6 class="mb-n1 opacity-80 color-highlight">Gang Profile</h6>
                  <h2 class="mb-1">{{ (gang && gang.name) || (gang && gang.gang) }}</h2>
                  <div class="d-flex align-items-center">
                    <span class="badge bg-primary me-2" v-if="gang && gang.ticker">[{{ gang.ticker }}]</span>
                  </div>
                </div>
              </div>
              <div class="align-self-center ms-auto">
                <router-link
                  v-if="isBoss"
                  :to="`/gangs/gang/${gang.gang}/settings`"
                  class="btn btn-sm gradient-blue text-uppercase font-600"
                >
                  <i class="fad fa-cog me-1"></i>Settings
                </router-link>
              </div>
            </div>
            
            <div v-if="gang && gang.about" class="mt-3">
              <p class="mb-0">{{ gang.about }}</p>
            </div>
          </div>
        </div>

        <!-- Pending Applications Card -->
        <div
          v-if="user.gang === id && ['boss', 'capo'].includes(user.role) && applies && applies.length > 0"
          class="card mx-0 border-bottom-highlight mb-1 anim-fade-in"
        >
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Management</h6>
                <h3>Pending Applications</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-clock font-24 color-yellow-dark"></i>
              </div>
            </div>
            
            <div class="mt-3">
              <div
                v-for="apply in applies"
                :key="apply.username"
                class="border rounded p-3 mb-3"
              >
                <div class="d-flex align-items-center mb-2">
                  <Avatar :username="apply.nickname" size="40" class="me-3" />
                  <div class="flex-grow-1">
                    <h5 class="mb-0">{{ apply.nickname }}</h5>
                    <small class="opacity-80">Applying as Soldier</small>
                  </div>
                  <div class="d-flex gap-2">
                    <UiButton
                      @click="handleApprove(apply.username)"
                      class="btn btn-sm gradient-green"
                      :disabled="isLoading"
                    >
                      <SmallLoading v-if="isLoading" />
                      <span v-else><i class="fad fa-check me-1"></i>Approve</span>
                    </UiButton>
                    <UiButton
                      @click="handleReject(apply.username)"
                      class="btn btn-sm gradient-red"
                      :disabled="isLoading"
                    >
                      <SmallLoading v-if="isLoading" />
                      <span v-else><i class="fad fa-times me-1"></i>Reject</span>
                    </UiButton>
                  </div>
                </div>
                <div v-if="apply.message" class="bg-dark p-2 rounded">
                  <small>{{ apply.message }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Form Card -->
        <div
          v-if="!user.gang && user.gang !== id && gang && gang.is_stable === 1"
          class="card mx-0 border-bottom-highlight mb-1 anim-fade-in"
        >
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Join Gang</h6>
                <h3>Apply as Soldier</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-user-plus font-24 color-green-dark"></i>
              </div>
            </div>
            
            <form class="mt-3" @submit.prevent="handleSubmit">
              <div class="mb-3">
                <h5 class="mb-2">Application Message</h5>
                <p class="mb-2 opacity-80">Optional message to the gang leadership</p>
                <textarea
                  class="form-control"
                  placeholder="Tell them why you want to join their gang..."
                  v-model="message"
                  maxlength="280"
                  rows="4"
                ></textarea>
                <small class="text-muted">{{ (message && message.length) || 0 }}/280 characters</small>
              </div>
              
              <UiButton 
                type="submit" 
                class="btn w-100 btn-l gradient-green text-uppercase font-600" 
                :disabled="isLoading"
              >
                <SmallLoading v-if="isLoading" />
                <span v-else><i class="fad fa-paper-plane me-2"></i>Send Application</span>
              </UiButton>
            </form>
          </div>
        </div>

        <!-- Members Card -->
        <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Gang Roster</h6>
                <h3>Members</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-users font-24 color-blue-dark"></i>
              </div>
            </div>

            <!-- Activity Legend for Leaders -->
            <div v-if="isBoss || isCapo" class="mt-3 mb-3">
              <h5 class="mb-2">Activity Status</h5>
              <div class="d-flex flex-wrap gap-3">
                <span class="badge bg-success">
                  <i class="fad fa-circle me-1"></i>Active Today
                </span>
                <span class="badge bg-warning">
                  <i class="fad fa-circle me-1"></i>Active This Month
                </span>
                <span class="badge bg-danger">
                  <i class="fad fa-circle me-1"></i>Inactive
                </span>
              </div>
            </div>

            <!-- Members List -->
            <div v-if="members && members.length > 0" class="mt-3">
              <GangMember
                v-for="member in members"
                :key="member.nickname"
                :member="member"
                :id="id"
                class="border-bottom py-3"
              />
            </div>
            
            <!-- Empty Members State -->
            <div v-else class="text-center py-4">
              <i class="fad fa-user-slash font-32 color-gray mb-2"></i>
              <p class="mb-0">No members found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Promise from 'bluebird';
import client from '@/helpers/client';

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      members: null,
      message: null,
      user: this.$store.state.game.user.user,
      applies: null,
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
  created() {
    this.isInit = true;
    const promises = [
      client.requestAsync('get_gang', this.id),
      client.requestAsync('get_gang_members', this.id),
    ];
    if (['boss', 'capo'].includes(this.user.role)) {
      promises.push(client.requestAsync('get_gang_applies', this.id));
    }
    Promise.all(promises).then(result => {
      console.log('Fetched gang data', result);
      [[this.gang], this.members, this.applies] = result;
      this.isInit = false;
    });
  },
  methods: {
    ...mapActions(['send', 'notify']),
    resetForm() {
      this.message = null;
    },
    handleSubmit() {
      const self = this;
      this.isLoading = true;
      const payload = { gang: this.id, type: 'gang-soldier-apply' };
      if (this.message) payload.message = this.message;
      this.send(payload)
        .then(() => {
          self.isLoading = false;
          this.resetForm();
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to apply as soldier' });
          console.error('Failed to apply as soldier', e);
          this.isLoading = false;
        });
    },
    handleApprove(soldier) {
      const self = this;
      this.isLoading = true;
      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-approve-soldier',
      };

      this.send(payload)
        .then(() => {
          setTimeout(() => {
            const promises = [
              client.requestAsync('get_gang', self.id),
              client.requestAsync('get_gang_members', self.id),
            ];
            if (['boss', 'capo'].includes(self.user.role)) {
              promises.push(client.requestAsync('get_gang_applies', self.id));
            }
            Promise.all(promises).then(result => {
              [[self.gang], self.members, self.applies] = result;
              self.isLoading = false;
            });
          }, 3000);
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to approve soldier' });
          console.error('Failed to approve soldier', e);
          this.isLoading = false;
        });
    },
    handleReject(soldier) {
      const self = this;

      this.isLoading = true;

      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-reject-soldier',
      };

      this.send(payload)
        .then(() => {
          setTimeout(() => {
            const promises = [
              client.requestAsync('get_gang', self.id),
              client.requestAsync('get_gang_members', self.id),
            ];
            if (['boss', 'capo'].includes(self.user.role)) {
              promises.push(client.requestAsync('get_gang_applies', self.id));
            }
            Promise.all(promises).then(result => {
              [[self.gang], self.members, self.applies] = result;
              self.isLoading = false;
            });
          }, 3000);
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to reject candidate' });
          console.error('Failed to reject candidate', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
