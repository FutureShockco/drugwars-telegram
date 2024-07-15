<template>
  <div v-if="tutorialStep < 9 || (tutorialStep === 9 && tutoDetail === 3)" id="notification-bar-3"
    class="notification-bar glass-effect detached rounded-m shadow-l fade show pb-3" data-bs-delay="7000">
    <div v-if="tutorialStep === 0">

      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/home'" src="/img/bella/14.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/10.png" width="80" class="rounded-s" alt="img">

        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path === '/home'">Hola. Welcome to DrugWars! <br /> First things first, let's pick
            the perfect spot
            for your little empire. Find a neighborhood that makes you feel all powerful and safe.
            Fewer enemies... means less problems, exactly what we want. Choose wisely, baby." <router-link
              :to="'/map/territory?location=' + rnd"
              class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Choose a
              location</router-link>
          </h5>

          <h5 v-if="this.$route.path === '/map/territory'">"Alright, you can use the buttons to
            navigate through neighborhoods. When ready <span class="text-yellow">select a square and make it
              your main base</span>"</h5>


        </div>
      </div>

    </div>
    <div v-if="tutorialStep === 1">

      <div class="d-flex p-3 pb-0" v-if="tutorialStep === 1">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/buildings'" src="/img/bella/14.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/10.png" width="80" class="rounded-s" alt="img">

        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path === '/buildings'">Here we go! Click on the green upgrade button to start the first
            upgrade of your <span class="text-yellow">Headquarters.</span> Since this is your first time... I'll boost
            the speed of the upgrade!</h5>
          <h5 v-else>Felicitaciones! You've chosen your turf. Now, it's time to
            make it your stronghold. The next move is upgrading your <span class="text-yellow">Headquarters.</span></h5>

          <router-link v-if="this.$route.path !== '/buildings'" to="/buildings"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Go
            to
            your base</router-link>
        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 2">

      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/buildings'" src="/img/bella/1.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/11.png" width="80" class="rounded-s" alt="img">

        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path === '/buildings/drugs'">"Alright, sugar. <br /> Now click on the yellow instant
            upgrade button and use the free tokens to purchase the <span class="text-yellow">Crack House</span> and
            increase drug production."
          </h5>
          <h5 v-else>"Bien hecho, baby! Your headquarters upgrade is in progress, but we can't wait around. I'm giving
            you
            some
            free DW Tokens to boost purchase a <span class="text-yellow">Crack House</span>. Let's crank up those
            operations and flood the market with our product."
          </h5>

          <router-link v-if="this.$route.path !== '/buildings/drugs'" to="/buildings/drugs"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>
        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 3">

      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/buildings/weapons'" src="/img/bella/12.png" width="80" class="rounded-s"
            alt="img">
          <img v-else src="/img/bella/17.png" width="80" class="rounded-s" alt="img">

        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path === '/buildings/weapons'">"Click on the yellow instant
            upgrade button and use the free tokens on your <span class="text-yellow">Ammunition
              Factory</span> and start the upgrade process to boost weapon production."
          </h5>
          <h5 v-else>"Honey, we've got the drugs flowing, now let's talk firepower. Get some
            guns rolling. We need to be ready for anything, and a girl loves to feel safe, you know?"
          </h5>

          <router-link v-if="this.$route.path !== '/buildings/weapons'" to="/buildings/weapons"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>
        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 4">

      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/buildings/alcohol'" src="/img/bella/13.png" width="80" class="rounded-s"
            alt="img">
          <img v-else src="/img/bella/8.png" width="80" class="rounded-s" alt="img">

        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path === '/buildings/alcohol'">"Click on the yellow instant
            upgrade button for the <span class="text-yellow">Bar</span> and
            build it to increase alcohol production."
          </h5>
          <h5 v-else>"Alright, darling, it's time to add some fun to our empire. Let’s get that alcohol
            production going. It’s not just about the money, it’s about making a name for ourselves in every corner of
            the underworld."
          </h5>

          <router-link v-if="this.$route.path !== '/buildings/alcohol'" to="/buildings/alcohol"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>
        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 5">

      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img src="/img/bella/4.png" width="80" class="rounded-s" alt="img">
        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path !== '/buildings'"> "Babe, it's time to take our operation to the next level. We've
            got the product flowing, but now we need soldiers. A strong army is the key to keeping everything we've
            built safe and sound."
          </h5>
          <h5 v-if="this.$route.path === '/buildings'"> "Construct the <span class="text-yellow">Training
              Facility</span> to start recruiting and training units."
          </h5>

          <router-link v-if="this.$route.path !== '/buildings'" to="/buildings"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>
        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 6">

      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/units'" src="/img/bella/20.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/17.png" width="80" class="rounded-s" alt="img">

        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path !== '/units'"> "Now, my love, let’s get some bodies in here. Go to the training
            facility and <span class="text-yellow">start the
              recruitment</span>.
          </h5>
          <h5 v-if="this.$route.path === '/units'"> "Alright, it's time to bring in the eyes and ears of our
            operation. Click on the yellow button to recruit a <span class="text-yellow">Spy</span> to gather crucial
            intelligence on our rivals."
          </h5>

          <router-link v-if="this.$route.path !== '/units'" to="/units"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>
        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 7">
      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/actions'" src="/img/bella/21.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/18.png" width="80" class="rounded-s" alt="img">
        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path !== '/actions' && tutoDetail === 0"> "Alright, sexy, now it's time to get a little
            dirty. We've got
            our spy ready, so let's put them to work for a little fight.
          </h5>
          <h5 v-if="this.$route.path === '/actions' && tutoDetail === 0"> "Click on the <span
              class="text-yellow">Spy</span> to add it to
            the selected army list. Send your
            spy to gather intel on those bastard named <span class="text-yellow">PixelVerse</span>. Knowledge is
            power, and we need to know everything about our enemies before we make a move."

          </h5>
          <h5 v-if="this.$route.path === '/actions' && tutoDetail === 1"> "Ok I already entered the informations of our
            rival. Next step for you is to click on the <span class="text-red">Attack</span> button"
          </h5>
          <router-link v-if="this.$route.path !== '/actions'" to="/actions?type=attack&nickname=PixelVerse&message=tuto"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>

        </div>
      </div>
    </div>
    <div v-if="tutorialStep > 7 && tutoDetail === 2">
      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/actions?type=attack&nickname=PixelVerse&message=tuto'"
            src="/img/bella/21.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/18.png" width="80" class="rounded-s" alt="img">
        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5 v-if="this.$route.path !== '/actions'"> "See there your <span class="text-yellow">Spy</span> is on the way
            to attack our rival! Come back after the fight is done to see the result."
            <div @click="setTutoDetail(0)"
              class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">
              Continue</div>
          </h5>

          <h5 v-if="this.$route.path === '/actions'"> "Perfect your <span class="text-yellow">Spy</span> is now
            on the way! Let take a look at it.
          </h5>

          <router-link v-if="this.$route.path === '/actions'" to="/actions/outgoing"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">Continue</router-link>

        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 8 && tutoDetail === 0">
      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img v-if="this.$route.path === '/actions'" src="/img/bella/21.png" width="80" class="rounded-s" alt="img">
          <img v-else src="/img/bella/18.png" width="80" class="rounded-s" alt="img">
        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5> "Ok, babe, last but not least, you need to connect your TON wallet to DrugWars.
          </h5>


          <div @click="setTutoDetail(0), toggleModalAccount()"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">
            Open Wallet</div>

        </div>
      </div>
    </div>
    <div v-if="tutorialStep === 9 && tutoDetail !== 2">
      <div class="d-flex p-3 pb-0">
        <div class="ms-auto">
          <img src="/img/bella/18.png" width="80" class="rounded-s" alt="img">
        </div>
        <div class="ps-4">
          <i class="bi bi-check-circle-fill font-36 color-green-dark"></i>
          <h5> "Wow, you are very impressive, it's time for you now to continue alone, I'll be back soon.
          </h5>


          <div @click="hideTutorial, setTutoDetail(0)"
            class="btn mt-2 p-3 color-black gradient-green font-11 pt-3 d-inline-block float-end">
            Continue</div>

        </div>
      </div>
    </div>
  </div>

  <!-- <div id="notification-bar-1" class="notification-bar glass-effect rounded-s shadow-xxl fade show"
    :class="showTutorial ? 'show' : ''" data-bs-delay="5000">
    <router-link :to="'/map/territory?location=' + rnd" class="toast-header px-3 py-3">
      <strong class="me-auto color-theme">Get started</strong>

      <i class="fad fa-check pe-2 color-green-dark"></i>
    </router-link>
    <div v-if="!mission0" class="toast-body px-3 py-3">
      <div>Choose a location on the map.</div>
    </div>
  </div> -->
  <!-- <div class="card card-style">
    <div class="content">
      <h5>With Simple Icons</h5>
      <p>
        Default list groups with or without flushed borders with simple no background icons.
      </p>
      <div class="list-group list-custom list-group-m rounded-xs">
        <a href="#" class="list-group-item" data-trigger-switch="switch-2">
          <i class="bi color-blue-dark bi-gear-fill"></i>
          <i class="fad mr-2" :class="mission2 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <div>List Item 3</div>
          <div class="form-switch ios-switch switch-green switch-s">
            <input type="checkbox" class="ios-input" id="switch-2" checked="">
            <label class="custom-control-label" for="switch-2"></label>
          </div>
        </a>
      </div>
    </div>

    <div class="content">
      <div class="hide-sm hide-md">
        <img width="100" height="100" class="mr-4 mb-4" src="//img.drugwars.io/me.jpg" />
      </div>
      <p>Welcome to the city, newcomer! It's a tough world out there, and before you start making friends, you'll want
        to learn how to defend yourself. No one knows how long you'll last, but everyone will be trying to take what you
        build! Focus on completing these missions first to strengthen your defenses, and then you can think about new
        challenges. Good luck!</p>
    </div>
    <div class="row mb-n3">
      <div class="missions list-group list-custom list-group-m rounded-xs">
        <router-link :to="'/map/territory?location=' + rnd" class="list-group-item">
          <i class="bi color-blue-dark bi-gear-fill" data-trigger-switch="switch-2"></i>
         <i class="fa mr-2" :class="mission0 ? 'fa-check text-green' : 'fa-xmark text-red'"></i> 
          <h5>1. Choose a location on the map</h5>
        </router-link>
        <li>
          <i class="fa mr-2" :class="mission1 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings">2. Upgrade the headquarters</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission2 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings/drugs">3. Increase your DRUGS production</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission3 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings/weapons">4. Increase your WEAPONS production</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission4 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings/alcohol">5. Increase your ALCOHOL production</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission5 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/buildings">6. Build a training facility!</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission6 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>

          <router-link to="/units">7. Recruit some units</router-link>
        </li>
        <li>
          <i class="fa mr-2" :class="mission7 ? 'fa-check text-green' : 'fa-xmark text-red'"></i>
          <router-link to="/actions">8. Start a fight</router-link>
        </li>
      </div>
    </div>
  </div> -->
