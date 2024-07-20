<template>
	<div >
		<div v-if="!lose">
			<span>
				Supply:
				{{ result.supply }} |
			</span>
			<span>
				Power:
				{{ result.power }} |
			</span>
			<span>
				Size:
				{{ result.size }}
			</span>
		</div>
		<div>
			<div v-if="lose">
				Value of losses:
				<div>
					<span v-if="result.cost.drug_cost">
						<Icon name="drug" size="14" /> <span class="text-red">{{ lose.cost.drug_cost -
							result.cost.drug_cost | amount }}</span>
					</span>
					<span v-if="result.cost.weapon_cost">
						<Icon class="ms-1" name="weapon" size="14" /> <span class="text-red">{{ lose.cost.weapon_cost -
							result.cost.weapon_cost | amount }}</span>
					</span>
					<span v-if="result.cost.alcohol_cost">
						<Icon class="ms-1" name="alcohol" size="14" /> <span class="text-red">{{ lose.cost.alcohol_cost
							- result.cost.alcohol_cost | amount }}</span>
					</span>
				</div>
			</div>
			<div v-else>
				Value:
				<div>
					<span v-if="result.cost.drug_cost">
						<Icon name="drug" size="14" /> <span>{{ result.cost.drug_cost | amount }}</span>
					</span>
					<span v-if="result.cost.weapon_cost">
						<Icon class="ms-1" name="weapon" size="14" /> <span>{{ result.cost.weapon_cost | amount
							}}</span>
					</span>
					<span v-if="result.cost.alcohol_cost">
						<Icon class="ms-1" name="alcohol" size="14" /> <span>{{ result.cost.alcohol_cost | amount
							}}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['result', 'lose'],
};
</script>
