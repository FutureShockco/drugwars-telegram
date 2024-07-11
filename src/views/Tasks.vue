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
        <div v-for="(task, index) in tasks" :key="index" class="card card-style shadow-card shadow-card-l"
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
        </div>
    </div>
</template>



<script>
import { mapActions } from 'vuex';
import tasks from '@/../tasks.json';

export default {
    data() {
        return {
            rnd: [],
            tasks: tasks,
        };
    },
    created() {

    },
    methods: {
        ...mapActions(['init', 'login']),

    },
    computed: {
        server() {
            return this.$store.state.game.server;
        },


    },
};
</script>
