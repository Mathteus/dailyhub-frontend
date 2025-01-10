interface IWeather {
	city: string;
	tempeture: number;
	icon: string;
}

function Weather() {
	return (
		<header>
			<div>Cidade</div>
			<div>
				<div>Temperatura</div>
				<div>Icon</div>
			</div>
		</header>
	)
}

function Article() {
	return (
		<section>
			<strong>text Noticia</strong>
		</section>
	)
}

export default function News() {
	return (
		<main>
			<Weather />
			<div>
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
			</div>
		</main>
	);
}
