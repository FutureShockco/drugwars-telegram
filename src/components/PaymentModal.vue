<template>
    <div class="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme show"
        style="width: 340px; visibility: visible;" id="menu-share-thumbs" aria-modal="true" role="dialog">
        <div class="content">
            <div class="text-center pb-3">
                <h5 class="mb-n1 font-12 color-highlight font-700 text-uppercase pt-1">Just tap and</h5>
                <h1 class="font-700">Instant Purchase</h1>
            </div>
            <div class="d-flex px-4">
                <div class="col-6 text-center">
                    <UiButton class="btn border-blue-dark" @click="handleRequestPayment(), toggleModalPayment()"
                        :disabled="tutorialStep < 9 || currentPayment.ton.amount / 1000000000 < 0.00001">
                        <Icon name="ton" size="50" />
                    </UiButton>
                    <span class="d-block font-10 color-theme font-600 text-uppercase pt-1">{{
                        parseFloat(currentPayment.ton.amount / 1000000000).toFixed(5)
                        }} TON</span>
                </div>
                <div class="col-6 text-center">
                    <UiButton :disabled="notEnoughDWD || currentPayment.price < 0.0001" class="btn border-yellow-dark"
                        @click="handleSubmit(), toggleModalPayment()">
                        <Icon name="dwd" style="font-size: 50px;line-height: 46px;" />
                    </UiButton>
                    <span class="d-block font-10 color-theme font-600 text-uppercase pt-1">{{ currentPayment.price }}
                        DW</span>
                </div>

            </div>
            <!-- <div class="col-12 text-center px-5">
                    <UiButton :disabled="notEnoughDWD || currentPayment.price < 0.0001" class="btn btn-xxs border-magenta-dark w-100"
                        @click="handleSubmit(), toggleModalPayment()"> OR Share payment link
                    </UiButton>
                 
                </div> -->
            <div class="text-center pt-3">
                <UiButton @click="toggleModalPayment(), setCurrentPayment(null)" class="btn btn-xxs gradient-red">
                    Cancel
                </UiButton>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {

    computed: {
        currentPayment() {
            return this.$store.state.ui.currentPayment
        },
        tutorialStep() {
            return this.$store.state.game.user.user.tutorial
        },
        notEnoughDWD() {
            const user = this.$store.state.game.user;
            if (!user || !user.user) return true;
            
            const userDwd = parseFloat(user.user.dwd) || 0;
            const price = parseFloat(this.currentPayment && this.currentPayment.price) || 0;
            
            console.log('DWD Check:', { userDwd, price, hasEnough: userDwd >= price });
            return price > userDwd;
        },
    },
    methods: {
        ...mapActions(['upgradeBuilding', 'recruitUnit', 'upgradeTraining', 'requestPayment', 'toggleModalPayment', 'setCurrentPayment']),
        handleSubmit() {
            if (this.currentPayment.type === 'building')
                this.upgradeBuilding(this.currentPayment.dwd)
                    .then(() => {
                    })
                    .catch(e => {
                        console.error('Failed', e);
                    });
            if (this.currentPayment.type === 'unit')
                this.recruitUnit(this.currentPayment.dwd)
                    .then(() => {
                    })
                    .catch(e => {
                        console.error('Failed', e);
                    });
            if (this.currentPayment.type === 'training')
                this.upgradeTraining(this.currentPayment.dwd)
                    .then(() => {
                    })
                    .catch(e => {
                        console.error('Failed', e);
                    });
        },
        async handleRequestPayment() {
            this.requestPayment(this.currentPayment.ton);
        },
    },
};
</script>

<style scoped lang="less">
.checkout {
    text-align: center;
    width: 180px;
}

.dwdicon {
    width: 22px;
    left: 0px;
    position: relative;
    float: left;
    top: 5px;
}
</style>
