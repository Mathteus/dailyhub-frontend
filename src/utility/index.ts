
export function gerateRandomString(size: number) {
	const caracteres = 'POIUYTREWQLKJHGFDSAMNBVCXZ0123654789';
	let result = '';
	for (let i = 0; i < caracteres.length; i++) {
		const randomIndex = Math.floor(Math.random() * caracteres.length);
		result += caracteres.charAt(randomIndex);
	}
	return result;
}
