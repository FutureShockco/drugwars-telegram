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
              :style="`background-image:url(/img/guide/${item.bg}.png`">
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
        <div v-else-if="subcat" @click="subcat = null" class="card overflow-visible mt-4 mb-0 pb-0">
          <div class="row">
            <div class="col-3">
              <h2 class="ms-4 color-white"><i class="fad fa-undo" /> Back </h2>
            </div>
            <div class="col-9 text-right">
              <h5 class="color-highlight font-13 mb-0 me-4">{{ currentCat.category }}</h5>
              <h1 class="font-700 font-30 pb-2 me-4">{{ currentCat.title }}</h1>
            </div>
          </div>

        </div>
        <!-- <div v-else-if="subcat" @click="subcat = null"
          class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0 bg-23" style="height:auto"
          :style="`background-image:url(/img/guide/${currentCat.bg}.png`">
          <div class="card-bottom p-3">
            <span class="color-white font-12 pe-3 mb-n1 opacity-60">{{ currentCat.category }}</span>
            <h2 class="color-white"> Go back </h2>
          </div>
          <div class="card mx-0 mt-2">
            <h5 class="color-highlight font-12 mb-n1">{{ currentCat.text }}</h5>
          </div>
          <div class="card-overlay bg-gradient-fade rounded-0"></div>
        </div> -->
        <div v-else @click="topcat = 'all'" class="card overflow-visible mt-4 mb-0 pb-0"
          :style="`background-image:url(/img/guide/${currentCat.bg}.png`">
          <div class="row">
            <div class="col-3">
              <h2 class="ms-4 color-white"><i class="fad fa-undo" /> Back </h2>
            </div>
            <div class="col-9 text-right">
              <h5 class="color-highlight font-13 mb-0 me-4">{{ currentCat.category }}</h5>
              <h1 class="font-700 font-30 pb-2 me-4">{{ currentCat.title }}</h1>
            </div>
          </div>
          <div class="content text-right">
            <p>
              {{ currentCat.text }}
            </p>
          </div>
        </div>

      </div>
      <div v-if="subcat && filteredSub">
        <div class="card card-style">
          <div class="card card-style mx-0 shadow-card shadow-card-l rounded-0 mb-2"
            :style="`background-image:url(/img/guide/${filteredSub.bg}.png`">
          </div>
          <div class="content mx-0 mt-2">
            <h5 class="color-highlight font-12 mb-n1">{{ filteredSub.category }}</h5>
            <h4>{{ filteredSub.title }}</h4>
            <div class="mb-3 mt-3 d-flex border-yellow-dark border p-3"
              v-if="filteredSub.category === 'Gameplay' && filteredSub.title === 'Type of Resource'">
              <div class="col-4 font-24 d-flex">
                <Icon name="drug" />
                <h5 class="ms-2">DRUG</h5>
              </div>
              <div class="col-4 font-24 d-flex">
                <Icon name="weapon" />
                <h5 class="ms-2">WEAPON</h5>
              </div>
              <div class="col-4 font-24 d-flex">
                <Icon name="alcohol" />
                <h5 class="ms-2">ALCOHOL</h5>
              </div>
            </div>
            <div class="mb-3 mt-3 d-flex border-yellow-dark border p-3"
              v-if="filteredSub.category === 'Resources' && filteredSub.title === 'Drug'">
              <div class="col-4 font-24 d-flex">
                <Icon name="drug" />
                <h5 class="ms-2">DRUG</h5>
              </div>
            </div>
            <div class="mb-3 mt-3 d-flex border-yellow-dark border p-3"
              v-if="filteredSub.category === 'Resources' && filteredSub.title === 'Weapon'">
              <div class="col-4 font-24 d-flex">
                <Icon name="weapon" />
                <h5 class="ms-2">WEAPON</h5>
              </div>
            </div>
            <div class="mb-3 mt-3 d-flex border-yellow-dark border p-3"
              v-if="filteredSub.category === 'Resources' && filteredSub.title === 'Alcohol'">
              <div class="col-4 font-24 d-flex">
                <Icon name="alcohol" />
                <h5 class="ms-2">ALCOHOL</h5>
              </div>
            </div>
            <p v-html="filteredSub.text">
            </p>
            <div class="border-yellow-dark border mb-3" v-if="filteredSub.title === 'Production Banner'">
              <Balances class="header-bar header-fixed d-block w-100 text-center d-block"
                style="pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'General Menu' && filteredSub.title === 'Home'">
              <RewardsTabs style="position: relative!important;pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'General Menu' && filteredSub.title === 'Camp'">
              <BootcampTabs style="position: relative!important;pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'General Menu' && filteredSub.title === 'Fight'">
              <ActionsTabs style="position: relative!important;pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'General Menu' && filteredSub.title === 'HQ'">
              <BuildingsTabs style="position: relative!important;pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'Rewards' && filteredSub.title === 'Daily Rewards'">
              <LeaderboardsProduction style="position: relative!important;pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'Rewards' && filteredSub.title === 'Pablo Selling'">
              <LeaderboardsPablo style="position: relative!important;pointer-events: none;" />
            </div>
            <div class="border-yellow-dark border mb-3"
              v-if="filteredSub.category === 'Rewards' && filteredSub.title === 'Fight Board'">
              <LeaderboardsFight style="position: relative!important;pointer-events: none;" />
            </div>


            <div class="border-yellow-dark border mb-3" v-if="filteredSub.tip">
              <h6 class="text-yellow p-2"> TIP: {{ filteredSub.tip }}</h6>
            </div>
            <div v-if="description" v-for="desc in description">
              <h5> {{ desc.title }}</h5>
              <div class="border-yellow-dark border mb-3 p-2"
                v-if="filteredSub.category === 'Units' && desc.title === 'Cost'">
                <Cost :drugsCost="1000" :weaponsCost="2500" :alcoholsCost="3000" quantity="1" />
              </div>
              <div v-if="filteredSub.category === 'Units' && desc.title === 'Attack'">
                <div class="item-skill">
                  <Icon name="skills/fire" size="32" />
                </div>
              </div>
              <div v-if="filteredSub.category === 'Units' && desc.title === 'Carry'">
                <div class="item-skill">
                  <Icon name="skills/carry" size="32" />
                </div>
              </div>
              <div v-if="filteredSub.category === 'Units' && desc.title === 'Health'">
                <div class="item-skill">
                  <Icon name="skills/health" size="32" />
                </div>
              </div>
              <div v-if="filteredSub.category === 'Units' && desc.title === 'Resistance'">
                <div class="item-skill">
                  <Icon name="skills/physical" size="32" />
                </div>
              </div>
              <div v-if="filteredSub.category === 'Units' && desc.title === 'Speed'">
                <div class="item-skill">
                  <Icon name="skills/speed" size="32" />
                </div>
              </div>
              <div v-if="filteredSub.category === 'Units' && desc.title === 'Move Cost'">
                <div class="item-skill font-30">
                  <Icon name="drug" size="32" />
                </div>
              </div>
              <div v-if="desc.building" class="ms-2 float-right" style="position: relative;width:30%;">
                <img class="img-fluid rounded-s" :src="`/img/buildings/${desc.building}.jpg`">
              </div>
              <div v-if="desc.unit" class="ms-2 float-right" style="position: relative;width:30%;">
                <img class="img-fluid rounded-s" :src="`/img/units/${desc.unit}.png`">
              </div>
              <div v-if="desc.training" class="ms-2 float-right" style="position: relative;width:30%;">
                <img class="img-fluid rounded-s" :src="`/img/trainings/${desc.training}.png`">
              </div>
              <p class="mb-3"> {{ desc.text }}</p>
            </div>

          </div>
        </div>
      </div>
      <TransitionGroup v-else class="row" name="slide">

        <div class="col-6" v-for="(item, index) in filtered.categories" :key="index">
          <div @click="subcat = item.title" class="card card-style mb-0 mx-0 shadow-card shadow-card-l rounded-0"
            style="height:150px" :style="`background-image:url(/img/guide/${item.bg}.png`">
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
import { buildings } from 'drugwars';
import { filter, pickBy } from 'lodash';
import BuildingSimpleCompact from '../../components/BuildingSimpleCompact.vue';
export default {
  data() {
    return {
      topcat: "all",
      subcat: null,
      guide,
      filter,
      pickBy,
      buildings
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
      if (this.filteredSub && this.filteredSub.description)
        return this.filteredSub.description
      return []
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
