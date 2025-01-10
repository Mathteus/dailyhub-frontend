import { Task } from "@/components/tabs/tasks/kaban";
import { tasks } from "@/utility";

export function getTaskByDay(day: string) {
	return tasks.filter(e => e.date === day);
}

export function addTask(taskItem: Task) {
	tasks.push(taskItem);
}

export function removeTaskByIDAndDay(taskToRemove: Task) {
	const index = tasks.indexOf(taskToRemove);
	tasks.slice(index, 1);
}