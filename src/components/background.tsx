'use client';
import styled from 'styled-components';

interface IBackground {
	color: string;
	children: React.ReactNode;
}

interface Icolor {
	color: string;
}

const Container = styled.main<Icolor>`
	background-color: ${(props) => props.color};
	display: grid;
	grid-template-columns: 20% 80%;
	position: fixed;
	letf: 0;
	top: 0;
	min-width: 100vw;
	min-height: 100vh;
	padding: 1rem;
`;

export default function Background({ color, children }: IBackground) {
	return <Container color={color}>{children}</Container>;
}
