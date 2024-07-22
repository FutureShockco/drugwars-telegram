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
                <div @click="TWA.openLink('https://apitelegram.drugwars.io/twitter/login/' + TWA.initData)"
                    class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-blue my-1">
                    Link Now</div>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </div>
        <div class="card card-style shadow-card shadow-card-l show" data-card-height="150" style="height: 150px;"
            :style="`background-image:url(/img/tasks/1.png`"
            :class="dailyRewards.last_connect === dayCheck ? 'opacity-50' : ''">
            <div class="card-bottom pb-3 px-3">
                <div class="text-end">
                    <h6 class="mb-n1 opacity-80 color-highlight">Level</h6>
                    <router-link to="/referral">
                        <h3>{{ dailyRewards.level + 1 }}</h3>
                    </router-link>
                </div>
                <h3 class="color-white">Daily Rewards</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">Come everyday to get your dose!</p>
                <div v-if="dailyRewards.last_connect !== dayCheck" @click="toggleModalVideo(), setCurrentLink('daily')"
                    class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-red my-1">
                    Claim now</div>
                <div v-else class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-red my-1">
                    Come back tomorrow</div>
            </div>
            <div v-if="modalVideoVisible && currentLink === 'daily'"
                class="offcanvas offcanvas-bottom rounded-m offcanvas-detached" :class="modalVideoVisible ? 'show' : ''"
                :id="'menu-video-' + 'daily'">
                <div class="content mt-n2">
                    <h1 class="font-800 font-22 mt-2 mb-0 pt-3">Daily Rewards </h1>
                    <h6 class="mt-0 pt-0 color-red-dark" v-if="didReset">Oops! Your progress has been reset.</h6>
                    <p>
                        Get some resources or units for free! Each time you complete a week you will increase your
                        rewards level.
                    </p>

                    <div class="row gx-3">
                        <div class="col-3" v-for="(reward, index) in dailyRewards.rewards">
                            <div @click="claimDaily(), toggleModalVideo(), setCurrentLink(null)"
                                :class="[reward.day === parseInt(dailyRewards.current_day) ? 'bg-theme gradient-border' : 'opacity-50 border border-yellow-dark no-pointer', reward.day < parseInt(dailyRewards.current_day) ? 'bg-green btn btn-xs' : '']"
                                class="p-0 me-2 mb-3  badge  text-center w-100" style="border-radius:10px;">
                                <h4 class="bg-highlight" style="border-radius:8px 8px 0px 0px;">Day {{
                                    reward.day }}
                                </h4>
                                <div v-if="reward.reward.type === 'resource'">
                                    <h6 class="d-block" v-if="reward.reward.drug">
                                        <Icon name="drug" size="10" />{{ reward.reward.drug }}
                                    </h6>
                                    <h6 class="d-block" v-if="reward.reward.weapon">
                                        <Icon name="weapon" size="10" />{{ reward.reward.weapon }}
                                    </h6>
                                    <h6 class="d-block" v-if="reward.reward.alcohol">
                                        <Icon name="alcohol" size="10" />{{ reward.reward.alcohol }}
                                    </h6>
                                </div>
                                <div v-else>
                                    <img style="border: 1px solid #392828;    "
                                        :src="`/img/units/${reward.reward.name}.png`" class="img-fluid rounded-s"
                                        width="50">
                                    <h6 class="d-block">
                                        X{{ reward.reward.amount }}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div @click="claimDaily(), toggleModalVideo(), setCurrentLink(null)"
                        class="btn mb-3 btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-green">
                        Claim</div>
                    <div @click="toggleModalVideo(), setCurrentLink(null)"
                        class="close-menu btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                        Done</div>
                </div>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </div>
        <div v-for="(task, index) in tasks" :key="task.id">
            <div v-if="task.tasktype === 'share'" class="card card-style shadow-card shadow-card-l"
                data-card-height="150" style="height: 150px;" :style="`background-image:url(/img/tasks/${task.bg}.png`">
                <div class="card-bottom pb-3 px-3">
                    <div class="text-end">
                        <h6 class="mb-n1 opacity-80 color-highlight">Bonus</h6>
                        <router-link to="/referral">
                            <h3>Check referrals</h3>
                        </router-link>
                    </div>
                    <h3 class="color-white">{{ task.name }}</h3>
                    <p class="color-white opacity-70 mb-0 mt-n1">{{ task.description }}</p>
                    <div @click="toggleModalVideo(), setCurrentLink(task.link)"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-blue my-1">
                        Share Now</div>
                </div>
                <div class="card-overlay bg-gradient-fade opacity-80"></div>
                <div v-if="modalVideoVisible && currentLink === task.link"
                    class="offcanvas offcanvas-bottom rounded-m offcanvas-detached"
                    :class="modalVideoVisible ? 'show' : ''" :id="'menu-video-' + task.link">
                    <div class="content mt-n2">
                        <h1 class="font-800 font-22 mt-2 mb-0 pt-3">Watch {{ task.title }}</h1>
                        <p>
                            Get some resources for free!
                        </p>
                        <div @click="TWA.openLink(`https://t.me/share/url?url=https://t.me/drugwars_bot/drugwars/start?startapp=${$store.state.auth.username}&text=Join Me on DrugWars`)"
                            class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                            Share
                            on Telegram</div>
                        <div @click="TWA.openLink(`https://twitter.com/share?text=https://t.me/drugwars_bot/drugwars/start?startapp=${$store.state.auth.username}`)"
                            class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight my-3">
                            Share on X (Twitter)</div>

                        <div @click="toggleModalVideo(), setCurrentLink(null)"
                            class="close-menu btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                            Done</div>
                    </div>
                </div>
            </div>
            <div v-if="task.tasktype === 'watch'" class="card card-style shadow-card shadow-card-l"
                data-card-height="150" style="height: 150px;" :style="`background-image:url(/img/tasks/${task.bg}.png`"
                :class="task.completed === 1 ? 'opacity-50' : ''">
                <div class="card-bottom pb-3 px-3">
                    <TaskResources :task="task" />
                    <h3 class="color-white">{{ task.name }}</h3>
                    <p class="color-white opacity-70 mb-0 mt-n1">{{ task.description }}</p>
                    <div v-if="task.completed === 0"
                        @click="toggleModalVideo(), setCurrentLink(task.link), startTimer(task.timer)"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-green">Watch the
                        video</div>


                </div>
                <div class="card-overlay bg-gradient-fade opacity-80"></div>
                <div v-if="modalVideoVisible && currentLink === task.link"
                    class="offcanvas offcanvas-bottom rounded-m offcanvas-detached"
                    :class="modalVideoVisible ? 'show' : ''" :id="'menu-video-' + task.vlink">
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
                        <a @click="toggleModalVideo()"
                            class="close-menu btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight mt-n2">Done</a>
                    </div>
                </div>
            </div>

            <div v-if="task.tasktype === 'join'" class="card card-style shadow-card shadow-card-l"
                data-card-height="150" style="height: 150px;" :style="`background-image:url(/img/tasks/${task.bg}.png`"
                :class="task.user && task.completed === 1 ? 'opacity-50' : ''">
                <div class="card-bottom pb-3 px-3">
                    <div class="text-end">
                        <TaskResources :task="task" />

                    </div>
                    <h3 class="color-white">{{ task.name }}</h3>
                    <p class="color-white opacity-70 mb-0 mt-n1">{{ task.description }}</p>
                    <div v-if="!task.user && task.completed === 0"
                        @click="TWA.openLink(`https://t.me/${task.link}`), completeTask({ id: task.id }), refreshTask()"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">Join
                        the {{ task.link }} channel</div>
                    <div v-else-if="task.user && task.completed === 0"
                        @click="verifyTask({ id: task.id }), refreshTask()"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                        Verify and get paid now</div>
                </div>
                <div class="card-overlay bg-gradient-fade opacity-80"></div>
            </div>

            <div v-if="hasTwitter && task.tasktype === 'follow'" class="card card-style shadow-card shadow-card-l"
                data-card-height="150" style="height: 150px;" :style="`background-image:url(/img/tasks/${task.bg}.png`"
                :class="task.user && task.completed === 1 ? 'opacity-50' : ''">
                <div class="card-bottom pb-3 px-3">
                    <div class="text-end">
                        <TaskResources :task="task" />
                    </div>
                    <h3 class="color-white">{{ task.name }}</h3>
                    <p class="color-white opacity-70 mb-0 mt-n1">{{ task.description }} </p>
                    <div v-if="!task.user && task.completed === 0"
                        @click="TWA.openLink(`https://x.com/${task.link}`), completeTask({ id: task.id }), refreshTask()"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                        Follow
                        the {{ task.link }} account </div>

                    <div v-else-if="task.user && task.completed === 0 && task.time > now"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight opacity-80">
                        Verification in process {{ (new Date().getTime() - new Date(task.time).getTime()) | ms }}</div>
                    <div v-else-if="task.user && task.completed === 0"
                        @click="verifyTask({ id: task.id }), refreshTask()"
                        class="btn btn-full btn-xs shadow-l rounded-s text-uppercase font-600 gradient-highlight">
                        Verify and get paid</div>
                </div>
                <div class="card-overlay bg-gradient-fade opacity-80"></div>
            </div>
        </div>
        <div class="card card-style" v-if="user.user.username === '354640397' || user.user.username === '1995273768'">
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
                            <option value="join" selected="">Join Telegram Channel</option>
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
                    <div v-if="newTask.tasktype === 'follow' || newTask.tasktype === 'join'"
                        class="form-custom form-label mb-3">
                        <input v-model="newTask.link" type="text" class="form-control rounded-xs" id="c4"
                            placeholder="@twitterusername">
                        <label for="c4" class="color-theme form-label-active">Channel name</label>
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
                                <TaskResources :task="newTask" />

                            </div>
                            <h3 class="color-white">{{ newTask.name }}</h3>
                            <p class="color-white opacity-70 mb-0 mt-n1">{{ newTask.description }}</p>
                        </div>
                        <div class="card-overlay bg-gradient-fade opacity-80"></div>
                    </div>
                    <UiButton class="btn btn-full bg-blue-dark rounded-xs text-uppercase font-700 w-100 btn-s mt-4"
                        type="submit">Submit Task</UiButton>
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
            dailyRewards: [],
            percentage: 0,
            timer: 0,
            didReset: false,
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
    },
    methods: {
        ...mapActions(['init', 'login', 'closeModalVideo', 'toggleModalVideo', 'setCurrentLink', 'addTask', 'completeDay', 'completeTask', 'verifyTask']),
        load_tasks() {
            this.usertasks = [];
            const params = { user: { id: this.$store.state.auth.username } }
            console.log(params)
            client.requestAsync('get_tasks', params).then(result => {
                console.log(result)
                if (result[0])
                    console.log(result[0])
                result[0].forEach(element => {
                    element.rewards = JSON.parse(element.rewards)
                    element.upgradeType = JSON.parse(element.upgradeType)
                });
                this.tasks = result[0]
                if (result[1]) {
                    this.usertasks = result[1];
                    this.tasks.forEach(element => {
                        element.completed = 0;
                        element.paid = 0;
                        element.user = false;
                        element.time = new Date()
                            .toISOString()
                            .slice(0, 19)
                            .replace('T', ' ');
                        if (this.usertasks.find(u => u.task_id === element.id)) {
                            element.user = true;
                            element.time = this.usertasks.find(u => u.task_id === element.id).time;
                            element.completed = this.usertasks.find(u => u.task_id === element.id).completed;
                            element.paid = this.usertasks.find(u => u.task_id === element.id).paid;
                        }
                    });
                }
                console.log(result)
                const rewards = result[2][0]
                this.dailyRewards = rewards
                this.dailyRewards.rewards = JSON.parse(this.dailyRewards.rewards)
                const lastConnectDate = this.parseDate(this.dailyRewards.last_connect);
                const now = new Date();
                const diffHours = this.getHoursDifference(lastConnectDate, now);
                if (diffHours >= 48) {
                    this.dailyRewards.current_day = 1
                    this.didReset = true
                }
                this.tasks.sort(function (a, b) { return a.completed - b.completed });
                this.isLoading = false;
            });
        },
        parseDate(dateStr) {
            const [day, month, year] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day);
        },

        getHoursDifference(date1, date2) {
            const diffMs = date2 - date1;
            return diffMs / (1000 * 60 * 60);
        },
        async handleSubmit() {
            await this.addTask(this.newTask)
            this.refreshTask()
        },
        async refreshTask() {
            const self = this;
            setTimeout(() => {
                self.load_tasks()
            }, 3000);

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
                    self.completeTask({ id: self.tasks.find((t) => self.$store.state.game.currentLink === t.link).id })
                }
            }, 1000);
        },
        async claimDaily() {
            await this.completeDay({})
            this.load_tasks()
        }
    },
    computed: {

        now() {
            return new Date(this.$store.state.ui.timestamp)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
        },
        dayCheck() {
            const rDate = new Date();
            return `${rDate.getUTCDate()}-${rDate.getUTCMonth() + 1}-${rDate.getUTCFullYear()}`; // Format date as DD-MM-YYYY
        },
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


.gradient-border {
    position: relative;
    background: linear-gradient(0deg, #000, #272727);
    border-radius: 10px;
    cursor: pointer;
}

.gradient-border:before,
.gradient-border:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094,
            #0000ff, #00ff00, #ffff00, #ff0000);
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    border-radius: 10px;
    animation: steam 20s linear infinite;
}

@keyframes steam {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}

.gradient-border:after {
    filter: blur(50px);
}

.no-pointer {
    pointer-events: none;
}
</style>