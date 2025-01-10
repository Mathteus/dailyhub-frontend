import { styled } from 'styled-components';
import Blog from './tabs/blog';
import Settings from './tabs/configuration';
import Money from './tabs/money';
import News from './tabs/news';
import Payment from './tabs/payme';
import Tasks from './tabs/tasks';

interface IContent {
	currentPage: 1 | 2 | 3 | 4 | 5 | 6;
}

interface IColor {
	bgcolor: string;
	textcolor: string;
}

const AreaMain = styled.main`
	background-color: #f1f5f9;
	color: #0c0a09;
	padding: 1rem;
	border-radius: 16px;
`;

export default function Content({ currentPage }: IContent) {
	if (currentPage === 1) {
		return (
			<AreaMain>
				<News />
			</AreaMain>
		);
	}

	if (currentPage === 2) {
		return (
			<AreaMain>
				<Money />
			</AreaMain>
		);
	}

	if (currentPage === 3) {
		return (
			<AreaMain>
				<Tasks />
			</AreaMain>
		);
	}

	if (currentPage === 4) {
		return (
			<AreaMain>
				<Blog />
			</AreaMain>
		);
	}

	if (currentPage === 5) {
		return (
			<AreaMain>
				<Settings />
			</AreaMain>
		);
	}

	if (currentPage === 6) {
		return (
			<AreaMain>
				<Payment />
			</AreaMain>
		);
	}
}
