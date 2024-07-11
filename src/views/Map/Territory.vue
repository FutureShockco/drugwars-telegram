<template>
  <div>
    <MapTabs />
    <div class="card mb-0" style="margin-top: -15px;">
      <div class="content">
        <div class="tabs tabs-box">
          <div class="tab-controls rounded-s border-highlight">
            <button class=" gradient-highlight" @click="decreaseLocation()">
              <i class="fad fa-arrow-left color-black"></i>
            </button>
            <input type="number" v-model="currentLocation" placeholder="25" class="input color-highlight w-100"
              @change="updateLocation(currentLocation)" />


            <button class="gradient-highlight" @click="increaseLocation()">
              <i class="fad fa-arrow-right color-black"></i>
            </button>
          </div>
        </div>
        <div class="d-flex">

        </div>
      </div>
    </div>
    <div id="territorybg" class="territorybg" style="height:100vw;width: 100vw;">
      <div class="title" id="title" style="display: none">
        <h5 v-if="selectedTile">BASE {{ selectedTile }}</h5>
        <div class="mt-0">
          <div v-if="currentNickname"> Under the control of : <h5>{{ currentNickname }}</h5>
          </div>
          <span v-else>Nobody lives here </span>
          <div v-if="currentGang && currentGang.role !== null && currentGang.ticker">
            {{ currentGang.role }} of {{ currentGang.name }} [{{ currentGang.ticker }}]
          </div>
        </div>
        <div v-if="selectedTile && nickname">
          <!-- <h6>INFORMATIONS</h6> -->
          <div class="mt-0">HQ LEVEL : {{ currentHq }}</div>
          <!-- <div class="mt-0">DETAIL : {{ customName }}</div> -->
        </div>
        <div class="map-title text-left" id="visit">
          <router-link v-if="selectedTile && currentNickname && currentNickname != nickname"
            :to="`/actions?type=attack&target=${location}&base=${selectedTile}`">
            <button class="button button-red">ATTACK</button>
          </router-link>
          <!-- <router-link v-if="selectedTile && currentNickname && currentNickname != nickname"
            :to="`/actions?type=transport&target=${location}&base=${selectedTile}`">
            <button class="button button-blue">TRANSPORT</button>
          </router-link> -->
          <!-- <router-link v-else-if="currentNickname != nickname && base"
            :to="`/actions?type=occupy&target=${location}&base=${selectedTile}`">
            <button class="button button-blue">CREATE NEW BASE</button>
          </router-link> -->
          <!-- <button v-if="
            currentNickname === nickname && location == base.territory && selectedTile == base.base
          " class="button button-blue">
            ALREADY SELECTED
          </button>
          <div v-else-if="currentNickname === nickname">
            <button class="button button-blue" @click="selectBase()">SELECT</button>
            <router-link :to="`/actions?type=transport&target=${location}&base=${selectedTile}`">
              <button class="button button-blue">TRANSPORT</button>
            </router-link>
          </div> -->
          <button v-if="!main" class="btn gradient-highlight text-black" @click="handleSubmit()">
            CHOOSE AS MAIN BASE
          </button>
        </div>
      </div>
      <table id="table" style="position: relative;">
        <div class="overlay"></div>
        <canvas id="canvas" style="cursor: pointer;height:100vw;width: 100vw;"></canvas>
      </table>


    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { mapActions } from 'vuex';
import Promise from 'bluebird';

