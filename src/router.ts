import { createRouter, createWebHistory } from "vue-router";
import index from "./pages/index.vue";
import Commit from "./pages/git/Commit.vue";

export const routes = [
	{ path: "/", title: "Home", icon: "mdi-home", component: index },
	{ path: "DIVIDER", title: "GIT", icon: "mdi-git", component: index },
	{
		path: "/commit/generator",
		title: "Commit Generator",
		icon: "mdi-source-commit",
		component: Commit,
	},
	{ path: "DIVIDER", title: "Converters", icon: "mdi-arrow-left-right-bold", component: index },
	{ path: "/base64/pdf", title: "Base64 to PDF", icon: "mdi-file-pdf-box", component: index },
	{ path: "/pdf/base64", title: "PDF to Base64", icon: "mdi-file-code", component: index },
];

export default createRouter({
	history: createWebHistory(),
	// a copy without the DIVIDERS
	routes: routes.filter((route) => route.path !== "DIVIDER"),
});
