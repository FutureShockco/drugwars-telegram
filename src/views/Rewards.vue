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
                <div class="d-flex">
                    <div>
                        <h6 class="mb-n1 opacity-80 color-highlight">DrugWars Rewards System</h6>
                        <h3>Production Rewards</h3>
                    </div>
                </div>
                <p>Every day, players can earn up to 1,000+ DW TOKEN as part of their daily drug production. This reward
                    accumulates automatically based on your in-game production capabilities. The rewards pool automatically increase by 100 tokens for every additional 1000 active players.
                </p>
                <h3>Pablo Rewards</h3>
                <p>Each week, players can earn TON tokens by selling their DRUG <Icon class="mx-1" name="drug"/> to Pablo. These rewards are funded by the game treasury and by user purchases. Each purchase contributes to the pool, which is redistributed at a rate of 1% per week.
                </p>
                <h3>Fight Rewards</h3>
                <p>After each fight, you may earn DW TOKEN instantly. These rewards are given immediately upon the
                    conclusion of each fight, and the number of units killed, reflecting your combat prowess. Rewards for battles increase automatically based on the in-game population and units.
                </p>
            </div>
        </div>
    </div>
</template>
