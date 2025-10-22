<template>
  <div>
    <GangsTabs />
    <div class="anim-fade-in">
      <!-- Header Card -->
      <div class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content">
          <div class="d-flex">
            <div>
              <h6 class="mb-n1 opacity-80 color-highlight">Gang Directory</h6>
              <h3>Available Gangs</h3>
            </div>
            <div class="align-self-center ms-auto">
              <i class="fad fa-users font-24 color-blue-dark"></i>
            </div>
          </div>
          <p class="mb-0">Browse and join existing gangs or create your own criminal organization.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
        <div class="content text-center">
          <Loading />
        </div>
      </div>

      <!-- Gangs List -->
      <div v-else>
        <!-- Individual Gang Cards -->
        <div 
          v-for="gang in gangs" 
          :key="gang.gang" 
          class="card mx-0 border-bottom-highlight mb-1 anim-fade-in"
        >
          <div class="content">
            <div class="d-flex">
              <div class="d-flex align-items-center">
                <GangImage 
                  v-if="gang.image" 
                  class="me-3" 
                  size="50" 
                  :image="gang.image" 
                />
                <div v-else class="me-3 d-flex align-items-center justify-content-center" 
                     style="width: 50px; height: 50px; background: #333; border-radius: 8px;">
                  <i class="fad fa-users font-20 color-highlight"></i>
                </div>
                <div>
                  <h6 class="mb-n1 opacity-80 color-highlight">
                    Level {{ gang.lvl || 0 }} Gang
                  </h6>
                  <h4 class="mb-1">
                    <router-link 
                      :to="`/gangs/gang/${gang.gang}`" 
                      class="text-decoration-none"
                    >
                      {{ gang.name || gang.gang }}
                    </router-link>
                  </h4>
                  <div class="d-flex align-items-center">
                    <span class="badge bg-primary me-2">[{{ gang.ticker }}]</span>
                    <span class="small opacity-80">
                      <i class="fad fa-user-friends me-1"></i>
                      {{ gang.size - 1 | amount }}/100 members
                    </span>
                  </div>
                </div>
              </div>
              <div class="align-self-center ms-auto">
                <router-link 
                  :to="`/gangs/gang/${gang.gang}`"
                  class="btn btn-sm gradient-blue text-uppercase font-600"
                >
                  <i class="fad fa-eye me-1"></i>View
                </router-link>
              </div>
            </div>
            
            <div v-if="gang.about" class="mt-3">
              <p class="mb-0 opacity-90">{{ gang.about }}</p>
            </div>

            <!-- Gang Stats -->
            <div class="row mt-3">
              <div class="col-4 text-center">
                <h6 class="mb-1 color-highlight">Level</h6>
                <div class="font-weight-bold">{{ gang.lvl || 0 }}</div>
              </div>
              <div class="col-4 text-center border-start border-end">
                <h6 class="mb-1 color-highlight">Members</h6>
                <div class="font-weight-bold">{{ gang.size - 1 | amount }}</div>
              </div>
              <div class="col-4 text-center">
                <h6 class="mb-1 color-highlight">Capacity</h6>
                <div class="font-weight-bold">100</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!gangs || gangs.length === 0" class="card mx-0 border-bottom-highlight mb-1 anim-fade-in">
          <div class="content text-center">
            <div class="py-4">
              <i class="fad fa-users font-48 color-gray mb-3"></i>
              <h4>No Gangs Available</h4>
              <p class="mb-3">There are currently no gangs to display. Be the first to create one!</p>
              <router-link 
                to="/gangs/create" 
                class="btn gradient-green text-uppercase font-600"
              >
                <i class="fad fa-plus me-2"></i>Create Gang
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { orderBy } from 'lodash';

export default {
  data() {
    return {
      isLoading: false,
      gangs: [],
    };
  },
  created() {
    this.isLoading = true;
    client.requestAsync('get_gangs', null).then(result => {
      const gangs = result;
      const all = [];
      gangs.forEach(element => {
        if (element.lvl === null) {
          element.lvl = 0; // eslint-disable-line no-param-reassign
        }
        all.push(element);
      });
      this.gangs = orderBy(all, 'lvl', 'desc');
      this.isLoading = false;
    });
  },
};
</script>
