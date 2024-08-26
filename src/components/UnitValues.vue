<template>

	<div class="d-flex justify-content-between">
		<div class="item-skill text-center">
			<Icon name="skills/fire" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ modifiedValues.attack }} <span class="text-blue font-8" v-if="modifiedValues.attack - unit.attack > 0">({{ unit.attack }}+{{modifiedValues.attack - unit.attack}})</span> </div>

		</div>

		<div class="item-skill text-center">
			<Icon name="skills/carry" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ unit.capacity }}</div>
		</div>
		<div class="item-skill text-center">
			<Icon name="skills/health" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ modifiedValues.health }} <span class="text-blue font-8" v-if="modifiedValues.health - unit.health > 0">({{ unit.health }}+{{modifiedValues.health - unit.health}})</span> </div>

		</div>

		<div class="item-skill text-center">
			<Icon name="skills/physical" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ modifiedValues.defense }} <span class="text-blue font-8" v-if="modifiedValues.defense - unit.defense > 0">({{ unit.defense }}+{{modifiedValues.defense - unit.defense}})</span> </div>

		</div>
		<div class="item-skill text-center">
			<Icon name="skills/speed" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ speed | ms }}</div>
		</div>

		<div class="item-skill text-center">
			<Icon name="drug" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ unit.move_cost }}</div>
		</div>
	</div>


</template>

<script>
export default {
	props: ['unit', 'modifiedValues', 'speed'],
};
</script>


<style scoped lang="less">
.item-skill {
	background: rgba(0, 0, 0, 0.5);
	padding: 5px 10px;
	border-radius: 10px;
	margin: 2px;
}

div {
	font-size: 13px;
	margin: 0px;
}

.column {
	font-size: 10px;
	padding: 5px;
}

.skill-detail {
	color: white;
}
</style>
