import { createRouter, createWebHistory } from "vue-router";
import index from "./pages/index.vue";
import Commit from "./pages/git/Commit.vue";
import Base64PDF from "./pages/converters/Base64PDF.vue";
import PDFBase64 from "./pages/converters/PDFBase64.vue";

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
	{ path: "/base64/pdf", title: "Base64 to PDF", icon: "mdi-file-pdf-box", component: Base64PDF },
	{ path: "/pdf/base64", title: "PDF to Base64", icon: "mdi-file-code", component: PDFBase64 },
];

export default createRouter({
	history: createWebHistory(),
	// a copy without the DIVIDERS
	routes: routes.filter((route) => route.path !== "DIVIDER"),
});
