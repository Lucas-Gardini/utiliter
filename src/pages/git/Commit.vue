<script setup lang="ts">
import { ref, watch } from "vue";
import { Commit } from "../../@types/commit";
import { fallbackCopyTextToClipboard, prefixes, prefixKeys } from "../../utils/git";
const form = ref();
const isValid = ref(false);

const commit = ref<Commit>({
	message: [{ prefix: null, text: "", isBreaking: false }],
});
const gotHelped = ref(false);
const helped = ref<{ name: string; email: string }>({ name: "", email: "" });

const body = ref({ active: false, text: "" });
const footer = ref({ active: false, text: "" });

const commitMessage = ref("");

const clear = () => {
	commit.value.message = [{ prefix: null, text: "", isBreaking: false }];
	gotHelped.value = false;
	helped.value = { name: "", email: "" };
	body.value = { active: false, text: "" };
	footer.value = { active: false, text: "" };
	commitMessage.value = "";

	setTimeout(() => {
		form.value.resetValidation();
	}, 50);
};

const generate = () => {
	let message = "";

	commit.value.message.forEach(
		(line: { text: string; prefix: prefixKeys; isBreaking: boolean }) => {
			if (line.text === "" || line.prefix === null) return;

			message += `${prefixes[line.prefix]}${line.isBreaking ? "!" : ""}: ${line.text}\n`;
		}
	);

	if (body.value.active) message += `\n${body.value.text}\n`;
	if (footer.value.active) message += `\n${footer.value.text}\n`;

	if (gotHelped.value && helped.value.name !== "") {
		message += `\nCo-authored-by: ${helped.value.name} ${
			helped.value.email && `<${helped.value.email}>`
		}`;
	}

	commitMessage.value = message;
};

const copy = () => {
	if (!navigator.clipboard) return fallbackCopyTextToClipboard(commitMessage.value);
	navigator.clipboard.writeText(commitMessage.value);
};

watch(
	() => commit.value,
	() => {
		if (
			commit.value.message[commit.value.message.length - 1].text.length > 0 &&
			commit.value.message[commit.value.message.length - 1].prefix !== null
		) {
			commit.value.message.push({ prefix: null, text: "", isBreaking: false });
		}
	},
	{ deep: true }
);
</script>

<template>
	<v-card title="Gerador de Commit" class="mx-auto card">
		<v-form ref="form" v-model="isValid" lazy-validation>
			<v-row v-for="(message, i) in commit.message">
				<v-col cols="5" sm="12" md="4" lg="5">
					<v-select
						variant="underlined"
						v-model="message.prefix"
						:items="Object.keys(prefixes)"
						:rules="[(v: any) => !!v || 'Escolha um prefixo']"
						label="Tipo"
						required
					></v-select>
				</v-col>
				<v-col cols="5" sm="12" md="4" lg="5">
					<v-textarea
						variant="underlined"
						v-model="message.text"
						:rules="[(v: any) => !!v || 'Escreva uma mensagem']"
						label="Mensagem"
						required
						:rows="1"
						auto-grow
					></v-textarea>
				</v-col>
				<v-col cols="2" sm="12" md="4" lg="2">
					<v-checkbox
						v-model="message.isBreaking"
						title="Funcionalidade impactante que possa causar problemas"
						label="Breaking Change"
						required
					></v-checkbox>
				</v-col>

				<v-col
					v-if="i !== commit.message.length - 1"
					cols="12"
					sm="12"
					md="12"
					lg="12"
					style="position: relative; bottom: 25px"
				>
					<v-divider></v-divider>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="2" sm="12" md="4" lg="2">
					<v-checkbox v-model="gotHelped" label="Recebi ajuda" required></v-checkbox>
				</v-col>

				<v-col cols="2" sm="12" md="4" lg="4" v-if="gotHelped">
					<v-text-field
						variant="underlined"
						v-model="helped.name"
						:rules="[(v: any) => !!v || 'O nome é necessário!']"
						label="Nome"
						required
					></v-text-field>
				</v-col>

				<v-col cols="2" sm="12" md="4" lg="4" v-if="gotHelped">
					<v-text-field
						variant="underlined"
						v-model="helped.email"
						label="Email (git)"
					></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="2" sm="12" md="4" lg="2">
					<v-checkbox v-model="body.active" label="Corpo" required></v-checkbox>
				</v-col>

				<v-col cols="2" sm="12" md="8" lg="8" v-if="body.active">
					<v-textarea
						variant="underlined"
						v-model="body.text"
						label="Corpo do commit"
						:rows="1"
						auto-grow
					></v-textarea>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="2" sm="12" md="4" lg="2">
					<v-checkbox v-model="footer.active" label="Rodapé" required></v-checkbox>
				</v-col>

				<v-col cols="2" sm="12" md="8" lg="8" v-if="footer.active">
					<v-textarea
						variant="underlined"
						v-model="footer.text"
						label="Rodapé do commit"
						:rows="1"
						auto-grow
					></v-textarea>
				</v-col>
			</v-row>

			<v-textarea
				v-if="commitMessage.length > 0"
				variant="underlined"
				v-model="commitMessage"
				:rules="[(v: any) => !!v || 'Escreva uma mensagem']"
				label="Mensagem"
				:rows="1"
				auto-grow
			></v-textarea>

			<!-- <v-checkbox
				v-model="checkbox"
				:rules="[(v) => !!v || 'You must agree to continue!']"
				label="Do you agree?"
				required
			></v-checkbox> -->

			<v-btn v-if="commitMessage.length > 0" color="primary" class="mr-4" @click="copy">
				Copiar Commit
			</v-btn>

			<v-btn color="success" class="mr-4" @click="generate"> Gerar Commit </v-btn>

			<v-btn color="error" class="mr-4" @click="clear"> Limpar </v-btn>
		</v-form>
	</v-card>
</template>

<style scoped>
.card {
	padding-left: 15px;
	padding-right: 15px;
	padding-bottom: 25px;
}
</style>
