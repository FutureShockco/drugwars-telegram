<template>
  <div>
    <RewardsTabs />
    <div class="card">
      <div>
        <TransitionGroup class="row" v-if="topcat === 'all'" name="list">
          <!-- <li class="col-12">
            <div @click="f = 'Introduction'" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23"
              style="height:150px">
              <div class="card-bottom p-3">
                <span class="color-white font-12 pe-3 mb-n1 opacity-60">Introduction</span>
                <h2 class="color-white">General</h2>
              </div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </li> -->
          <div class="col-6 mb-3" v-for="(item, index) in guide" :key="index">
            <div @click="subcat = null, topcat = item.title"
              class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23" style="height:150px"
              :style="`background-image:url(/img/tasks/${item.bg}.jpg`">
              <div class="card-bottom p-3">
                <span class="color-white font-12 pe-3 mb-n1 opacity-60">{{ item.category }}</span>
                <h2 class="color-white"> {{ item.title }} </h2>
              </div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </div>
          <!-- <li class="col-6">
            <div @click="f = 'Appearance'" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23"
              style="height:150px">
              <div class="card-bottom p-3">
                <span class="color-white font-12 pe-3 mb-n1 opacity-60">Gameplay</span>
                <h2 class="color-white">Buildings</h2>
              </div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </li>
          <li class="col-6">
            <div @click="f = 'Appearance'" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23"
              style="height:150px">
              <div class="card-bottom p-3">
                <span class="color-white font-12 pe-3 mb-n1 opacity-60">Gameplay</span>
                <h2 class="color-white">Units</h2>
              </div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </li>
          <li class="col-6">
            <div @click="f = 'Appearance'" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23"
              style="height:150px">
              <div class="card-bottom p-3">
                <span class="color-white font-12 pe-3 mb-n1 opacity-60">Gameplay</span>
                <h2 class="color-white">Trainings</h2>
              </div>
              <div class="card-overlay bg-gradient-fade rounded-0"></div>
            </div>
          </li> -->
        </TransitionGroup>
        <div v-else-if="subcat" @click="subcat = null"
          class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23" style="height:auto"
          :style="`background-image:url(/img/tasks/${currentCat.bg}.jpg`">
          <div class="card-bottom p-3">
            <span class="color-white font-12 pe-3 mb-n1 opacity-60">{{ currentCat.category }}</span>
            <h2 class="color-white"> Go back </h2>
          </div>
          <div class="card mx-0 mt-2">
            <h5 class="color-highlight font-12 mb-n1">{{ currentCat.text }}</h5>
          </div>
          <div class="card-overlay bg-gradient-fade rounded-0"></div>
        </div>
        <div v-else @click="topcat = 'all'" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23"
          style="height:150px" :style="`background-image:url(/img/tasks/${currentCat.bg}.jpg`">
          <div class="card-bottom p-3">
            <span class="color-white font-12 pe-3 mb-n1 opacity-60">{{ currentCat.category }}</span>
            <h2 class="color-white"> Go back </h2>
          </div>
          <div class="card-overlay bg-gradient-fade rounded-0"></div>
        </div>

      </div>
      <div v-if="subcat && filteredSub" >
        <div class="card card-style">
          <div class="card card-style mx-0 shadow-card shadow-card-l rounded-0 mb-2"
            style=" height:150px;"  :style="`background-image:url(/img/tasks/${filteredSub.bg}.jpg`">
            <div class="card-top p-3">
              <a href="#" class="btn btn-xs bg-white color-black font-700 font-11 float-end">{{ currentCat.category }}</a>
            </div>
          </div>
          <div class="content mx-0 mt-2">
            <h5 class="color-highlight font-12 mb-n1">{{ filteredSub.category }}</h5>
            <h4>{{ filteredSub.title }}</h4>
            <p>
              {{ filteredSub.text }}
            </p>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.title ==='Production Banner'">
              <Balances class="header-bar header-fixed d-block w-100 text-center d-block" style="pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='General Menu' && filteredSub.title ==='Home'">
              <RewardsTabs style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='General Menu' && filteredSub.title ==='Camp'">
              <BootcampTabs style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='General Menu' && filteredSub.title ==='Fight'">
              <ActionsTabs style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='General Menu' && filteredSub.title ==='HQ'">
              <BuildingsTabs style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='Rewards' && filteredSub.title ==='Daily Rewards'">
              <LeaderboardsProduction style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='Rewards' && filteredSub.title ==='Pablo Selling'">
              <LeaderboardsPablo style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.category ==='Rewards' && filteredSub.title ==='Fight Board'">
              <LeaderboardsFight style="position: relative!important;pointer-events: none;"/>
            </div>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.tip">
              <h6 class="text-yellow p-2"> TIP: {{ filteredSub.tip }}</h6>
            </div>
              <div v-if="description" v-for="desc in description" >
             <h5> {{ desc.title }}</h5>
             <p>  {{ desc.text }}</p>
            </div>
           
          </div>
        </div>
      </div>
      <TransitionGroup v-else class="row" name="slide">

        <div class="col-6" v-for="(item, index) in filtered.categories" :key="index">
          <div @click="subcat = item.title" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0"
            style="height:150px" :style="`background-image:url(/img/tasks/${item.bg}.jpg`">
            <div class="card-bottom p-3">
              <span class="color-white font-12 pe-3 mb-n1 opacity-60">{{ item.category }}</span>
              <h2 class="color-white"> {{ item.title }} </h2>
            </div>
            <div class="card-overlay bg-gradient-fade rounded-0"></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import guide from '@/../guide.json';


export default {
  data() {
    return {
      topcat: "all",
      subcat: null,
      guide
    }
  },
  mounted() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const el = document.querySelector(this.getAttribute('href'));
        const y = el.getBoundingClientRect().top + window.pageYOffset + 200;

        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  },
  computed: {
    filtered() {
      if (this.topcat === 'all')
        return []
      return guide.find(q =>
        q.title === this.topcat
      );
    },
    filteredSub() {
      return this.filtered.categories.find(q =>
        q.title === this.subcat
      );
    },
    description() {
      if(this.filteredSub && this.filteredSub.description)
      return this.filteredSub.description
    return[]
    },
    currentCat() {
      return guide.find(q =>
        q.title === this.topcat
      );
    },
  },
};
</script>

<style scoped class="less">
.help {
  font-size: 18px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }

  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(20px);
  }
}
</style>
