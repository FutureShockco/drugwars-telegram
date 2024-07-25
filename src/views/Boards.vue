<template>
    <div>
        <RewardsTabs />

        <div class="card card-style">
            <div class="content">
                <h6 class="font-700 mb-n1 color-highlight">Your next rival is there</h6>
                <h1 class="pb-2">Leaderboard</h1>
            </div>

            <div class="tabs tabs-pill mx-3" id="tab-group-5">
                <div class="tab-controls p-1">
                    <a class="font-13" data-bs-toggle="collapse" href="#tab-13" aria-expanded="true">Production</a>
                    <a class="font-13" data-bs-toggle="collapse" href="#tab-14" aria-expanded="false">Pablo</a>
                    <a class="font-13" data-bs-toggle="collapse" href="#tab-15" aria-expanded="false">Fight</a>
                </div>
                <div class="card card-style mx-0">
                    <div class="collapse show" id="tab-13" data-bs-parent="#tab-group-5">
                        <LeaderboardsProduction />
                    </div>
                    <div class="collapse" id="tab-14" data-bs-parent="#tab-group-5">
                        <LeaderboardsPablo />
                    </div>
                    <div class="collapse" id="tab-15" data-bs-parent="#tab-group-5">
                        <LeaderboardsFight />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
