
export function gerateRandomString(size: number): string {
	const caracteres = 'POIUYTREWQLKJHGFDSAMNBVCXZ0123654789';
	let result = '';
	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * caracteres.length);
		result += caracteres.charAt(randomIndex);
	}
	return result;
}

  // Format the date nicely
export function formatDate(dateString: string): string {
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};
	return new Date(dateString).toLocaleString('pt-BR', options);
};
