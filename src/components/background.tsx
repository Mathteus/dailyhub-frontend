'use client';

import styled from "styled-components";

interface IBackground {
	children: React.ReactNode;
}

const Container = styled.main`
	position: fixed;
	left: 0;
	top: 0;
	max-width: 50%;
	min-height: 50vh;
	padding: 1rem;
	display: flex;
	border-color: #000;
`;

export default function Background({ children }: IBackground) {
	return (
		<Container>
			{children}
		</Container>
	);
}
