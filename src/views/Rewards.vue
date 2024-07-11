<template>
    <div>
        <RewardsTabs />
        <router-link to="/help" class="card card-style shadow-card shadow-card-l bg-25" data-card-height="150"
            style="height: 150px;">
            <div class="card-bottom pb-3 px-3">
                <h3 class="color-white">DrugWars</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">FAQ: How to Get Paid to Rule Your World!</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </router-link>
        <Prize />
        <div class="card card-style">
            <div class="content">
                <h6 class="font-700 mb-n1 color-highlight">Your next rival is there</h6>
                <h1 class="pb-2">Leaderboard</h1>
            </div>

            <div class="tabs tabs-cards mx-3" id="tab-group-5">
                <div class="tab-controls">
                    <a class="font-13" data-bs-toggle="collapse" href="#tab-13" aria-expanded="true">Board</a>
                    <a class="font-13" data-bs-toggle="collapse" href="#tab-14" aria-expanded="false">Pablo</a>
                    <!-- <a class="font-13" data-bs-toggle="collapse" href="#tab-15" aria-expanded="false">Contact</a> -->
                </div>
                <div class="card card-style">
                    <div class="collapse show" id="tab-13" data-bs-parent="#tab-group-5">
                        <LeaderboardsProduction />
                    </div>
                    <div class="collapse" id="tab-14" data-bs-parent="#tab-group-5">
                        <LeaderboardsPablo />
                    </div>
                    <!-- <div class="collapse" id="tab-15" data-bs-parent="#tab-group-5">
                        <p class="content">Some placeholder content for the collapse component. This panel is hidden by
                            default but revealed when the user activates the relevant trigger.</p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
