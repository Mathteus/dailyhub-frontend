'use client';
import Background from '@/components/background';
import Content from '@/components/content';
import Menu from '@/components/menu';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [currentColor, changeColor] = useState<string>('#000');
	const [page, changePage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

	const handlerPage = (newPage: 1 | 2 | 3 | 4 | 5 | 6) => {
		changePage(newPage);
	};

	return (
		<Background color={currentColor}>
			<Menu
				username='Matheus Henrique'
				tagname='Henrique'
				currentPage={page}
				changePage={handlerPage}
			/>
			<Content bgColor='#f1f5f9' textColor='#0c0a09' currentPage={page} />
		</Background>
	);
}
