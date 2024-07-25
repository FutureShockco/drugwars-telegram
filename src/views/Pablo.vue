<template>
    <div>
        <RewardsTabs />
        <div class="card card-style shadow-card shadow-card-l bg-23" data-card-height="150" style="height: 150px;">
            <div class="card-bottom pb-3 px-3">
                <h3 class="color-white">Pablo Escrowbar</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">The king of drugs!</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </div>
        <Heist />
        <div class="card card-style shadow-card shadow-card-l" data-card-height="150" style="height: 150px;"
            :style="`background-image:url(/img/tasks/42.jpg`">
            <div class="card-bottom pb-3 px-3">
                <h3 class="color-white">Increase your bonus</h3>
                <p class="color-white opacity-70 mb-0 mt-n1">Each of your refferal who spent TON tokens give you 0.01%
                    DRUG bonus when depositing.</p>
            </div>
            <div class="card-overlay bg-gradient-fade opacity-80"></div>
        </div>
    </div>
</template>
