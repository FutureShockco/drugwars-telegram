<template>
  <div>
    <BuildingsTabs />
    <div class="anim-fade-in" v-if="hasBase">
      <!-- <div class="card card-style shadow-card shadow-card-m bg-2" data-card-height="230" style="height: 230px;">
        <div class="card-bottom pb-3 px-3">
          <h3 class="color-white mb-1">PWA Ready</h3>
          <p class="color-white opacity-80 mb-0 mt-n1 font-14">Just install it to your Home Screen.</p>
        </div>
        <div class="card-overlay bg-gradient-fade"></div>
      </div>
      <div class="card card-style">
        <div class="card-body text-center">
          <h5 class="mb-n1 font-12 color-highlight font-700 text-uppercase pt-1">The Future is Now</h5>
          <h2>Powerful Features</h2>
          <p class="mb-3">
            Duo brings best in class features for your website. Speed and flexibility plus ease of use.
          </p>
          <div class="row mb-n3 pt-4">
            <div class="col-6">
              <i class="bi bi-lightning-charge color-yellow-dark font-50 d-block pb-2"></i>
              <h5 class="pt-2">Lightning Fast</h5>
              <p>
                Ready when you are. Tap and enjoy.
              </p>
            </div>
            <div class="col-6">
              <i class="bi bi-award color-red-light font-50 d-block pb-2"></i>
              <h5 class="pt-2">Best Support</h5>
              <p>
                We treat others like we want to be treated.
              </p>
            </div>
            <div class="col-6">
              <i class="bi bi-phone color-gray-dark font-50 d-block pb-2"></i>
              <h5 class="pt-2">PWA Ready</h5>
              <p>
                Add it to your home screen and enjoy.
              </p>
            </div>
            <div class="col-6">
              <i class="bi bi-code-slash color-green-light font-50 d-block pb-2"></i>
              <h5 class="pt-2">Bootstrap 5</h5>
              <p>
                Vanilla JavaScript, no jQuery Dependency.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-style">
        <div class="content px-2 text-center">
          <h5 class="mb-n1 font-12 color-highlight font-700 text-uppercase">Things we do</h5>
          <h2>Featured Projects</h2>
          <p class="mb-3">
            Products we are proud to showcase and show off to the world. We think you'll love them!
          </p>
          <div class="row text-center row-cols-3 mb-n1">
            <a class="col p-1" data-gallery="gallery-1" href="images/pictures/7t.jpg" title="Vynil and Typerwritter">
              <img src="images/empty.png" data-src="images/pictures/7s.jpg" class="preload-img img-fluid rounded-m"
                alt="img">
            </a>
            <a class="col p-1" data-gallery="gallery-1" href="images/pictures/23t.jpg" title="Cream Cookie">
              <img src="images/empty.png" data-src="images/pictures/23s.jpg" class="preload-img img-fluid rounded-m"
                alt="img">
            </a>
            <a class="col p-1" data-gallery="gallery-1" href="images/pictures/3t.jpg" title="Cookies and Flowers">
              <img src="images/empty.png" data-src="images/pictures/3s.jpg" class="preload-img img-fluid rounded-m"
                alt="img">
            </a>
            <a class="col p-1" data-gallery="gallery-1" href="images/pictures/11t.jpg" title="Vynil and Typerwritter">
              <img src="images/empty.png" data-src="images/pictures/11s.jpg" class="preload-img img-fluid rounded-m"
                alt="img">
            </a>
            <a class="col p-1" data-gallery="gallery-1" href="images/pictures/5t.jpg" title="Cream Cookie">
              <img src="images/empty.png" data-src="images/pictures/5s.jpg" class="preload-img img-fluid rounded-m"
                alt="img">
            </a>
            <a class="col p-1" data-gallery="gallery-1" href="images/pictures/15t.jpg" title="Cookies and Flowers">
              <img src="images/empty.png" data-src="images/pictures/14s.jpg" class="preload-img img-fluid rounded-m"
                alt="img">
            </a>
          </div>
        </div>
      </div>

      <div class="card card-style py-3">
        <div class="content px-2 text-center">
          <h5 class="mb-n1 font-12 color-highlight font-700 text-uppercase">Time to Go Mobile</h5>
          <h2>Get Duo Mobile Today</h2>
          <p class="mb-3">
            Start your next project with Duo and enjoy the power of a Progressive Web App.
          </p>
          <a href="https://1.envato.market/2ryjKA" target="_blank"
            class="default-link btn btn-m rounded-s gradient-highlight shadow-bg shadow-bg-s px-5 mb-0 mt-2">Get Duo
            Now</a>
        </div>
      </div> -->
      <Building v-for="item in items" :building="item" :key="item.id" />
    </div>
    <div v-else class="p-2 text-center">
      <router-link :to="'/map/territory?location=' + rnd"> You must choose a location on the map first.</router-link>
    </div>
  </div>

</template>

<script>
import { buildings } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      items: pickBy(buildings, b => b.type === 'main'),
      rnd: Math.floor(Math.random() * Math.floor(250)) + 1,
    };
  },
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    hasBase() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === 'headquarters' && b.territory !== 0,
      );
      return !!(building && building.lvl > 0);
    },
  },
};
</script>
