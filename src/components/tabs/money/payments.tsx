interface IPayment {
  back: () => void;
}

export default function Payment({ back }: IPayment) {
	return (
		<main>
			<header>
				<div>
					<button type="button">prev</button>
					<strong>Mes</strong>
					<button type="button">next</button>
				</div>
				<div>
					<span>
						entradas
					</span>
					<span>
						saidas
					</span>
				</div>
				<div>
					grafico
				</div>
			</header>
			<div>
				<table>
					<thead>
						<th>adcionar pagamentos</th>
						<th>data</th>
						<th>name</th>
						<th>descrição</th>
						<th>valor</th>
					</thead>
					<tbody>
						pagementos
					</tbody>
				</table>
			</div>
		</main>
	);
}