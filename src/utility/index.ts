import { Task } from "@/components/tabs/tasks/kaban";

export function gerateRandomString(size: number) {
	const caracteres = 'POIUYTREWQLKJHGFDSAMNBVCXZ0123654789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * caracteres.length);
		result += caracteres.charAt(randomIndex);
	}
	return result;
}


export let tasks: Task[] = [
	{
		date: '2025-01-10',
		id: gerateRandomString(6),
		name: "Arrumar a cama",
		status: "done",
		description: "Levantar e arrumar a cama",
	},
	{
		date: '2025-01-10',
		id: gerateRandomString(6),
		name: "Caminhada",
		status: "doing",
		description: "Dar uma caminha ao redor da qudra",
	},
	{
		date: '2025-01-10',
		id: gerateRandomString(6),
		name: "Almoço",
		status: "todo",
		description: "Fazer almoço antes das 12:00",
	}
]

export function getTaskByDay(day: string) {
	return tasks.filter(e => e.date === day);
}

export function addTask(taskItem: Task) {
	tasks.push(taskItem);
}

export function removeTaskByIDAndDay(item: Task) {
	tasks = tasks.filter(e => e !== item);
}