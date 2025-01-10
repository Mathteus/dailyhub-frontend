import { funEmoji } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Button } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import Image from 'next/image';
import { useMemo } from 'react';
import { FaBook, FaGithub, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';

interface IItem {
	selected: boolean;
}

const ItemMenu = styled.div<IItem>`
	color: ${(props) => (props.selected ? '#fff' : '#94a3b8')};
	width: max-content;
	${(props) =>
		props.selected &&
		`
			border-bottom: 1px #fff solid;
		`}

	&:hover {
		border-bottom: 1px #fff solid;
	}

	&:active {
		transform: scale(.95);
		color: #fff;
	}
`;

interface IMenu {
	currentPage: 1 | 2 | 3 | 4 | 5 | 6;
	changePage: (newPage: 1 | 2 | 3 | 4 | 5 | 6) => void;
	username: string;
	tagname: string;
}

export default function Menu({
	currentPage,
	changePage,
	username,
	tagname,
}: IMenu) {
	const handlerNews = () => {
		changePage(1);
	};

	const handlerMoney = () => {
		changePage(2);
	};

	function handlerTask(): void {
		changePage(3);
	}

	function handlerBlog(): void {
		changePage(4);
	}

	function handlerConfigs(): void {
		changePage(5);
	}

	function handlerPayme(): void {
		changePage(6);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const avatar = useMemo(() => {
		return createAvatar(funEmoji, {
			seed: username,
			scale: 100,
			radius: 20,
			backgroundType: ['gradientLinear'],
		}).toDataUri();
	}, []);

	return (
		<aside>
			<section>
				<Image src={avatar} alt='Imagem Perfil' width={120} height={120} />
				<div>
					<strong>{username}</strong>
				</div>
				<div>@{tagname}</div>
			</section>
			<section className='flex flex-col gap-6 text-center mt-14'>
				<ItemMenu selected={currentPage === 1}>
					<button type='button' onClick={handlerNews}>
						Noticias
					</button>
				</ItemMenu>
				<ItemMenu selected={currentPage === 2}>
					<button type='button' onClick={handlerMoney}>
						Finanças
					</button>
				</ItemMenu>
				<ItemMenu selected={currentPage === 3}>
					<button type='button' onClick={handlerTask}>
						Tarefas
					</button>
				</ItemMenu>
				<ItemMenu selected={currentPage === 4}>
					<button type='button' onClick={handlerBlog}>
						Blog
					</button>
				</ItemMenu>
				<ItemMenu selected={currentPage === 5}>
					<button type='button' onClick={handlerConfigs}>
						Configurações
					</button>
				</ItemMenu>
				<ItemMenu selected={currentPage === 6}>
					<button type='button' onClick={handlerPayme}>
						Pague-me um Café
					</button>
				</ItemMenu>
			</section>
			<section className='fixed bottom-8 flex gap-4'>
				<Tooltip content='Ir para o repositorio do Github' color='foreground'>
					<Button type='button' isIconOnly>
						<FaBook size={32} />
					</Button>
				</Tooltip>

				<Tooltip content='Ir para o perfil do github' color='foreground'>
					<Button type='button' isIconOnly>
						<FaGithub size={32} />
					</Button>
				</Tooltip>

				<Tooltip content='Ir para o perfil do Linkedin' color='foreground'>
					<Button type='button' isIconOnly>
						<FaLinkedin size={32} />
					</Button>
				</Tooltip>
			</section>
		</aside>
	);
}
