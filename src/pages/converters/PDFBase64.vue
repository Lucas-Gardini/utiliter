<script setup lang="ts">
import { ref } from "vue";
import { PDFToBase64 } from "../../utils/convert";
import colors from "../../utils/colors";
import { fallbackCopyTextToClipboard } from "../../utils/git";
const pdf = ref();
const base64 = ref("");
const loading = ref(false);

const copy = () => {
	loading.value = true;
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(base64.value);
	} else {
		navigator.clipboard.writeText(base64.value);
	}
	loading.value = false;
};
</script>

<template>
	<v-card title="Conversor PDF -> BASE64" class="mx-auto card">
		<v-row>
			<v-col cols="2" sm="10" md="10" lg="10">
				<v-file-input
					v-model="pdf"
					label="PDF"
					variant="underlined"
					accept="application/pdf"
				></v-file-input>
			</v-col>

			<v-col cols="2" sm="2" md="2" lg="2" style="margin-top: auto; margin-bottom: 20px">
				<v-btn
					:disabled="!pdf"
					class="mx-2"
					fab
					dark
					small
					:color="colors.primary"
					@click="
						async () => {
							base64 = await PDFToBase64(pdf);
						}
					"
				>
					<v-icon style="color: white"> mdi-file-eye </v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-divider />

		<v-progress-circular indeterminate color="green" class="mt-5" v-if="loading"></v-progress-circular>

		<v-btn v-if="base64.length > 0" color="primary" class="mt-5" @click="copy">
			Copiar BASE64
		</v-btn>

		<v-row
			style="
				display: block;
				max-width: 95%;
				margin-left: 5px;
				margin-right: 5px;
				margin-top: 20px;
			"
		>
			{{ base64 }}
		</v-row>
	</v-card>
</template>

<style scoped>
.card {
	padding-left: 15px;
	padding-right: 15px;
	padding-bottom: 25px;
}
</style>