export default {
  data() {
    return {
      isMain: null,
      isLoading: false,
      selectedTile: null,
      selected: null,
      customName: null,
      currentNickname: null,
      currentGang: null,
      currentHq: null,
      job: null,
      nickname: this.$store.state.game.user.user.nickname,
      bases: [],
      currentLocation: null,
      dragging: false,
      iso: false,
      x: 'no',
      y: 'no',
    };
  },
  watch: {
    location(val) {
      if (val) {
        console.log(val);
        this.updateLocation()
      }
    },
  },
  computed: {
    main() {
      if (this.base) return this.$store.state.game.user.buildings.find((b) => b.main === 1) || null;
    },
    location() {
      return this.$route.query.location || null;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    ownOccupationTroop() {
      if (this.$store.state.game.user.units.find((u) => u.unit === 'occupation_troop'))
        return (
          this.$store.state.game.user.units.find((u) => u.unit === 'occupation_troop').amount || {
            amount: 0,
          }
        );
      return 0;
    },
  },
  methods: {

    increaseLocation() {
      this.$router.push({ path: `/map/territory?location=${Number(this.location) + 1}` });
    },
    decreaseLocation() {
      this.$router.push({ path: `/map/territory?location=${Number(this.location) - 1}` });
    },
    start() {
      const self = this;
      const bg = document.getElementById('territorybg');
      const canvas_element = document.getElementById('canvas');

      const context = canvas_element.getContext('2d');
      let tiles_array = [];

      let width = 0;
      let height = 0;

      width = bg.offsetWidth;
      height = bg.offsetHeight;
      canvas_element.width = width;
      canvas_element.height = height;


      function clearCanvas() {
        const ctx = canvas_element.getContext('2d');
        ctx.clearRect(0, 0, width, height);
      }
      const TILE_TYPES = {
        me: { name: 'Me', color: 'green' },
        sea: { name: 'Sea', color: 'lightBlue' },
        land: { name: 'Land', color: null },
      };

      function Tile(
        x,
        y,
        width,
        height,
        id,
        nickname,
        level,
        custom_name,
        main,
        gang,
        job,
        fillColor,
        strokeStyle
      ) {
        this.id = id;
        this.nickname = nickname || null;
        this.level = level || null;
        this.gang = gang || null;
        this.job = job || null;
        this.custom_name = custom_name || null;
        this.main = main || null;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.workWidth = {
          start: x,
          end: x + width,
        };
        this.workHeight = {
          start: y,
          end: y + height,
        };
        this.fillColor = fillColor;
        this.strokeStyle = 'red';
      }

      const visitTitle = document.getElementById('title');
      canvas_element.onclick = function (e) {
        event = e;
        console.log(e)
        const elementClickedId = checkClick(event, canvas_element);
        if (self.selectedTile != null && self.nickname === self.currentNickname) {
          tiles_array[self.selectedTile - 1].fillColor = 'green';
          clearCanvas();
        } else if (
          self.selectedTile != null &&
          self.currentNickname &&
          self.nickname !== self.currentNickname
        ) {
          tiles_array[self.selectedTile - 1].fillColor = 'red';
          clearCanvas();
        } else if (self.selectedTile != null && !self.currentNickname && self.job) {
          tiles_array[self.selectedTile - 1].fillColor = '#f6bb428f';
        } else if (self.selectedTile != null) {
          tiles_array[self.selectedTile - 1].fillColor = null;
        }
        // if (elementClickedId.job === self.job) {
        //   tiles_array[224].fillColor = '#ffc508';
        // } else 
        // if (elementClickedId.nickname === self.nickname) {
        //   tiles_array[224].fillColor = 'green';
        // } else if (elementClickedId.nickname !== self.nickname) {
        //   tiles_array[224].fillColor = 'blue';
        // } else {
        //   tiles_array[224].fillColor = 'gray';
        // }

        self.selectedTile = elementClickedId.id;
        self.currentNickname = elementClickedId.nickname;
        self.currentHq = elementClickedId.hq;
        self.customName = elementClickedId.custom_name;
        self.isMain = elementClickedId.main;
        self.currentGang = elementClickedId.gang;
        self.job = elementClickedId.job;
        if (elementClickedId.job && !elementClickedId.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = '#ffc508';
        } else if (elementClickedId.nickname === self.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = 'green';
        } else if (elementClickedId.nickname !== self.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = '#ffc508';
        } else {
          tiles_array[elementClickedId.id - 1].fillColor = 'gray';
        }

        if (tiles_array[elementClickedId.id] && !elementClickedId.job) {
          visitTitle.style.display = 'block';
          if (tiles_array[elementClickedId.id].x === 0) {
            visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 4}px`;
            visitTitle.style.left = `initial`;
            visitTitle.style.right = `${48}px`;
          } else if (
            tiles_array[elementClickedId.id].x > canvas_element.width / 2 ||
            tiles_array[elementClickedId.id].x > canvas_element.width
          ) {
            visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 54}px`;
            visitTitle.style.left = `initial`;
            visitTitle.style.right = `${canvas_element.width - tiles_array[elementClickedId.id].x + 48
              }px`;
          } else {
            visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 54}px`;
            visitTitle.style.right = `initial`;
            visitTitle.style.left = `${tiles_array[elementClickedId.id].x}px`;
          }
        } else if (elementClickedId.job) {
          visitTitle.style.display = 'none';
        }
        drawTiles();
      };

      function checkClick(event, canvas_element) {
        const canvasRect = canvas_element.getBoundingClientRect();
        console.log(canvasRect)
        const clickX = event.clientX - canvasRect.left;
        const clickY = event.clientY - canvasRect.top + window.scrollY;
        console.log(clickX, clickY)

        // const clickX = event.layerX;
        // const clickY = event.layerY - 135;

        let element;

        tiles_array.forEach((tile) => {

          if (
            clickX > tile.workWidth.start &&
            clickX < tile.workWidth.end &&
            clickY > tile.workHeight.start &&
            clickY < tile.workHeight.end
          ) {
            element = {
              id: tile.id,
              nickname: tile.nickname,
              hq: tile.level,
              custom_name: tile.custom_name,
              main: tile.main,
              gang: tile.gang,
              job: tile.job,
            };
          }
        });
        return element;
      }

      function createTiles(quantityX, quantityY) {
        tiles_array = [];
        const quantityAll = quantityX * quantityY;
        const tileWidth = canvas_element.width / quantityX;
        const tileHeight = canvas_element.height / quantityY;
        console.log(tileWidth, tileHeight)
        const drawPosition = {
          x: 0,
          y: 0,
        };
        for (let i = 0; i < quantityAll; i++) {
          let fillColor = TILE_TYPES.land.color;
          let nickname = '';
          let level = '';
          let custom_name = '';
          let main = '';
          let gang = {};
          let job = '';
          self.bases.forEach((element) => {
            if (element.base === i && element.job != undefined) {
              fillColor = '#ffc508';
              nickname = element.nickname;
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
              job = element.job;
            } else if (element.base === i && element.nickname === self.nickname) {
              fillColor = 'green';
              nickname = element.nickname;
              gang = { role: element.role, gang: element.name, ticker: element.ticker };
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
            } else if (element.base === i && element.nickname !== self.nickname) {
              fillColor = '#a90000';
              nickname = element.nickname;
              gang = { role: element.role, gang: element.name, ticker: element.ticker };
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
            }

          });
          const tile = new Tile(
            drawPosition.x,
            drawPosition.y,
            tileWidth,
            tileHeight,
            i + 1,
            nickname,
            level,
            custom_name,
            main,
            gang,
            job,
            fillColor,
          );

          tiles_array.push(tile);

          drawPosition.x += tileWidth;
          if (drawPosition.x >= canvas_element.width) {
            drawPosition.x = 0;
            drawPosition.y += tileHeight;
          }

        }
      }
      const tiles = new Image();

      const home = new Image();
      const tree = new Image();
      const buildingtop = new Image();
      const buildingbottom = new Image();
      const fountain = new Image();
      const pool = new Image();
      const heliport = new Image();
      const job = new Image();
      tiles.src = '/img/map/tiles.png';

      home.src = '//img.drugwars.io/map/first.png';
      buildingtop.src = '//img.drugwars.io/map/first.png';
      pool.src = '//img.drugwars.io/map/first.png';
      heliport.src = '//img.drugwars.io/map/first.png';
      home.src = '//img.drugwars.io/map/home.png';
      tree.src = '//img.drugwars.io/map/tree.png';
      buildingtop.src = '//img.drugwars.io/map/buildingtop.png';
      buildingbottom.src = '//img.drugwars.io/map/buildingbottom.png';
      fountain.src = '//img.drugwars.io/map/fountain.png';
      pool.src = '//img.drugwars.io/map/pool.png';
      heliport.src = '//img.drugwars.io/map/heliport.png';
      job.src = '//img.drugwars.io/map/home.png';


      function drawTiles() {
        const background = new Image();

        background.src = `/img/mapbg.png`;
        background.onload = () => {
          context.imageSmoothingEnabled = true;
          context.drawImage(background, 0, 0, canvas.width, canvas.height);
          tiles_array.forEach((tile) => {
            context.beginPath();
            if (tile.fillColor) context.fillStyle = tile.fillColor;
            else context.fillStyle = 'rgba(255, 50, 50, 0.0)';
            context.rect(tile.x + 7, tile.y + 12, tile.width - 3, tile.height - 5);


            // context.strokeStyle = '#000';

            context.fill();

            if (tile.fillColor) {
              if (tile.level > 99) {
                context.drawImage(heliport, tile.x + 7, tile.y + 9, tile.width - 13, tile.height - 11);
              }
              else if (tile.level > 49) {
                context.drawImage(pool, tile.x + 7, tile.y + 9, tile.width - 13, tile.height - 11);
              }
              else if (tile.level > 29) {
                context.drawImage(fountain, tile.x + 7, tile.y + 9, tile.width - 13, tile.height - 11);
              }
              else if (tile.level < 10) {
                context.drawImage(home, tile.x + 9, tile.y + 9, tile.width - 13, tile.height - 11);
                if (tile.fillColor === 'green') {
                  context.drawImage(tree, tile.x + 7, tile.y + 9, tile.width - 13, tile.height - 11);
                }
              }
              else if (tile.level > 9) {
                context.drawImage(buildingtop, tile.x + 7, tile.y + 9, tile.width - 13, tile.height - 11);
              }
              else if (tile.level > 19) {
                context.drawImage(buildingbottom, tile.x + 7, tile.y + 9, tile.width - 13, tile.height - 11);
              }

            }
            else {
              const rndX = Math.floor(Math.random() * Math.floor(10))  * 50
              const rndY = Math.floor(Math.random() * Math.floor(10)) * 50
              console.log(rndX,rndY)
              context.drawImage(tiles, 18, 16, 50 , 48, tile.x+2, tile.y+9, 54 ,53);
            }
   
            context.textAlign = 'center';

            context.fillStyle = '#fff';
            context.fillText(tile.id, tile.x + 22, tile.y + 42, tile.width);
          });
        };
      }
      createTiles(10, 10);
      drawTiles();

      // const limit = (document.body.clientWidth)-bg.offsetWidth;
      // tb.style.left = (limit+50) +'px';
    },
    ...mapActions(['send', 'notify', 'setMainBase', 'init']),
    async handleSubmit() {
      const self = this;
      const isValid = await this.validateFormFree();
      this.isLoading = true;
      if (isValid && this.location && this.selectedTile) {
        const payload = {
          type: 'dw-firstloc',
          territory: Number(this.location),
          base: Number(this.selectedTile),
        };
        this.send(payload)
          .then(() => {
            Promise.delay(2000).then(() => {
              client.requestAsync('get_bases', this.location).then((result) => {
                [self.bases] = result;
                this.setMainBase({
                  territory: result[0][0].territory,
                  base: result[0][0].base,
                  custom: result[0][0].custom,
                  main: result[0][0].main,
                });
                self.$router.push(`/buildings`);
                self.isLoading = false;
              });
            });
          })
          .catch((e) => {
            this.notify({ type: 'error', message: 'Failed to take base' });
            console.error('Failed to take base', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    async validateFormFree() {
      this.errorMessage = null;
      const base = this.selectedTile;
      const territory = this.location;
      const params = { base, territory };
      if (this.$store.state.game.user.buildings.find((b) => b.main === 1 && b.territory !== 0)) {
        this.errorMessage = 'You already have a main base!';
      }

      if (!base || !territory) {
        this.errorMessage = 'Please choose a location and a base';
      }
      const now = new Date();
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in GoldWars, try again after ${isPunished.toLocaleString()}`;
      }

      if (!this.errorMessage)
        try {
          const base = await client.requestAsync('check_base', params);
          if (base) {
            this.errorMessage = `Base number '${base}' is already taken`;
          }
          return !this.errorMessage;
        } catch (e) {
          this.errorMessage = `Base number '${base}' doesn't exist`;
          console.error(`Base number '${base}' doesn't exist`, e);
          return false;
        }
      if (this.errorMessage) {
        return false;
      }
      return !this.errorMessage;
    },
    selectBase() {
      const territory = this.location;
      const base = this.selectedTile;
      const custom = this.customName;
      const main = this.isMain;
      this.setMainBase({ territory, base, custom, main });
    },
    handleZoom() {
      const bg = document.getElementById('territorybg');
      const canvas_element = document.getElementById('canvas');
      const width = bg.offsetWidth;
      const height = bg.offsetHeight - 300;
      canvas_element.width = width;
      canvas_element.height = height;
      const context = canvas_element.getContext('2d');
      context.scale(1, 0.5);
      context.translate(0, 500);
      context.rotate((-45 * Math.PI) / 180);
    },
    updateLocation(value) {
      const self = this;
      self.bases = null;

      if (self.currentLocation !== self.location) {
        if (value)
          self.currentLocation = value;
        else self.currentLocation = self.location;
        this.$router.push({ path: `/map/territory?location=${Number(self.currentLocation)}` });

        client.requestAsync('get_bases', self.currentLocation).then((result) => {
          [self.bases] = result;
          result[1].forEach((element) => {
            self.bases.push(element);
          });
          self.start();
          self.isLoading = false;
        });
      }
    },
  },
  mounted() {
    const self = this;
    self.bases = null;
    self.currentLocation = self.location;
    client.requestAsync('get_bases', this.location).then((result) => {
      [self.bases] = result;
      result[1].forEach((element) => {
        self.bases.push(element);
      });
      self.start();
      self.isLoading = false;
    });
  },
  // updated() {
  //   const self = this;
  //   self.bases = null;
  //   if (self.currentLocation !== self.location) {
  //     self.currentLocation = self.location;
  //     client.requestAsync('get_bases', this.location).then((result) => {
  //       [self.bases] = result;
  //       result[1].forEach((element) => {
  //         self.bases.push(element);
  //       });
  //       self.start();
  //       self.isLoading = false;
  //     });
  //   }
  // },
};
</script>


<style lang="less" scoped>
.territorybg {
  overflow: hidden;
}

.overlay {
  position: absolute;
  // background-image: url(/img/map.png);
  top: 0px;
  width: 100%;
  height: 100%;
  background-size: 100%;
  pointer-events: none;
}

.title {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 20%;
  text-shadow: 5px 5px 5px black; // pointer-events: none;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 5px;
}

// .map-title {
//   position: absolute;
// }
//table{
//}
tr {
  height: 0px;
  width: 0px;
  display: block;
}

td {
  height: 0px;
  width: 0px;
  display: block;
  padding: 0px;
}

.tile {
  transform: translate3d(0em, 0em, 0em);
  width: 4em;
  height: 4em;
  transition: all 1s cubic-bezier(0.22, 0.6, 0.39, 1.42);
}

.tile.hide {
  transform: translate3d(12em, 12em, 0em) !important;
  opacity: 0;
  transition: all 1s cubic-bezier(0.7, -0.4, 0.88, 0.51);
}



@keyframes showTile {
  from {
    transform: translate3d(12em, 12em, 0em);
    opacity: 0;
  }

  to {
    transform: translate3d(0em, 0em, 0em);
    opacity: 1;
  }
}

@keyframes hideTile {
  from {
    transform: translate3d(0em, 0em, 0em);
    opacity: 1;
  }

  to {
    transform: translate3d(12em, 12em, 0em);
    opacity: 0;
  }
}
</style>
