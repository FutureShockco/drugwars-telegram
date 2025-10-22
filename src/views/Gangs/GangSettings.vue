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
        <!-- Header Card -->
        <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Gang Management</h6>
                <h3>{{ gang.name || gang.gang }} Settings</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-cogs font-24 color-blue-dark"></i>
              </div>
            </div>
            <p class="mb-0">Configure your gang's public information and appearance.</p>
          </div>
        </div>

        <!-- Gang Information Form Card -->
        <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Gang Profile</h6>
                <h3>Basic Information</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-edit font-24 color-green-dark"></i>
              </div>
            </div>
            
            <form class="mt-3" @submit.prevent="handleSubmit">
              <div class="mb-3">
                <h5 class="mb-2">Gang Name</h5>
                <p class="mb-2 opacity-80">The display name for your gang (maximum 32 characters)</p>
                <input 
                  class="form-control" 
                  placeholder="Enter gang name" 
                  v-model="name" 
                  maxlength="32"
                />
                <small class="text-muted">{{ (name && name.length) || 0 }}/32 characters</small>
              </div>

              <div class="mb-3">
                <h5 class="mb-2">Gang Logo</h5>
                <p class="mb-2 opacity-80">Image URL for your gang's logo (optional)</p>
                <input 
                  class="form-control" 
                  placeholder="https://example.com/logo.png" 
                  v-model="image" 
                  type="url"
                />
                <small class="text-muted">Must be a valid URL to an image</small>
              </div>

              <div class="mb-3">
                <h5 class="mb-2">Website</h5>
                <p class="mb-2 opacity-80">Official website or social media link (optional)</p>
                <input 
                  class="form-control" 
                  placeholder="https://example.com" 
                  v-model="website" 
                  type="url"
                />
              </div>

              <div class="mb-4">
                <h5 class="mb-2">Description</h5>
                <p class="mb-2 opacity-80">Brief description of your gang (maximum 280 characters)</p>
                <textarea 
                  class="form-control" 
                  placeholder="Tell other players about your gang..." 
                  v-model="about" 
                  maxlength="280"
                  rows="4"
                ></textarea>
                <small class="text-muted">{{ (about && about.length) || 0 }}/280 characters</small>
              </div>

              <UiButton 
                type="submit" 
                class="btn w-100 btn-l gradient-green text-uppercase font-600" 
                :disabled="isLoading"
              >
                <SmallLoading v-if="isLoading" />
                <span v-else><i class="fad fa-save me-2"></i>Update Settings</span>
              </UiButton>
            </form>
          </div>
        </div>

        <!-- Preview Card -->
        <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Live Preview</h6>
                <h3>How it will look</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-eye font-24 color-purple-dark"></i>
              </div>
            </div>
            
            <div class="mt-3 border rounded p-3 bg-dark">
              <div class="d-flex align-items-center">
                <div 
                  v-if="image" 
                  class="me-3"
                  style="width: 50px; height: 50px; background-size: cover; background-position: center; border-radius: 8px;"
                  :style="{ backgroundImage: `url(${image})` }"
                ></div>
                <div v-else class="me-3 d-flex align-items-center justify-content-center" 
                     style="width: 50px; height: 50px; background: #333; border-radius: 8px;">
                  <i class="fad fa-users font-20 color-highlight"></i>
                </div>
                <div>
                  <h5 class="mb-1">{{ name || gang.gang || 'Gang Name' }}</h5>
                  <span class="badge bg-primary">[{{ gang.ticker }}]</span>
                </div>
              </div>
              
              <div v-if="about" class="mt-3">
                <p class="mb-0 opacity-90">{{ about }}</p>
              </div>
              
              <div v-if="website" class="mt-2">
                <small class="opacity-80">
                  <i class="fad fa-link me-1"></i>{{ website }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Access Control Notice -->
        <div v-if="!isBoss" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content">
            <div class="d-flex">
              <div>
                <h6 class="mb-n1 opacity-80 color-highlight">Access Denied</h6>
                <h3>Boss Only</h3>
              </div>
              <div class="align-self-center ms-auto">
                <i class="fad fa-lock font-24 color-red-dark"></i>
              </div>
            </div>
            <p class="mb-0">Only the gang boss can modify these settings.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      name: null,
      image: null,
      website: null,
      about: null,
      user: this.$store.state.game.user.user,
    };
  },
  computed: {
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
  },
  created() {
    this.isInit = true;
    client.requestAsync('get_gang', this.id).then(result => {
      [this.gang] = result;
      this.name = result[0].name;
      this.image = result[0].image;
      this.website = result[0].website;
      this.about = result[0].about;
      this.isInit = false;
    });
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      this.isLoading = true;

      const settings = {};
      settings.name = this.name ? this.name : '';
      settings.image = this.image ? this.image : '';
      settings.website = this.website ? this.website : '';
      settings.about = this.about ? this.about : '';

      const payload = { gang: this.id, settings, type: 'gang-update' };
      console.log('Submitting gang settings update', payload);
      this.send(payload)
        .then(() => {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `Settings successfully updated`,
          });
        })
        .catch(e => {
          console.error('Failed to update settings', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
