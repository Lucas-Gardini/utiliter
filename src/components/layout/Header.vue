<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import { useTheme } from "vuetify";

const emits = defineEmits(["toggleTheme", "openDrawer"]);
const props = defineProps(["theme", "isOpen"]);

const theme = useTheme();
</script>

<template>
	<v-app-bar :elevation="2" class="pl-5 pr-5">
		<button
			:class="`hamburger hamburger--spin ${isOpen ? 'is-active' : ''} ${
				theme.global.current.value.dark ? 'hamburger-dark' : ''
			}`"
			@click="$emit('openDrawer')"
			type="button"
		>
			<span class="hamburger-box">
				<span class="hamburger-inner"></span>
			</span>
		</button>

		<v-spacer></v-spacer>

		<v-btn
			:icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
			:color="theme.global.current.value.dark ? 'amber lighten-3' : 'indigo lighten-3'"
			@click="$emit('toggleTheme')"
		/>
	</v-app-bar>
</template>

<style scoped>
@import url("@assets/css/hamburgers.css");

.hamburger {
	padding: 0 !important;
	margin: 0 !important;
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after,
.hamburger-box {
	width: 25px !important;
}

.hamburger-dark * > *,
.hamburger-dark * > *::before,
.hamburger-dark * > *::after,
.hamburger-dark * > * > .hamburger-inner,
.hamburger-dark * > * > .hamburger-inner::before,
.hamburger-dark * > * > .hamburger-inner::after {
	background-color: #fff !important;
}
</style>
