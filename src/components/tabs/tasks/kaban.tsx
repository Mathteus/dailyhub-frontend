import { DialogDemo } from '@/components/dialog';
import { useTaskStorage, type Task } from '@/storage/task';
import { gerateRandomString } from '@/utility';
import { Button, Chip, Input, Textarea, Tooltip, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FaArrowAltCircleLeft, FaTrashAlt } from 'react-icons/fa';

function ModalAddTask() {
	const [textName, changeName] = useState<string>('');
	const [textBox, changeText] = useState<string>('');
	const [nameInputValid, changeValidName] = useState<boolean>(false);
	const taskStorage = useTaskStorage.getState();

	const VerifyName = (text: string) => {
		changeName(text);
		changeValidName(text.length < 3);
	}

	const handlerCofirm = () => {
		taskStorage.addTask({
			id: gerateRandomString(8),
			date: taskStorage.date,
			status: 'todo',
			name: textName,
			description: textBox,
		});
		changeName('');
		changeText('');
		changeValidName(false);
		taskStorage.toUpdate();
	}
	
	return (
		<DialogDemo 
			title='Adcionar Tarefas' 
			onOK={handlerCofirm}
			textOk='Adcionar'
			description='Criar Tarefa'
			ButtonOpen={
				<Button type="button" color='primary'>
					{'Adcionar Tarefa '}
					<BsPlusCircle size={20} />
				</Button>
			} 
		>
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
						onValueChange={VerifyName}
					/>
				</div>
				<div>
					<Textarea
						className='w-full'
						label='Descrição'
						placeholder='Digite sua descrição'
						value={textBox}
						onValueChange={changeText}
						labelPlacement='outside'
						isRequired
					/>
				</div>
			</section>
		</DialogDemo>
	)
}

interface IItem {
	item: Task;
}

function ItemTask({ item }: IItem) {
	const [textName, changeName] = useState<string>(item.name);
	const [textBox, changeText] = useState<string>(item.description);
	const [nameInputValid, changeValidName] = useState<boolean>(false);
	const taskStorage = useTaskStorage.getState();

	const VerifyName = (text: string) => {
		changeName(text);
		changeValidName(text.length < 3);
	}

	const deleteItem = () => {
		taskStorage.removeTask(item);
		taskStorage.toUpdate();
	}

	const updateItem = () => {
		taskStorage.updateTask({
			id: item.id,
			date: taskStorage.date,
			status: item.status,
			description: textBox,
			name: textName
		});
		taskStorage.toUpdate();
	}

	return (
		<>
			<DialogDemo 
				title='Alterar Tarefas' 
				onOK={updateItem}
				textOk='Alterar'
				description='Verificar Tarefa'
				ButtonOpen={
					<button
						type='button'
						className='flex bg-[#22272b] text-white min-w-[95%] min-h-[4rem] mx-auto rounded-xl px-4 py-2 hover:cursor-pointer justify-between items-center'
					>
						<strong>{item.name}</strong>
						<Button 
							type="button" 
							isIconOnly 
							onPress={deleteItem}
							className='hover:text-red-600'>
							<FaTrashAlt />
						</Button>
					</button>
				} 
			>
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
							onValueChange={e => VerifyName(e)}
						/>
					</div>
					<div>
						<Textarea
							className='w-full'
							label='Descrição'
							placeholder='Digite sua descrição'
							value={textBox}
							onValueChange={changeText}
							labelPlacement='outside'
							isRequired
						/>
					</div>
				</section>
			</DialogDemo>
		</>
	);
}

interface ITower {
	name: string;
	color: 'success' | 'primary' | 'warning';
	list: Task[];
}

function Tower({ name, color, list }: ITower) {
	return (
		<section className='text-center bg-[#101204] p-2 rounded-xl'>
			<div className='flex justify-around items-center'>
				<Chip color={color} variant='bordered' size='lg'>
					{name}
				</Chip>
			</div>
			<div className='min-h-[74vh] min-w-[20vw] my-4 overscroll-contain flex flex-col gap-6'>
				{list.map(e => {
					return <ItemTask key={e.id} item={e} />
				})}
			</div>
		</section>
	);
}

interface IKanban {
	back: () => void;
}

export default function Kanban({ back }: IKanban) {
	const [listTodo, setListTodo] = useState<Task[]>([]);
	const [listDoing, setListDoing] = useState<Task[]>([]);
	const [listDone, setListDone] = useState<Task[]>([]);
	const taskStorage = useTaskStorage.getState();

	const loadTasks = () => {
		const talsForToday = taskStorage.getTasksByDay();
		if (talsForToday) {
			const todos = talsForToday.filter(e => e.status === 'todo') as Task[];
			const doings = talsForToday.filter(e => e.status === 'doing') as Task[];
			const dones = talsForToday.filter(e => e.status === 'done') as Task[];
			setListTodo(todos);
			setListDoing(doings);
			setListDone(dones);
		}
	} 

	useEffect(loadTasks, []);
	taskStorage.setCallback(loadTasks);

	return (
		<>
			<header className='flex items-center mb-6 gap-4'>
				<Tooltip content='voltar para o Calendario'>
					<div>
						<Button isIconOnly color='default' onPress={back}>
							<FaArrowAltCircleLeft size={20} />
						</Button>
					</div>
				</Tooltip>
				<h1>{taskStorage.date}</h1>
				<ModalAddTask />
			</header>
			<main className='flex gap-8 justify-around items-center'>
				<Tower name='A Fazer' color='warning' list={listTodo} />
				<Tower name='Fazendo' color='primary' list={listDoing}  />
				<Tower name='Pronto' color='success' list={listDone} />
			</main>
		</>
	);
}
