import { DialogDemo } from '@/components/dialog';
import { gerateRandomString, addTask, getTaskByDay, removeTaskByIDAndDay } from '@/utility';
import { Button, Chip, Input, Textarea, Tooltip, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { FaArrowAltCircleLeft, FaTrashAlt } from 'react-icons/fa';

interface IAddItem {
	addItem: (textName: string, textBox: string) => void;
}

function ModalAddTask({ addItem }: IAddItem) {
	const [textName, changeName] = useState<string>('');
	const [textBox, changeText] = useState<string>('');
	const [nameInputValid, changeValidName] = useState<boolean>(false);

	const VerifyName = (text: string) => {
		changeName(text);
		changeValidName(text.length < 3);
	}

	const handlerCofirm = () => {
		addItem(textName, textBox);
		changeName('');
		changeText('');
		changeValidName(false);
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
	)
}

export interface Task {
	id: string;
	name: string;
	status: 'todo' | 'doing' | 'done';
	description: string;
	date: string | Date;
}

interface IItem {
	item: Task;
	deleteItem: (item: Task) => void;
}

function ItemTask({ item, deleteItem }: IItem) {
	const [textName, changeName] = useState<string>(item.name);
	const [textBox, changeText] = useState<string>(item.description);
	const [nameInputValid, changeValidName] = useState<boolean>(false);

	const VerifyName = (text: string) => {
		changeName(text);
		changeValidName(text.length < 3);
	}

	return (
		<>
			<DialogDemo 
				title='Alterar Tarefas' 
				onOK={() => {}}
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
							onPress={e => deleteItem(item)}
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
	status: 'todo' | 'doing' | 'done';
	list: Task[];
	deleteItem: (item: Task) => void;
}

function Tower({ name, color, list, deleteItem }: ITower) {
	return (
		<section className='text-center bg-[#101204] p-2 rounded-xl'>
			<div className='flex justify-around items-center'>
				<Chip color={color} variant='bordered' size='lg'>
					{name}
				</Chip>
			</div>
			<div className='min-h-[74vh] min-w-[20vw] my-4 overscroll-contain flex flex-col gap-6'>
				<>
					{list.map(e => {
						return <ItemTask key={e.id} item={e} deleteItem={deleteItem} />
					})}
				</>
			</div>
		</section>
	);
}

interface IKanban {
	date: string;
	back: () => void;
}

export default function Kanban({ date, back }: IKanban) {
	const [listTodo, setListTodo] = useState<Task[]>([]);
	const [listDoing, setListDoing] = useState<Task[]>([]);
	const [listDone, setListDone] = useState<Task[]>([]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [showModal, changeVisibility] = useState<boolean>(false);

	const loadTasks = () => {
		const talsForToday = getTaskByDay(date);
		if (talsForToday) {
			const todos: Task[] = talsForToday.filter(e => e.status === 'todo') as Task[];
			const doings: Task[] = talsForToday.filter(e => e.status === 'doing') as Task[];
			const dones: Task[] = talsForToday.filter(e => e.status === 'done') as Task[];
			setListTodo(todos);
			setListDoing(doings);
			setListDoing(dones);
		}
	} 

	useEffect(loadTasks, []); 

	const addTaskToList = (name: string, description: string) => {
		addTask({
			id: gerateRandomString(6),
			name,
			description,
			status: 'todo',
			date: date,
		});
		loadTasks();
	}

	const deleteItem = (item: Task) => {
		removeTaskByIDAndDay(item);
		loadTasks();
	}

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
				<h1>{date}</h1>
				<ModalAddTask addItem={addTaskToList} />
			</header>
			<main className='flex gap-8 justify-around items-center'>
				<Tower name='A Fazer' color='warning' list={listTodo} status='todo' deleteItem={deleteItem} />
				<Tower name='Fazendo' color='primary' list={listDoing} status='doing' deleteItem={deleteItem} />
				<Tower name='Pronto' color='success' list={listDone} status='done' deleteItem={deleteItem} />
			</main>
		</>
	);
}
