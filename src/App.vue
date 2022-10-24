<script setup lang="ts">
import Header from "@components/layout/Header.vue";
import Drawer from "@components/layout/Drawer.vue";
import { ref } from "vue";
import { useTheme } from "vuetify";
import { routes } from "./router";

const theme = useTheme();
const isOpen = ref(false);

const toggleTheme = () =>
	(theme.global.name.value = theme.global.current.value.dark ? "light" : "dark");

const openDrawer = () => (isOpen.value = !isOpen.value);
</script>
<template>
	<v-app>
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
