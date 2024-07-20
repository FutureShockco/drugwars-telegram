<template>
    <div>
        <RewardsTabs />
        <div class="card card-style">
            <div class="content">
                <div class="d-flex">
                    <div>
                        <h6 class="mb-n1 opacity-80 color-highlight">Get more resources and more tokens!!</h6>
                        <h3>Complete tasks</h3>
                    </div>
                    <div class="align-self-center ms-auto">
                        <i class="fad fa-check font-24 color-green-dark"></i>
                    </div>
                </div>
                <p>Bella's missions are waiting for you!</p>
            </div>
        </div>
        <div v-if="!hasTwitter" class="card card-style shadow-card shadow-card-l show" data-card-height="150"
            style="height: 150px;" :style="`background-image:url(/img/tasks/1.png`">
            <div class="card-bottom pb-3 px-3">
                <h3 class="color-white">X (Twitter) Gang</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">Link your X (Twitter) account!</p>
                <!-- {{ 'https://dw-api-telegram-55801a35819b.herokuapp.com/twitter/login/'+encodeURIComponent(TWA.initData)  }} -->
                <div @click="TWA.openLink('https://dw-api-telegram-55801a35819b.herokuapp.com/twitter/login/' + TWA.initData)"
                    data-bs-dismiss="offcanvas"
                    class="btn btn-full btn-m shadow-l rounded-s text-uppercase font-600 gradient-blue my-2">
                    Link Now</div>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </div>
        <!-- <router-link :to="task.link" v-if="task.link" v-for="(task, index) in tasks" :key="index"
            class="card card-style shadow-card shadow-card-l" data-card-height="150" style="height: 150px;"
            :style="`background-image:url(/img/tasks/${task.bg}.png`">
            <div class="card-bottom pb-3 px-3">
                <div class="text-end">
                    <h6 class="mb-n1 opacity-80 color-highlight">Current Level</h6>
                    <h3>0</h3>
                </div>
                <h3 class="color-white">{{ task.title }}</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">{{ task.desc }}</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </router-link> -->
        <div v-if="task.tasktype === 'share'" v-for="(task, index) in tasks" :key="task.id"
            @click="toggleModalVideo(), setCurrentLink(task.link)" class="card card-style shadow-card shadow-card-l"
            data-card-height="150" style="height: 150px;" :style="`background-image:url(/img/tasks/${task.bg}.png`">
            <div class="card-bottom pb-3 px-3">
                <div class="text-end">
                    <h6 class="mb-n1 opacity-80 color-highlight">Current Level</h6>
                    <h3>0</h3>
                </div>
                <h3 class="color-white">{{ task.title }}</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">{{ task.desc }}</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
            <div v-if="modalVideoVisible && currentLink === task.link"
                class="offcanvas offcanvas-bottom rounded-m offcanvas-detached" :class="modalVideoVisible ? 'show' : ''"
                :id="'menu-video-' + task.link">
                <div class="content mt-n2">
                    <h1 class="font-800 font-22 mt-2 mb-0 pt-3">Watch {{ task.title }}</h1>
                    <p>
                        Get some resources for free!
                    </p>
                    <div @click="TWA.openLink(`https://t.me/share/url?url=https://t.me/drugwars_bot/drugwars/start?startapp=${this.$store.state.auth.username}&text=Join Me on DrugWars`)"
                        data-bs-dismiss="offcanvas"
                        class="btn btn-full btn-m shadow-l rounded-s text-uppercase font-600 gradient-highlight">Share
                        on Telegram</div>
                    <div @click="TWA.openLink(`https://twitter.com/share?text=https://t.me/drugwars_bot/drugwars/start?startapp=${this.$store.state.auth.username}`)"
                        data-bs-dismiss="offcanvas"
                        class="btn btn-full btn-m shadow-l rounded-s text-uppercase font-600 gradient-highlight my-2">
                        Share on X (Twitter)</div>

                    <div @click="toggleModalVideo()" data-bs-dismiss="offcanvas"
                        class="close-menu btn btn-full btn-m shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                        Done</div>
                </div>
            </div>
        </div>
        <div v-if="task.tasktype === 'watch'" v-for="(task, index) in tasks" :key="task.id"
            @click="toggleModalVideo(), setCurrentLink(task.link), startTimer(task.timer)"
            class="card card-style shadow-card shadow-card-l" data-card-height="150" style="height: 150px;"
            :style="`background-image:url(/img/tasks/${task.bg}.png`">
            <div class="card-bottom pb-3 px-3">
                <div class="text-end">
                    <h6 class="mb-1 opacity-80 color-highlight">Receive</h6>
                    <h3 class="d-inline-block" v-if="task.rewardType === 'resources' && task.rewards.drug">
                        <Icon name="drug" size="14" />{{ task.rewards.drug }}
                    </h3>
                    <h3 class="d-inline-block ms-3" v-if="task.rewardType === 'resources' && task.rewards.weapon">
                        <Icon name="weapon" size="14" />{{ task.rewards.weapon }}
                    </h3>
                    <h3 class="d-inline-block ms-3" v-if="task.rewardType === 'resources' && task.rewards.alcohol">
                        <Icon name="alcohol" size="14" />{{ task.rewards.alcohol }}
                    </h3>
                    <h3 class="d-inline-block ms-3" v-if="task.rewardType === 'dwtoken' && task.rewards.dwtoken">
                        <Icon name="dwd" size="14" />{{ task.rewards.dwtoken }}
                    </h3>
                    <h3 v-if="task.rewardType === 'unit' && task.rewards.unit.amount"> <img
                            :src="`/img/units/${task.rewards.unit.name}.png`" class="img-fluid rounded-s mx-2"
                            width="32" height="32">{{
                                task.rewards.unit.amount }} {{ units[task.rewards.unit.name].name }}</h3>

                </div>
                <h3 class="color-white">{{ task.name }}</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">{{ task.description }}</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
            <div v-if="modalVideoVisible && currentLink === task.link"
                class="offcanvas offcanvas-bottom rounded-m offcanvas-detached" :class="modalVideoVisible ? 'show' : ''"
                :id="'menu-video-' + task.vlink">
                <div class='responsive-iframe max-iframe'><iframe
                        :src='"https://www.youtube.com/embed/" + task.link + "?autoplay=1"' frameborder='0'
                        allowfullscreen autoplay allow="autoplay"></iframe></div>
                <div class="content mt-n2">
                    <h1 class="font-800 font-22 mt-2 mb-0 pt-3">Watch {{ task.title }}</h1>
                    <p>
                        Get some resources for free!
                    </p>
                    <div class="progress bg-theme border border-yellow-light mb-3" style="height:4px">
                        <div class="progress-bar gradient-yellow" role="progressbar"
                            :style="'width:' + percentage + '%'" :aria-valuenow="percentage" aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <a href="#" data-bs-dismiss="offcanvas"
                        class="close-menu btn btn-full btn-m shadow-l rounded-s text-uppercase font-600 gradient-highlight mt-n2">Done</a>
                </div>
            </div>
        </div>
        <!-- <div v-if="!task.link && !task.vlink" v-for="(task, index) in tasks" :key="task.id"
            class="card card-style shadow-card shadow-card-l" data-card-height="150" style="height: 150px;"
            :style="`background-image:url(/img/tasks/${task.bg}.png`">
            <div class="card-bottom pb-3 px-3">
                <div class="text-end">
                    <h6 class="mb-n1 opacity-80 color-highlight">Current Level</h6>
                    <h3>0</h3>
                </div>
                <h3 class="color-white">{{ task.name }}</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">{{ task.description }}</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </div> -->

        <div class="card card-style">
            <div class="content">
                <form class="demo-animation needs-validation m-0" @submit.prevent="handleSubmit">
                    <div class="form-custom form-label mb-3">
                        <input v-model="newTask.name" type="text" class="form-control rounded-xs" id="c1"
                            placeholder="Task Name" pattern="[A-Za-z ]{1,32}">
                        <label for="c1" class="color-theme form-label-active">Task Name</label>
                    </div>
                    <div class="form-custom form-label mb-3">
                        <input v-model="newTask.description" type="text" class="form-control rounded-xs" id="c2"
                            placeholder="Task Description">
                        <label for="c2" class="color-theme form-label-active">Task Description</label>
                    </div>

                    <div class="form-custom form-label mb-3">
                        <select v-model="newTask.tasktype" class="form-select rounded-xs dropdown-content" id="c3"
                            aria-label="Floating label select example">
                            <option value="watch" selected="">Watch video</option>
                            <option value="follow">Follow on X</option>
                            <option value="like">Like on X</option>
                            <option value="upgrade">Upgrade Building</option>
                            <option value="win">Win fights</option>
                            <option value="share">Share</option>
                        </select>
                        <label for="c3" class="color-theme form-label-active">Select a task type</label>
                    </div>

                    <div class="form-custom form-label dropdown mb-3">
                        <select v-model="newTask.rewardType" class="form-select rounded-xs dropdown-content" id="c6"
                            aria-label="Floating label select example">
                            <option value="resources" selected="">Resources</option>
                            <option value="dwtoken">Token</option>
                            <option value="unit">Units</option>
                        </select>
                        <label for="c1" class="color-theme form-label-active">Select a reward type</label>
                    </div>
                    <div v-if="newTask.tasktype === 'watch'" class="form-custom form-label mb-3">
                        <input v-model="newTask.link" type="text" class="form-control rounded-xs" id="c4"
                            placeholder="0V6YtsJJMw4">
                        <label for="c1" class="color-theme form-label-active">Youtube video ID</label>
                    </div>
                    <div v-if="newTask.tasktype === 'follow'" class="form-custom form-label mb-3">
                        <input v-model="newTask.link" type="text" class="form-control rounded-xs" id="c4"
                            placeholder="@twitterusername">
                        <label for="c4" class="color-theme form-label-active">Account username</label>
                    </div>
                    <div v-if="newTask.tasktype === 'like'" class="form-custom form-label mb-3">
                        <input v-model="newTask.link" type="text" class="form-control rounded-xs" id="c4"
                            placeholder="Twitter post link">
                        <label for="c4" class="color-theme form-label-active">Post link</label>
                    </div>
                    <div v-if="newTask.tasktype === 'upgrade'" class="form-custom form-label mb-3 d-flex">
                        <select v-model="newTask.upgradeType.building" class="form-select rounded-xs dropdown-content"
                            id="c6" aria-label="Floating label select example">
                            <option v-for="(building, index) in buildings" :value="building.id" selected="">
                                {{ building.id }}</option>
                        </select>
                        <input v-model="newTask.upgradeType.level" type="number" class="form-control rounded-xs" id="c1"
                            placeholder="Level" pattern="{1,32}">
                        <label for="c1" class="color-theme form-label-active">Level</label>
                    </div>
                    <div v-if="newTask.tasktype === 'win' || newTask.tasktype === 'production'"
                        class="form-custom form-label mb-3 d-flex">
                        <input v-model="newTask.amount" type="number" class="form-control rounded-xs" id="c1"
                            placeholder="Level" pattern="{1,32}">
                        <label for="c1" class="color-theme form-label-active">How many wins</label>
                    </div>
                    <div v-if="newTask.rewardType === 'resources'" class="d-flex">
                        <div class="form-custom form-label mb-3 d-flex">
                            <input v-model="newTask.rewards.drug" type="number" class="form-control rounded-xs" id="c40"
                                placeholder="DRUG" pattern="{1,32}">
                            <label for="c40" class="color-theme form-label-active">DRUG</label>
                        </div>
                        <div class="form-custom form-label mb-3 d-flex">
                            <input v-model="newTask.rewards.weapon" type="number" class="form-control rounded-xs"
                                id="c41" placeholder="WEAPON" pattern="{1,32}">
                            <label for="c41" class="color-theme form-label-active">WEAPON</label>
                        </div>
                        <div class="form-custom form-label mb-3 d-flex">
                            <input v-model="newTask.rewards.alcohol" type="number" class="form-control rounded-xs"
                                id="c42" placeholder="ALCOHOL" pattern="{1,32}">
                            <label for="c42" class="color-theme form-label-active">ALCOHOL</label>
                        </div>
                    </div>
                    <div v-if="newTask.rewardType === 'dwtoken'" class="form-custom form-label mb-3 d-flex">
                        <input v-model="newTask.rewards.dwtoken" type="number" class="form-control rounded-xs" id="c1"
                            placeholder="TOKEN" pattern="{1,32}">
                        <label for="c1" class="color-theme form-label-active">TOKEN</label>
                    </div>
                    <div v-if="newTask.rewardType === 'unit'" class="d-flex">
                        <div class="form-custom form-label mb-3 col-6">
                            <select v-model="newTask.rewards.unit.name" class="form-select rounded-xs dropdown-content"
                                id="c6" aria-label="Floating label select example">
                                <option v-if="!unit.npc" v-for="(unit, index) in units" :value="unit.id" selected="">
                                    {{ unit.id }}</option>
                            </select>
                            <label for="c1" class="color-theme form-label-active">Select a unit type</label>
                        </div>
                        <div class="form-custom form-label mb-3 col-6">

                            <input v-model="newTask.rewards.unit.amount" type="number" class="form-control rounded-xs"
                                id="c1" placeholder="Amount" pattern="{1,32}">
                            <label for="c1" class="color-theme form-label-active">Amount</label>
                        </div>
                    </div>
                    <div class="form-custom form-label mb-3 d-flex">
                        <select v-model="newTask.bg" class="form-select rounded-xs dropdown-content" id="c6"
                            aria-label="Floating label select example">
                            <option v-for="(bg, index) in bgs" :value="bg" selected="">
                                {{ bg }}</option>
                        </select>
                        <label for="c1" class="color-theme form-label-active">Task background</label>
                    </div>


                    <div class="card card-style shadow-card shadow-card-l" data-card-height="150" style="height: 150px;"
                        :style="`background-image:url(/img/tasks/${newTask.bg}.png`">
                        <div class="card-bottom pb-3 px-3">
                            <div class="text-end">
                                <h6 class="mb-n2 opacity-80 color-highlight">Receive</h6>
                                <h3 v-if="newTask.rewardType === 'resources' && newTask.rewards.drug">
                                    <Icon name="drug" size="14" />{{ newTask.rewards.drug }}
                                </h3>
                                <h3 v-if="newTask.rewardType === 'resources' && newTask.rewards.weapon">
                                    <Icon name="weapon" size="14" />{{ newTask.rewards.weapon }}
                                </h3>
                                <h3 v-if="newTask.rewardType === 'resources' && newTask.rewards.alcohol">
                                    <Icon name="alcohol" size="14" />{{ newTask.rewards.alcohol }}
                                </h3>
                                <h3 v-if="newTask.rewardType === 'dwtoken' && newTask.rewards.dwtoken">
                                    <Icon name="dwd" size="14" />{{ newTask.rewards.dwtoken }}
                                </h3>
                                <h3 v-if="newTask.rewardType === 'unit' && newTask.rewards.unit.amount"> <img
                                        :src="`/img/units/${newTask.rewards.unit.name}.png`"
                                        class="img-fluid rounded-s mx-2" width="32" height="32">{{
                                            newTask.rewards.unit.amount }} {{ units[newTask.rewards.unit.name].name }}</h3>

                            </div>
                            <h3 class="color-white">{{ newTask.name }}</h3>
                            <p class="color-white opacity-70 mb-0 mt-n1">{{ newTask.description }}</p>
                        </div>
                        <div class="card-overlay bg-gradient-fade opacity-80"></div>
                    </div>
                    <button class="btn btn-full bg-blue-dark rounded-xs text-uppercase font-700 w-100 btn-s mt-4"
                        type="submit">Submit Task</button>
                </form>
            </div>
        </div>
    </div>
