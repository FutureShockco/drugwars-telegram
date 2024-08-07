<template>
    <div class="accordion border-0 accordion-s" id="accordion-group-6">
          <div >
            <UiButton class="accordion-button px-0" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#accordion6-' + index" aria-expanded="true">
              <h3>{{ title }}</h3>
              <i class="bi bi-plus font-20"></i>
            </UiButton>
            <div :id="'accordion6-' + index"  class="accordion-collapse show collapse"
              data-bs-parent="#accordion-group-6" style="">
              <p class="pb-3 opacity-60">
                {{ text }}
              </p>
            </div>
            <div class="accordion-item" v-for="(q, index) in categories" :key="q.key">
            <UiButton class="accordion-button px-0" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#accordion6-' + q.key" aria-expanded="true">
              <h4>{{ q.title }}</h4>
              <i class="bi bi-plus font-20"></i>
            </UiButton>
            <div :id="'accordion6-' + q.key" class="accordion-collapse collapse"
              data-bs-parent="#accordion-group-6" style="">
              <p class="pb-3 opacity-60">
                {{ q.text }}
              </p>
            </div>
          </div>
          </div>
        </div>
</template>

<script>
export default {
  props: ['title', 'text', 'key', "categories"]
};
</script>