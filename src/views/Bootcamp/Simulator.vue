<template>
    <div>
        <BootcampTabs />
        <div class="mt-2">
            <div class="row">
                <div class="col-6 border-red-dark card shadow-card shadow-card-l">
                    <div class="row mx-0">
                        <h3 class="text-red mb-2">UNITS</h3>
                        <div class="col-4 unitname px-1" v-if="unit.key !== 'occupation_troop'" v-for="unit in attacker"
                            :key="unit.key">
                            <img class="img-fluid" :src="`/img/units/${unit.key}.png`">
                            <div class="text-yellow text-truncate">{{ unit.key }}</div>
                            <input v-model="unit.amount" type="number" class="form-control mb-2" /></input>
                        </div>
                        <div>
                            <h3 class="text-red mb-2">TRAININGS</h3>
                        </div>
                        <div class="col-4 unitname px-1" v-for="training in attackertrainings" :key="training.key"
                            v-if="attackertrainings.length > 0 && (training.key !== 'routing' && training.key !== 'information')">
                            <img class="img-fluid" :src="`/img/trainings/${training.key}.png`">
                            <div class="text-yellow text-truncate">{{ training.key }}</div>
                            <input v-model="training.lvl" type="number" class="form-control mb-2" /></input>
                        </div>
                        <div class="col mt-2 d-flex">
                            <button @click="handleResetMyUnits" class="btn btn-xs me-2 border-blue-dark mb-2">
                                Reset
                            </button>
                            <button @click="handleLoadMyUnits" class="btn btn-xs border-blue-dark mb-2">
                                Reload
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-6 border border-blue-dark card shadow-card shadow-card-l">
                    <div class="row  mx-0">
                        <h3 class="text-right text-blue mb-2">UNITS
                            <!-- <div class="float-right">
                        <button @click="ChooseDefender('player')" class="btn mini mb-2"
                            :class="{ 'btn-primary': this.defender_type === 'player' }">
                            Player
                        </button>
                        <button @click="ChooseDefender('npc')" class="btn mini mb-2"
                            :class="{ 'btn-primary': this.defender_type === 'npc' }">
                            NPC
                        </button>
                    </div> -->
                        </h3>
                        <div class="col-4 unitname px-1" v-if="unit.key !== 'occupation_troop'" v-for="unit in defender"
                            :key="unit.key">
                            <img class="img-fluid" :src="`/img/units/${unit.key}.png`">
                            <div class="text-yellow text-truncate">{{ unit.key }}</div>
                            <input v-model="unit.amount" type="number" class="form-control mb-2" /></input>
                        </div>
                        <div>
                            <h3 v-if="defender_type === 'player'" class="text-right text-blue mb-2 ">TRAININGS</h3>
                        </div>
                        <div v-if="defender_type === 'player' && training.key !== 'routing' && training.key !== 'information'"
                            class="col-4 unitname px-1" v-for="training in defendertrainings" :key="training.key">
                            <img class="img-fluid" :src="`/img/trainings/${training.key}.png`">
                            <div class="text-yellow text-truncate">{{ training.key }}</div>
                            <input v-model="training.lvl" type="number" class="form-control mb-2" /></input>
                        </div>
                        <!-- <h3 v-if="defender_type === 'player'" class="text-blue mb-2 ">DEFENSE</h3>
                <div v-if="defender_type === 'player' && building.key !== 'camera'" class="col-3 unitname"
                    v-for="building in defenderbuildings" :key="building.key">
                    <img class="img-fluid" :src="`/img/buildings/${building.key}.png`"
                        >
                    <div>{{ building.key }}</div>
                    <input v-model="building.lvl" type="number" class="form-control mb-2" /></input>
                </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="card py-3">
            <div class="text-center">
                <button @click="handleSubmit" class="btn btn-xxs gradient-highlight">
                    Submit
                </button>
                <button @click="handleReset" class="btn btn-xxs gradient-red">
                    Reset
                </button>
            </div>
        </div>
        <div v-if="result.result" class="row mx-0 result">
            <div class="col col-6 px-2 py-4 attacker text-center card mx-0 border-red-dark border-bottom-0">
                <div>
                    <h5>Attacker Start</h5>
                    <div v-if="result.attacker.start_value">
                        <span>
                            Supply
                            <span class="text-yellow"> {{ formatNumber(result.attacker.start_value.supply) }}</span> |
                        </span>
                        <span>
                            Power
                            <span class="text-yellow"> {{ result.attacker.start_value.power }}</span>
                        </span>

                        <div>
                            <h5 class="mt-3">Army Value</h5>
                            <div class="d-flex">
                                <span class="col-4" v-if="result.attacker.start_value.cost.drug_cost">
                                    <Icon name="drug" />
                                    <div>{{ formatNumber(result.attacker.start_value.cost.drug_cost) }}</div>
                                </span>
                                <span class="col-4" v-if="result.attacker.start_value.cost.weapon_cost">
                                    <Icon name="weapon" />
                                    <div>{{ formatNumber(result.attacker.start_value.cost.weapon_cost) }}</div>
                                </span>
                                <span class="col-4" v-if="result.attacker.start_value.cost.alcohol_cost">
                                    <Icon name="alcohol" />
                                    <div>{{ formatNumber(result.attacker.start_value.cost.alcohol_cost)
                                        }}</div>
                                </span>
                            </div>
                        </div>
                        <div>
                            Carrying capacity: <span class="text-yellow">{{
                                formatNumber(result.attacker.start_value.carry)
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-6 px-2 py-4 defender text-center card mx-0 border-blue-dark border-bottom-0">
                <div>
                    <h5>Defender Start</h5>
                    <div v-if="result.target.start_value">
                        <span>
                            Supply
                            <span class="text-yellow"> {{ formatNumber(result.target.start_value.supply) }}</span> |
                        </span>
                        <span>
                            Power
                            <span class="text-yellow"> {{ result.target.start_value.power }}</span>
                        </span>
                        <div>
                            <h5 class="mt-3">Army Value</h5>
                            <div class="d-flex">
                                <span class="col-4" v-if="result.target.start_value.cost.drug_cost">
                                    <Icon name="drug" />
                                    <div>{{ formatNumber(result.target.start_value.cost.drug_cost) }}</div>
                                </span>
                                <span class="col-4" v-if="result.target.start_value.cost.weapon_cost">
                                    <Icon name="weapon" />
                                    <div>{{ formatNumber(result.target.start_value.cost.weapon_cost)
                                        }}</div>
                                </span>
                                <span class="col-4" v-if="result.target.start_value.cost.alcohol_cost">
                                    <Icon name="alcohol" />
                                    <div>{{ formatNumber(result.target.start_value.cost.alcohol_cost)
                                        }}</div>

                                </span>
                            </div>
                        </div>
                        <div>
                            Carrying capacity: <span class="text-yellow">{{
                                formatNumber(result.target.start_value.carry) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="result.result" class="row mx-0 px-0">
            <div class="row mx-0 px-0">
                <div v-for="(army) in ['attacker', 'target']" class="card col-6 mx-0 px-0 border-top-0 border-bottom-0"
                    :class="army === 'attacker' ? 'border-red-dark' : 'border-blue-dark'">
                    <div class="row mx-0 px-0">
                        <div style="position: relative;" class="col-4 mx-0 px-1 mb-2 text-center"
                            v-for="unit in result[army].units" v-if="unit.amount > 0">
                            <img :src="`/img/units/${unit.key}.png`" width="100%" height="auto" class="mr-2" />
                            <div class="text-center"
                                style="background:black;width:100%;text-shadow: 5px 5px 5px black;color:white;">
                                <div>
                                    <div class="text-center font-10">
                                        <span v-if="unit.dead" class="text-red">
                                            {{ unit.dead }}
                                        </span>
                                        <span v-if="unit.dead">
                                            /
                                        </span>
                                        {{ unit.amount }}
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="mb-2" v-for="unit in result[army].troops" v-if="unit.amount > 0">
                            <b>
                                <img :src="`/img/units/${unit.key}.png`" width="40" height="54" class="mr-2" />
                                <span v-if="unit.dead" class="text-red">
                                    {{ unit.dead }}
                                </span>
                                <span v-if="unit.dead">
                                    /
                                </span>
                                {{ unit.amount }}
                            </b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card col-6 p-2 attacker text-center border-red-dark border-top-0">
                <div>
                    <h5>Attacker End:</h5>
                    <div v-if="result.attacker.end_value">
                        <span>
                            Supply:
                            <span class="text-red">
                                {{ formatNumber(result.attacker.end_value.supply -
                                    result.attacker.start_value.supply) }}</span> |
                        </span>
                        <span>
                            Power:
                            {{ result.attacker.end_value.power }} |
                        </span>
                        <div>
                            Army Lost Value:
                        </div>
                        <div>
                            <Icon name="drug" />
                            <span class="text-red">
                                {{ formatNumber(result.attacker.end_value.cost.drug_cost -
                                    result.attacker.start_value.cost.drug_cost) }} </span>
                        </div>
                        <div>
                            <Icon name="weapon" />
                            <span class="text-red">{{ formatNumber(result.attacker.end_value.cost.weapon_cost -
                                result.attacker.start_value.cost.weapon_cost) }}
                            </span>
                        </div>
                        <div>
                            <Icon name="alcohol" />
                            <span class="text-red">{{ formatNumber(result.attacker.end_value.cost.alcohol_cost -
                                result.attacker.start_value.cost.alcohol_cost) }}</span>
                        </div>
                        <div>
                            Carry: {{ formatNumber(result.attacker.end_value.carry) }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card col-6 p-2 defender text-center border-blue-dark border-top-0">
                <div>
                    <h5>Defender End:</h5>
                    <div v-if="result.target.end_value">
                        <span>
                            Supply:
                            <span class="text-red"> {{ formatNumber(result.target.end_value.supply -
                                result.target.start_value.supply) }}</span> |
                        </span>
                        <span>
                            Power:
                            {{ result.target.end_value.power }} |
                        </span>
                        <div>
                            Army Lost Value:
                        </div>
                        <div>
                            <Icon name="drug" />
                            <span class="text-red">
                                {{ formatNumber(result.target.end_value.cost.drug_cost -
                                    result.target.start_value.cost.drug_cost) }} </span>
                        </div>
                        <div>
                            <Icon name="weapon" />
                            <span class="text-red">{{ formatNumber(result.target.end_value.cost.weapon_cost -
                                result.target.start_value.cost.weapon_cost) }}
                            </span>
                        </div>
                        <div>
                            <Icon name="alcohol" />
                            <span class="text-red">{{ formatNumber(result.target.end_value.cost.alcohol_cost -
                                result.target.start_value.cost.alcohol_cost) }}</span>
                        </div>
                        <div>
                            Carry: {{ formatNumber(result.target.end_value.carry) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card py-2" v-if="result.result">
            <div class="text-center result uppercase">
                <h5>Result:</h5>
                <div :class="result.result === 2 ? 'text-blue' : result.result === 1 ? 'text-green' : 'text-red'">
                    {{ result.result === 2 ? 'draw' : result.result === 1 ? 'attacker win' : 'attacker lose' }}
                </div>
            </div>
            <div class="text-center">
                <button v-if="log.length > 0" @click="showDetails" class="btn btn-xxs gradient-blue e mb-4 mt-4">
                    Show Details
                </button>
            </div>
        </div>

        <div v-if="log.length > 0 && details" class="card p-2 mb-4">
            <p v-for="l in log" v-html="l"></p>
        </div>
    </div>
</template>


<script>

import drugwars from 'drugwars';
import numeral from 'numeral';

export default {
    data() {
        return {
            attacker: null,
            defender: null,
            defender_type: 'player',
            attackertrainings: [],
            defendertrainings: [],
            defenderbuildings: null,
            error: null,
            details: false,
            json: null,
            log: [],
            result: {}
        };
    },

    mounted() {
        let attackerUnits = [];
        let targetUnits = [];
        let attackerTrainings = [];
        let targetTrainings = [];
        let targetBuildings = [];
        if (this.$route.params.values) {
            const toParse = this.$route.params.values
            const elements = toParse.split(',')
            this.defender_type = elements.splice(0, 1)[0]
            Object.keys(drugwars.units).forEach(unit => {

                elements.find(element => {
                    let player = parseInt(element.split('=')[1].split('&')[0])
                    let type = element.split('=')[2].split('&')[0]
                    let amount = parseInt(element.split('=')[3].split('&')[0])
                    if (drugwars.buildings[type] && drugwars.buildings[type].type === 'defense') {
                        if (targetBuildings.find(t => t.key === type)) { } else
                            targetBuildings.push({
                                key: type,
                                lvl: amount
                            })
                    }
                    if (unit === type && player === 1)
                        attackerUnits.push({
                            key: type,
                            amount: amount
                        });
                    if (unit === type && this.defender_type === 'npc' && drugwars.units[type].npc)
                        targetUnits.push({
                            id: type,
                            key: type,
                            amount: amount
                        });
                    else if (unit === type && player === 2)
                        targetUnits.push({
                            key: type,
                            amount: amount
                        });
                });
            });

            Object.keys(drugwars.units).forEach(unit => {
                if (!attackerUnits.filter(item => item.key === unit)[0] && !drugwars.units[unit].npc)
                    attackerUnits.push({
                        key: unit,
                        amount: 0
                    });
                if (this.defender_type === 'npc' && !targetUnits.filter(item => item.key === unit)[0] && drugwars.units[unit].npc)
                    targetUnits.push({
                        key: unit,
                        amount: 0
                    });
                else if (this.defender_type === 'player' && !targetUnits.filter(item => item.key === unit)[0] && !drugwars.units[unit].npc)
                    targetUnits.push({
                        key: unit,
                        amount: 0
                    });
            });

            Object.keys(drugwars.trainings).forEach(training => {
                elements.find(element => {
                    let player = parseInt(element.split('=')[1].split('&')[0])
                    let type = element.split('=')[2].split('&')[0]
                    let amount = element.split('=')[3].split('&')[0]
                    if (training === type && player === 1)
                        attackerTrainings.push({
                            key: type,
                            lvl: amount
                        });
                    if (training === type && player === 2)
                        targetTrainings.push({
                            key: type,
                            lvl: amount
                        });
                });

            });

            Object.keys(drugwars.trainings).forEach(training => {
                if (!attackerTrainings.filter(item => item.key === training)[0])
                    attackerTrainings.push({
                        key: training,
                        lvl: 0
                    });
                if (!targetTrainings.filter(item => item.key === training)[0])
                    targetTrainings.push({
                        key: training,
                        lvl: 0
                    });
            });

            this.attacker = attackerUnits;


            this.defender = targetUnits.sort((a, b) => {
                a[1] - b[1]
            });;

            this.attackertrainings = attackerTrainings.sort((a, b) => {
                a.key - b.key
            });
            this.defendertrainings = targetTrainings.sort((a, b) => {
                a.key - b.key
            });

            this.defenderbuildings = targetBuildings;
        } else {
            Object.keys(drugwars.units).forEach(unit => {
                if (!drugwars.units[unit].npc)
                    attackerUnits.push({
                        key: unit,
                        amount: 0
                    });
                if (this.defender_type === 'npc' && drugwars.units[unit].npc)
                    targetUnits.push({
                        id: unit,
                        key: unit,
                        amount: 0
                    });
                else if (this.defender_type === 'player' && !drugwars.units[unit].npc) {
                    targetUnits.push({
                        key: unit,
                        amount: 0
                    });
                }
            });
            Object.keys(drugwars.trainings).forEach(training => {
                attackerTrainings.push({
                    key: training,
                    lvl: 0
                });
                if (this.defender_type === 'player')
                    targetTrainings.push({
                        key: training,
                        lvl: 0
                    });
            });

            Object.keys(drugwars.buildings).forEach(building => {
                if (drugwars.buildings[building].type === 'defense')
                    if (!targetBuildings.filter(item => item.key === building)[0])
                        targetBuildings.push({
                            key: building,
                            lvl: 0
                        });
            });

            this.attacker = attackerUnits
            this.defender = targetUnits

            this.attackertrainings = attackerTrainings
            this.defendertrainings = targetTrainings;

            this.defenderbuildings = targetBuildings;

        }
    },
    methods: {
        formatNumber(value) {
            return numeral(value).format('0.[00]a')
        },
        handleSubmit() {
            const attackers = this.attacker;
            const defenders = this.defender;
            const attackerUnits = attackers;
            const targetUnits = defenders;
            const attackersTrainings = this.attackertrainings;
            const defendersTrainings = this.defendertrainings;
            const defendersBuildings = this.defenderbuildings;
            const json = {
                attacker: {
                    units: attackerUnits,
                    trainings: attackersTrainings
                },
                target: {
                    units: targetUnits,
                    trainings: defendersTrainings,
                    buildings: defendersBuildings
                }
            };
            this.json = json
            const fight = new drugwars.Fight(json);
            const result = fight.fight();
            this.result = result;
            this.details = false
            this.log = fight.getLog();
        },
        handleReset() {
            let targetUnits = [];
            this.defender = [];
            Object.keys(drugwars.units).forEach(unit => {
                if (this.defender_type === 'npc' && drugwars.units[unit].npc)
                    targetUnits.push({
                        id: unit,
                        key: unit,
                        amount: 0
                    });
                else if (this.defender_type === 'player' && !drugwars.units[unit].npc) {
                    targetUnits.push({
                        id: unit,
                        key: unit,
                        amount: 0
                    });
                }
            });

            this.defender = targetUnits;

            let targetTrainings = [];
            Object.keys(drugwars.trainings).forEach(training => {
                targetTrainings.push({
                    id: training,
                    key: training,
                    lvl: 0
                });
            });
            this.details = false
            this.defendertrainings = targetTrainings;
        },
        handleResetMyUnits() {
            let attackerUnits = [];
            this.attackerUnits = [];
            let attackerTrainings = [];
            this.attackertrainings = [];
            Object.keys(drugwars.trainings).forEach(training => {
                attackerTrainings.push({
                    key: training,
                    lvl: 0
                })
            })

            Object.keys(drugwars.units).forEach(unit => {
                if (!drugwars.units[unit].npc) {
                    attackerUnits.push({
                        id: unit,
                        key: unit,
                        amount: 0
                    });
                }
            });
            this.attackertrainings = attackerTrainings;

            this.attacker = attackerUnits;

            this.details = false
        },
        handleLoadMyUnits() {
            let attackerUnits = [];
            let targetUnits = [];
            let attackerTrainings = [];
            let targetTrainings = [];
            let targetBuildings = [];
            if (this.$route.params.values) {
                const toParse = this.$route.params.values
                const elements = toParse.split(',')
                this.defender_type = elements.splice(0, 1)[0]
                Object.keys(drugwars.units).forEach(unit => {

                    elements.find(element => {
                        let player = parseInt(element.split('=')[1].split('&')[0])
                        let type = element.split('=')[2].split('&')[0]
                        let amount = parseInt(element.split('=')[3].split('&')[0])
                        if (drugwars.buildings[type] && drugwars.buildings[type].type === 'defense') {
                            if (targetBuildings.find(t => t.key === type)) { } else
                                targetBuildings.push({
                                    key: type,
                                    lvl: amount
                                })
                        }
                        if (unit === type && player === 1)
                            attackerUnits.push({
                                key: type,
                                amount: amount
                            });
                        if (unit === type && this.defender_type === 'npc' && drugwars.units[type].npc)
                            targetUnits.push({
                                id: type,
                                key: type,
                                amount: amount
                            });
                        else if (unit === type && player === 2)
                            targetUnits.push({
                                key: type,
                                amount: amount
                            });
                    });
                });

                Object.keys(drugwars.units).forEach(unit => {
                    if (!attackerUnits.filter(item => item.key === unit)[0] && !drugwars.units[unit].npc)
                        attackerUnits.push({
                            key: unit,
                            amount: 0
                        });
                    if (this.defender_type === 'npc' && !targetUnits.filter(item => item.key === unit)[0] && drugwars.units[unit].npc)
                        targetUnits.push({
                            key: unit,
                            amount: 0
                        });
                    else if (this.defender_type === 'player' && !targetUnits.filter(item => item.key === unit)[0] && !drugwars.units[unit].npc)
                        targetUnits.push({
                            key: unit,
                            amount: 0
                        });
                });

                Object.keys(drugwars.trainings).forEach(training => {
                    elements.find(element => {
                        let player = parseInt(element.split('=')[1].split('&')[0])
                        let type = element.split('=')[2].split('&')[0]
                        let amount = element.split('=')[3].split('&')[0]
                        if (training === type && player === 1)
                            attackerTrainings.push({
                                key: type,
                                lvl: amount
                            });
                        if (training === type && player === 2)
                            targetTrainings.push({
                                key: type,
                                lvl: amount
                            });
                    });

                });

                Object.keys(drugwars.trainings).forEach(training => {
                    if (!attackerTrainings.filter(item => item.key === training)[0])
                        attackerTrainings.push({
                            key: training,
                            lvl: 0
                        });
                    if (!targetTrainings.filter(item => item.key === training)[0])
                        targetTrainings.push({
                            key: training,
                            lvl: 0
                        });
                });

                this.attacker = attackerUnits;


                this.defender = targetUnits.sort((a, b) => {
                    a[1] - b[1]
                });;

                this.attackertrainings = attackerTrainings.sort((a, b) => {
                    a.key - b.key
                });
                this.defendertrainings = targetTrainings.sort((a, b) => {
                    a.key - b.key
                });

                this.defenderbuildings = targetBuildings;
            }
        },
        showDetails() {
            this.details = !this.details
        },
        ChooseDefender(value) {
            this.defender_type = value
            this.handleReset()
        },
    }
};
</script>


<style scoped>
textarea {
    max-width: 600px;
    height: 280px;
}

.uppercase {
    text-transform: uppercase;
}

.width-full {
    width: 60px !important;
}

.value {
    background-image: radial-gradient(ellipse farthest-corner at center 0, #0a0a0a -150%, #131313 45%, rgb(17, 17, 17) 85%) !important;

}

.name {
    visibility: hidden;
    height: 0px;
}

.minip {
    width: 24px;
}

.result {
    border-radius: 5px;
}




input {
    min-height: 16px !important;
    padding: 0px !important;
    text-align: center;
}

.tick.attacker {
    padding: 10px;
    border: #5a5a5a 1px solid;
    background: #2f00ff3a;
}

.tick.defender {
    padding: 10px;
    border: #5a5a5a 1px solid;
    background: #ff000041;
}

.round {
    font-weight: bold;
    padding: 10px;
    background: #ffc400;
    color: black;
}

.preview.unit {
    background-image: url('https://img.drugwars.io/cards/background/1.png');
    background-size: contain;
    width: 40px;
    height: 54px;
}
</style>