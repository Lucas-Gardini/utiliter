<script setup lang="ts">
const props = defineProps(["items", "isOpen"]);
</script>

<template>
	<v-navigation-drawer v-model="isOpen" bottom temporary>
		<v-list>
			<div v-for="item in items" style="display: flex; flex-direction: column">
				<v-list-item
					v-if="item.path !== 'DIVIDER'"
					:prepend-icon="item.icon"
					:title="item.title"
					@click="$router.push(item.path)"
				></v-list-item>

				<v-chip v-else :prepend-icon="item.icon" variant="text" class="mr-auto mt-3 ml-1">
					{{ item.title }}
				</v-chip>
			</div>
		</v-list>
	</v-navigation-drawer>
</template>