</template>



<script>
import { mapActions } from 'vuex';
import tasks from '@/../tasks.json';
import client from '@/helpers/client';
import { buildings, units } from 'drugwars';

export default {
    data() {
        return {
            newTask: { bg: 26, link: '', tasktype: 'watch', rewardType: 'resources', upgradeType: { building: 'headquarters', level: 0 }, rewards: { drug: 0, weapon: 0, alcohol: 0, dwtoken: 0, unit: { name: "spy", amount: 0 } } },
            tasks: [],
            userTasks: [],
            percentage: 0,
            timer: 0,
            units,
            buildings,
            bgs: []
        };
    },
    created() {
        for (let index = 0; index < 40; index++) {
            this.bgs.push(index + 1);

        }
        this.load_tasks()
        this.completeTask({id:4})
    },
    methods: {
        ...mapActions(['init', 'login', 'toggleModalVideo', 'setCurrentLink', 'addTask', 'completeTask']),
        load_tasks() {
            this.usertasks = [];
            const params = { user: this.$store.state.auth.username }
            client.requestAsync('get_tasks', params).then(result => {
                console.log(result)
                if (result[0])
                console.log(result[0])
                    result[0].forEach(element => {
                        element.rewards = JSON.parse(element.rewards)
                        element.upgradeType = JSON.parse(element.upgradeType)
                    });
                this.tasks = result[0]
                if (result[1])
                    this.usertasks = result[1];
                this.isLoading = false;
            });
        },
        async handleSubmit() {
            await this.addTask(this.newTask)
        },
        startTimer(time) {
            const self = this;
            self.percentage = 0;
            self.timer = time || 10;
            let viewTimer = setInterval(function () {
                self.percentage++;
                if (self.percentage > self.timer) {
                    console.log(self.$store.state.game.currentLink)
                    clearInterval(viewTimer);
                    self.completeTask({id:self.tasks.find((t) => self.$store.state.game.currentLink === t.link).id})
                }
            }, 1000);
        }
    },
    computed: {
        user() {
            return this.$store.state.game.user;
        },
        hasTwitter() {
            return this.$store.state.game.user.user.twitter;
        },
        server() {
            return this.$store.state.game.server;
        },
        modalVideoVisible() {
            return this.$store.state.ui.modalVideoVisible;
        },
        currentLink() {
            return this.$store.state.game.currentLink;
        },
    },
};
</script>

<style lang="scss" scoped>
.dropdown-content option {
    appearance: none;
    width: 100%;
    font-size: 1.15rem;
    padding: 0.675em 6em 0.675em 1em;
    background-color: #fff;
    border: 1px solid #caced1;
    border-radius: 0.25rem;
    color: #000;
    cursor: pointer;
}
</style>