</template>

<script>
import { buildings } from 'drugwars';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      nickname: this.$store.state.game.user.user.nickname,
      rnd: Math.floor(Math.random() * Math.floor(250)) + 1,

    };
  },
  methods: {
    ...mapActions(['showTutoriahideTutorial', 'setTutoDetail', 'toggleModalAccount']),
    goToSettings() {
      this.$router.push({ path: 'settings' })
    }
  },
  computed: {

    tutorialStep() {
      return this.$store.state.game.user.user.tutorial
    },
    tutoDetail() {
      return this.$store.state.game.tutoDetail
    },
    mission0() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters' && b.territory !== 0,
      );
      return !!(building && building.lvl > 0);
    },
    mission1() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters',
      );
      return !!(building && building.lvl > 0);
    },
    mission2() {
      return !!this.$store.state.game.user.buildings.find(
        b =>
          b.building &&
          buildings[b.building].production_type === 'drugs' &&
          buildings[b.building].production_rate > 0,
      );
    },
    mission3() {
      return !!this.$store.state.game.user.buildings.find(
        b =>
          b.building &&
          buildings[b.building].production_type === 'weapons' &&
          buildings[b.building].production_rate > 0,
      );
    },
    mission4() {
      return !!this.$store.state.game.user.buildings.find(
        b =>
          b.building &&
          buildings[b.building].production_type === 'alcohol' &&
          buildings[b.building].production_rate > 0,
      );
    },
    mission5() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'training_facility',
      );
      return !!(building && building.lvl > 0);
    },
    mission6() {
      return this.$store.state.game.user.units.length > 0;
    },
    mission7() {
      if (this.$store.state.game.sent_fights)
        return this.$store.state.game.sent_fights.find(f => f.attacker_nickname === this.nickname);
      return false;
    },
  },
};
</script>

<style scoped lang="less">
.missions {
  li {
    font-size: 18px;
    margin-bottom: 12px;

    .iconfont {
      font-size: 18px;
    }
  }
}
</style>
