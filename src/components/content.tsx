import { styled } from 'styled-components';
import Blog from './tabs/blog';
import Settings from './tabs/configuration';
import Money from './tabs/money';
import News from './tabs/news';
import Payment from './tabs/payme';
import Tasks from './tabs/tasks';

interface IContent {
	bgColor: string;
	textColor: string;
	currentPage: 1 | 2 | 3 | 4 | 5 | 6;
}

interface IColor {
	bgColor: string;
	textColor: string;
}

const AreaMain = styled.main<IColor>`
	background-color: ${(props) => props.bgColor};
	color: ${(props) => props.textColor};
	padding: 1rem;
	border-radius: 16px;
`;

export default function Content({ bgColor, textColor, currentPage }: IContent) {
	if (currentPage === 1) {
		return (
			<AreaMain bgColor={bgColor} textColor={textColor}>
				<News />
			</AreaMain>
		);
	}

	if (currentPage === 2) {
		return (
			<AreaMain bgColor={bgColor} textColor={textColor}>
				<Money />
			</AreaMain>
		);
	}

	if (currentPage === 3) {
		return (
			<AreaMain bgColor={bgColor} textColor={textColor}>
				<Tasks />
			</AreaMain>
		);
	}

	if (currentPage === 4) {
		return (
			<AreaMain bgColor={bgColor} textColor={textColor}>
				<Blog />
			</AreaMain>
		);
	}

	if (currentPage === 5) {
		return (
			<AreaMain bgColor={bgColor} textColor={textColor}>
				<Settings />
			</AreaMain>
		);
	}

	if (currentPage === 6) {
		return (
			<AreaMain bgColor={bgColor} textColor={textColor}>
				<Payment />
			</AreaMain>
		);
	}
}
