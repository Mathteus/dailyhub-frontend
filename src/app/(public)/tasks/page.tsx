'use client';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit, Trash2, Plus } from 'lucide-react';
import 'antd/dist/reset.css';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';

interface Task {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
}

const initialTasks: Task[] = [
  { id: '1', date: '2023-05-10', title: 'Reunião com cliente', description: 'Discutir requisitos do projeto', status: 'todo' },
  { id: '2', date: '2023-05-10', title: 'Fazer relatório mensal', description: 'Compilar dados de vendas', status: 'doing' },
  { id: '3', date: '2023-05-10', title: 'Enviar proposta', description: 'Finalizar e enviar proposta comercial', status: 'done' },
  { id: '4', date: '2023-05-12', title: 'Atualizar documentação', description: 'Revisar e atualizar docs do projeto', status: 'todo' },
];

export default function TasksPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<'calendar' | 'kanban'>('calendar');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  
  // Handle date selection from Ant Calendar
  const handleCalendarSelect = (value: Dayjs) => {
    const date = value.toDate();
    setSelectedDate(date);
    setSelectedView('kanban');
  };
  
  // Filter tasks for selected date
  const dayTasks = tasks.filter(task => {
    return task.date === format(selectedDate, 'yyyy-MM-dd');
  });
  
  // Group tasks by status
  const todoTasks = dayTasks.filter(task => task.status === 'todo');
  const doingTasks = dayTasks.filter(task => task.status === 'doing');
  const doneTasks = dayTasks.filter(task => task.status === 'done');
  
  // Open modal to add/edit task
  const openTaskModal = (task: Task | null = null) => {
    if (task) {
      setCurrentTask(task);
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setIsTaskModalOpen(true);
      return;
    }

    setCurrentTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setIsTaskModalOpen(true);
  };
  
  // Save task
  const handleSaveTask = () => {
    if (!taskTitle) {
      alert('Por favor, informe o título da tarefa');
      return;
    }
    
    if (currentTask) {
      // Edit existing task
      setTasks(tasks.map(task => 
        task.id === currentTask.id 
          ? { ...task, title: taskTitle, description: taskDescription }
          : task
      ));
      setIsTaskModalOpen(false);
      return;
    }

    // Add new task
    const newTask: Task = {
      id: Date.now().toString(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      title: taskTitle,
      description: taskDescription,
      status: 'todo'  // Default status for new tasks
    };
    setTasks([...tasks, newTask]);
    setIsTaskModalOpen(false);
  };
  
  // Delete task
  const handleDeleteTask = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  
  // Drag and drop handlers
  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (status: 'todo' | 'doing' | 'done') => {
    if (draggedTask) {
      setTasks(tasks.map(task => 
        task.id === draggedTask ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };
  
  // Back to calendar view
  const handleBackToCalendar = () => {
    setSelectedView('calendar');
  };

  const CalendarView = () => {
    return (
      <Card className="h-[calc(100vh-120px)]">
        <CardHeader>
          <CardTitle className="text-center">
            Selecione uma data para gerenciar suas tarefas
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)]">
          <Calendar 
            fullscreen={true}
            onSelect={handleCalendarSelect}
            className="h-full"
          />
        </CardContent>
      </Card>
    );
  };

  const HeaderTasks = () => {
    return (
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBackToCalendar}>
          Voltar para Calendário
        </Button>
        <h2 className="text-2xl font-bold">
          {format(selectedDate, 'dd MMMM yyyy', { locale: ptBR })}
        </h2>
        <Button onClick={() => openTaskModal()} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Adicionar Tarefa</span>
        </Button>
      </div>
    );
  };

  interface KanbanProps {
    title: 'A Fazer' | 'Fazendo' | 'Feito';
    tasks: Task[];
    status: 'todo' | 'doing' | 'done';
    bgColor: string;
    textColor: string;
  };

  const KanbanColumn = ({ title, tasks, status, bgColor, textColor }: KanbanProps) => {
    const NoContent = () => {
      return (
        <div className="p-4 text-center text-gray-500">
          Nenhuma tarefa a fazer
        </div>
      );
    }

    const KanbanContent = () => {
      return (
        <CardContent className="p-2 space-y-2 min-h-[200px]">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white rounded-md p-3 shadow border cursor-grab"
              draggable
              onDragStart={() => handleDragStart(task.id)}
            >
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-gray-600 mt-1">{task.description}</div>
              
              <div className="mt-3 flex justify-end items-center">
                <div className="space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openTaskModal(task)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      );
    };

    return (
      <Card
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(status)}
      >
        <CardHeader className="rounded-t-lg" style={{ backgroundColor: bgColor }}>
          <CardTitle className="text-center" style={{ color: textColor }}>
            {title}
          </CardTitle>
          {tasks.length ? <KanbanContent /> : <NoContent />}
        </CardHeader>

      </Card>
    );
  };

  const KanbanBoard = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KanbanColumn 
          title="A Fazer" 
          tasks={todoTasks} 
          status="todo" 
          bgColor="#fee2e2" 
          textColor="#b91c1c" 
        />

        <KanbanColumn
          title="Fazendo"
          tasks={doingTasks}
          status="doing"
          bgColor="#fefce8"
          textColor="#a16207"
        />

        <KanbanColumn
          title="Feito"
          tasks={doneTasks}
          status="done"
          bgColor="#f0fdf4"
          textColor="#15803d"
        />
      </div>
    );
  };

  const AddEditTask = () => {
    return (
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              {currentTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-800">Título</Label>
              <Input
                id="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="text-black"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-800">Descrição</Label>
              <Textarea
                id="description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="min-h-[100px] text-black"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTask}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const TaskContent = () => {
    return (
      <>
        <div className="space-y-6">
          <HeaderTasks />
          <KanbanBoard />
        </div>
        <AddEditTask />
      </>
    );
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tarefas</h1>
      {selectedView === 'calendar' ? <CalendarView /> : <TaskContent />}
    </div>
  );
};
