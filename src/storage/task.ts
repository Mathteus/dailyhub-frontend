import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Task {
	id: string;
	name: string;
	status: 'todo' | 'doing' | 'done';
	description: string;
	date: string | Date;
}

interface ITask {
  tasksUser: Task[];
  date: string;
  toUpdate: () => void;
  clearTasks: () => void;
  setDay: (newDay: string) => void;
  addTask: (taskItem: Task) => void;
  removeTask: (taskItem: Task) => void;
  getTasksByDay: () => Task[];
  updateTask: (taskItem: Task) => void;
  findTaskById: (day: string, taskId: string) => Task;
  changeStatus: (taskItem: Task, status: 'todo' | 'doing' | 'done') => void;
  setCallback: (callback: () => void) => void;
}

export const useTaskStorage = create<ITask>()(
  persist(
    (set, get) => ({
      tasksUser: [],
      date: '',
      toUpdate: () => {},
      setCallback: (callback: () => void) => {
        set({ toUpdate: callback });
      },
      clearTasks: () => {
        set({ tasksUser: [] });
      },
      updateTask: (taskItem: Task) => {
        set({
          tasksUser: get().tasksUser.map(e => {
            if (e.id === taskItem.id) {
              return taskItem;
            }

            return e;
          })
        });
      },
      setDay: (newDay: string) => set({ date: newDay }),
      addTask: (taskItem: Task) => {
        set({ tasksUser: [...get().tasksUser, taskItem] })
      },
      removeTask: (taskItem: Task) => {
        set({ tasksUser: get().tasksUser.filter(e => e !==  taskItem) })
      },
      getTasksByDay: () => {
        return get().tasksUser.filter(e => e.date === get().date);
      },
      findTaskById: (taskId: string) => {
        return get().tasksUser
          .filter(e => e.date === get().date)
          .filter(e => e.id === taskId)[0];
      },
      changeStatus: (taskItem: Task, status: 'todo' | 'doing' | 'done') => {
        set({
          tasksUser: get().tasksUser.map(e => {
            if (e === taskItem) {
              e.status = status;
            }

            return e;
          })
        });
      },
    }),
    {
      name: 'taks', 
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
