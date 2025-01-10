interface IPost {
	icon: string;
	name: string;
	date: Date;
	postText: string;
	gosteiNumbers: number;
	chatoNumbers: number;
}

function Post() {
	return (
		<div>
			<header>
				<img src="" alt="icon perfil" sizes="" />
				{' @henrique Postado em 10/01/2025 as 10:35'}
			</header>
			<article>
				texto da postagem
			</article>
			<footer>
				<button type="button">Gostei 78</button>
				<button type="button">Chato  47</button>
			</footer>
		</div>
	)
}

export default function Blog() {
	return (
		<main>
			<div>
				<input type="search" name="" id="" />
			</div>
			<section>
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</section>
		</main>
	);
}