import Dialog from '@/components/dialog';
import { Button, Chip, Input, Tooltip, useDisclosure } from '@nextui-org/react';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { FaArrowAltCircleLeft, FaPlus } from 'react-icons/fa';

interface Task {
	name: string;
	status: 'todo' | 'doing' | 'done';
	describe: string;
	date: string | Date;
}

function ItemTask({ name }: { name: string }) {
	const [textName, changeName] = useState<string>('');
	const [textBox, changeText] = useState<string>('');
	const [nameInputValid, changeValidName] = useState<boolean>(false);

	const handlerConfirm = () => {};

	const openModal = () => {};

	const onChange = (name: string) => {
		changeName(name);
	};

	const ItemModal = () => {
		return (
			<Dialog btnText='Abrir' size='lg' title={''}>
				<section className='flex flex-col gap-4'>
					<div>
						<Input
							variant='bordered'
							type='text'
							className='bg-transparent text-[4rem] bold'
							label='Nome da Tarefa'
							errorMessage='Digite mais que 3 Caracteres !'
							isInvalid={nameInputValid}
							value={textName}
							onValueChange={changeName}
						/>
					</div>
					<div>
						{/* <Textarea
							className='w-full'
							label='Descrição'
							placeholder='Digite sua descrição'
							value={textBox}
							onValueChange={changeText}
							labelPlacement='outside'
							isRequired
						/> */}

						<TextArea
							placeholder='Digite a descrição...'
							allowClear
							value={textName}
							onChange={(e) => onChange(e.target.value)}
						/>
					</div>
					<div>
						<Button color='primary' className='w-full'>
							Confirmar
						</Button>
					</div>
				</section>
			</Dialog>
		);
	};

	return (
		<>
			<button
				type='button'
				onClick={openModal}
				className='bg-[#22272b] text-white min-w-[95%] min-h-[4rem] mx-auto rounded-xl text-left px-4 py-2 hover:cursor-pointer'
			>
				<strong>{name}</strong>
			</button>
			<ItemModal />
		</>
	);
}

interface ITower {
	name: string;
	color: 'success' | 'primary' | 'warning';
}

function Tower({ name, color }: ITower) {
	return (
		<section className='text-center bg-[#101204] p-2 rounded-xl'>
			<Chip color={color} variant='bordered' size='lg'>
				{name}
			</Chip>
			<div className='min-h-[80vh] min-w-[20vw] my-4 overscroll-contain'>
				<ItemTask name='Tarefa 1' />
			</div>
			<div className=''>
				<Button
					isIconOnly
					className='bg-transparent text-white w-max py-2 px-4 rounded-full'
				>
					{'Adcionar Cartão'}
					<span className='text-transparent'>as</span>
					<FaPlus />
				</Button>
			</div>
		</section>
	);
}

interface IKanban {
	date: string;
}

export default function Kanban({ date }: IKanban) {
	return (
		<>
			<Tooltip content='voltar para o Calendario'>
				<div className='fixed top-[2.2%] left-[20.8%]'>
					<Button isIconOnly color='default'>
						<FaArrowAltCircleLeft size={20} />
					</Button>
				</div>
			</Tooltip>
			<main className='flex gap-8 justify-around items-center'>
				<Tower name='A Fazer' color='warning' />
				<Tower name='Fazendo' color='primary' />
				<Tower name='Pronto' color='success' />
			</main>
		</>
	);
}
