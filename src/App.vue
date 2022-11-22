<script setup lang="ts">
import Header from "@components/layout/Header.vue";
import Drawer from "@components/layout/Drawer.vue";
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import { routes } from "./router";

const theme = useTheme();
const isOpen = ref(false);

const toggleTheme = () => {
	(theme.global.name.value = theme.global.current.value.dark ? "light" : "dark");

	localStorage.setItem("theme", theme.global.name.value);
};

const openDrawer = () => (isOpen.value = !isOpen.value);

onMounted(() => {
	localStorage.getItem("theme") === "dark" && toggleTheme();
})
</script>
<template>
	<v-app style="width: 100%">
		<v-main>
			<Header
				:isOpen="isOpen"
				:theme="theme"
				@toggleTheme="toggleTheme"
				@openDrawer="openDrawer"
			/>
			<Drawer :isOpen="isOpen" :items="[...routes]" />
			<router-view />
		</v-main>
	</v-app>
</template>
