export type prefixKeys =
	| "Nova Funcionalidade"
	| "Correção de Bug"
	| "Documentação"
	| "Modificação de Estilo"
	| "Refatoração de Código"
	| "Melhoria de Performance"
	| "Testes"
	| ""
	| null;

export const prefixes = {
	"Nova Funcionalidade": "feat",
	"Correção de Bug": "fix",
	Documentação: "docs",
	"Modificação de Estilo": "style",
	"Refatoração de Código": "refact",
	"Melhoria de Performance": "perf",
	Testes: "test",
} as Record<prefixKeys | any, string>;

export function fallbackCopyTextToClipboard(text: string) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand("copy");
		var msg = successful ? "successful" : "unsuccessful";
		console.log("Fallback: Copying text command was " + msg);
	} catch (err) {
		console.error("Fallback: Oops, unable to copy", err);
	}

	document.body.removeChild(textArea);
}
