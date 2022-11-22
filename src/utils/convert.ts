export function base64ToPDF(base64: string) {
	const blob = uint8ArrayToBlob(base64ToUnit8Array(base64));
	const fileUrl = URL.createObjectURL(blob);
	window.open(fileUrl);
}

export async function PDFToBase64(pdf: Array<File>): Promise<string> {
	// convert pdf to base64
	const base64 = await new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(pdf[0]);
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = (error) => {
			resolve("ERRO");
		};
	});

	return base64 as string;
}

function uint8ArrayToBlob(uint: Uint8Array) {
	return new Blob([uint], { type: "application/pdf;base64" });
}

function base64ToUnit8Array(fileBase64: string) {
	var raw = window.atob(fileBase64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));
	for (var i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}
