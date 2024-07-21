<template>
  <div>
    <RewardsTabs />
    <div class="card card-style">
      <div class="content">
        <div class="accordion border-0 accordion-s" id="accordion-group-6">
          <div class="accordion-item" v-for="(q, index) in faq" :key="faq">
            <UiButton class="accordion-button px-0" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#accordion6-' + index" aria-expanded="true">
              <h3>{{ q.q }}</h3>
              <i class="bi bi-plus font-20"></i>
            </UiButton>
            <div :id="'accordion6-' + index" :class="index === 0 ? 'show' : ''" class="accordion-collapse collapse"
              data-bs-parent="#accordion-group-6" style="">
              <p class="pb-3 opacity-60">
                {{ q.a }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faq from '@/../faq.json';
import Rewards from '../Rewards.vue';

export default {
  data() {
    return {
      q: '',
    };
  },
  computed: {
    faq() {
      return faq.filter(q =>
        JSON.stringify(q)
          .toLowerCase()
          .includes(this.q.toLowerCase()),
      );
    },
  },
};
</script>

<style scoped class="less">
.help {
  font-size: 18px;
}
</style>
