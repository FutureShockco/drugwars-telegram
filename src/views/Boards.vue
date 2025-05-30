<template>
    <div>
        <RewardsTabs />

        <div class="card mx-0 border-bottom-highlight mb-1">
            <div class="content mb-1">
                <h6 class="font-700 mb-n1 color-highlight">Your next rival is there</h6>
                <h1 class="pb-1">Leaderboard</h1>
            </div>
            <div class="content d-flex mt-0 mb-1">
                <div class="me-1">Last visit:</div>
                <div class="me-1"><span class="text-red">0h-6h</span></div>-
                <div class="mx-1"><span class="text-orange">6h-24h</span></div>-
                <div class="mx-1"><span class="text-blue">72h+</span></div>-
                <div class="ms-1"><span class="text-magenta">NA</span></div>
            </div>
            <div class="tabs tabs-pill mx-3">
                <div class="tab-controls">
                    <a @click="setTab('production')" class="font-13" :aria-expanded="currenTab === 'production'">Production</a>
                    <a @click="setTab('pablo')" class="font-13" :aria-expanded="currenTab === 'pablo'">Pablo</a>
                    <a @click="setTab('fights')" class="font-13" :aria-expanded="currenTab === 'fights'">Fight</a>
                    <!-- <a @click="setTab('contracts')" class="font-13" :aria-expanded="currenTab === 'contracts'">Contract</a> -->
                </div>
                <div class="card card-style mx-0">
                    <div class="collapse" :class="currenTab === 'production' ? 'show' : ''">
                        <LeaderboardsProduction />
                    </div>
                    <div class="collapse" :class="currenTab === 'pablo' ? 'show' : ''">
                        <LeaderboardsPablo />
                    </div>
                    <div class="collapse" :class="currenTab === 'fights' ? 'show' : ''">
                        <LeaderboardsFight />
                    </div>
                    <div class="collapse" :class="currenTab === 'contracts' ? 'show' : ''">
                        <LeaderboardsContracts />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            currenTab:  this.$route.meta.base
        };
    },
    methods: {
        ...mapActions(['init', 'login']),
        setTab(value) {
            this.currenTab = value
        },

    },
};
</script>
