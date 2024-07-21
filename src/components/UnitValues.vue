<template>

	<div class="d-flex">
		<div class="col item-skill  d-flex text-center">
			<Icon :name="'skills/' + unit.dmg_type" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ modifiedValues.attack }}</div>
		</div>

		<div class="col item-skill  d-flex text-center">
			<Icon name="skills/carry" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ unit.capacity }}</div>
		</div>
		<div class="col item-skill  d-flex text-center">
			<Icon name="skills/health" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ modifiedValues.health }}</div>
		</div>

		<div class="col item-skill  d-flex text-center">
			<Icon name="skills/physical" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ modifiedValues.defense }}</div>
		</div>
		<div class="col item-skill  d-flex text-center">
			<Icon name="skills/speed" size="18" />
			<div class="ms-1 mt-0 mb-0 skill-detail">{{ speed | ms }}</div>
		</div>

		<div class="col item-skill  d-flex text-center">
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
	padding: 10px;
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
