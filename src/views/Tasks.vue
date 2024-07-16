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
        <router-link :to="task.link" v-if="task.link" v-for="(task, index) in tasks" :key="index"
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
        </router-link>
        <div v-if="task.vlink" v-for="(task, index) in tasks" :key="index"
            @click="toggleModalVideo(), setVideoLink(task.vlink)" class="card card-style shadow-card shadow-card-l"
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
            <div v-if="task.vlink && modalVideoVisible" class="offcanvas offcanvas-bottom rounded-m offcanvas-detached"
                :class="modalVideoVisible ? 'show' : ''" :id="'menu-video-' + task.vlink">
                <div class='responsive-iframe max-iframe'><iframe :src='"https://www.youtube.com/embed/" + task.vlink'
                        frameborder='0' allowfullscreen></iframe></div>
                <div class="content mt-n2">
                    <h1 class="font-800 font-22 mt-2 mb-0 pt-3">Watch {{ task.title }}</h1>
                    <p>
                        Get some resources for free!
                    </p>
                    <a href="#" data-bs-dismiss="offcanvas"
                        class="close-menu btn btn-full btn-m shadow-l rounded-s text-uppercase font-600 gradient-highlight mt-n2">Done</a>
                </div>
            </div>
        </div>
        <div v-if="!task.link && !task.vlink" v-for="(task, index) in tasks" :key="index"
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
        </div>

    </div>
</template>



<script>
import { mapActions } from 'vuex';
import tasks from '@/../tasks.json';

export default {
    data() {
        return {
            tasks: tasks,
            usertasks: []
        };
    },
    created() {

    },
    methods: {
        ...mapActions(['init', 'login', 'toggleModalVideo', 'setVideoLink']),
        load_tasks(start) {
            this.usertasks = [];
            const params = { user: this.$store.state.auth.username }
            client.requestAsync('get_user_tasks', params).then(result => {
                this.usertasks = result.tasks;
                this.isLoading = false;
            });
        },
    },
    computed: {
        server() {
            return this.$store.state.game.server;
        },
        modalVideoVisible() {
            return this.$store.state.ui.modalVideoVisible;
        },
    },
};
</script>
