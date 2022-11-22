<script setup lang="ts">
import { ref } from "vue";
import colors from "../../utils/colors";
import { base64ToPDF } from "../../utils/convert";
const base64 = ref("");
</script>

<template>
	<v-card title="Conversor BASE64 -> PDF" class="mx-auto card">
		<v-row>
			<v-col cols="2" sm="10" md="10" lg="10">
				<v-textarea
					v-model="base64"
					auto-grow
					clearable
					clear-icon="mdi-close-circle"
					label="Base64"
				></v-textarea>
			</v-col>

			<v-col cols="2" sm="2" md="2" lg="2" style="margin-top: auto; margin-bottom: 20px">
				<v-btn
					:disabled="base64.length === 0"
					class="mx-2"
					fab
					dark
					small
					:color="colors.primary"
					@click="() => base64ToPDF(base64)"
				>
					<v-icon style="color: white"> mdi-file-eye </v-icon>
				</v-btn>
			</v-col>
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
