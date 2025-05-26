'use client';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit, Trash2, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import 'antd/dist/reset.css';
import { useState } from 'react';

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
}

const initialExpenses: Expense[] = [
  { id: '1', date: '2023-05-01', description: 'Supermercado', amount: 250.5, category: 'Alimentação', type: 'expense' },
  { id: '2', date: '2023-05-05', description: 'Conta de luz', amount: 120, category: 'Habitação', type: 'expense' },
  { id: '3', date: '2023-05-10', description: 'Salário', amount: 3000, category: 'Trabalho', type: 'income' },
  { id: '4', date: '2023-05-15', description: 'Restaurante', amount: 65.4, category: 'Alimentação', type: 'expense' },
  { id: '5', date: '2023-05-20', description: 'Freelance', amount: 450, category: 'Trabalho', type: 'income' },
];

export default function FinancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<'calendar' | 'expenses'>('calendar');
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseType, setExpenseType] = useState<'expense' | 'income'>('expense');
  
  // Get year and month for display
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  
  // Filter expenses for selected month
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  // Calculate total expenses, income and balance
  const totalExpenses = monthlyExpenses
    .filter(e => e.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);
    
  const totalIncome = monthlyExpenses
    .filter(e => e.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Data for pie chart
  const generatePieData = () => {
    // Group expenses by category
    const expensesByCategory = monthlyExpenses.reduce((acc, expense) => {
      const key = `${expense.category}-${expense.type}`;
      if (!acc[key]) {
        acc[key] = {
          name: expense.category,
          value: 0,
          type: expense.type
        };
      }
      acc[key].value += expense.amount;
      return acc;
    }, {} as Record<string, { name: string; value: number; type: 'expense' | 'income' }>);
    
    return Object.values(expensesByCategory);
  };
  
  const pieData = generatePieData();
  const COLORS = {
    expense: ['#FF8042', '#FFBB28', '#FF8042', '#FF5733', '#C70039'],
    income: ['#00C49F', '#0088FE', '#00C49F', '#0088FE', '#00C49F']
  };
  
  // Handle Ant Calendar month selection
  const handleCalendarSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedView('expenses');
  };
  
  // Open modal to add/edit expense
  const openExpenseModal = (expense: Expense | null = null) => {
    if (expense) {
      setCurrentExpense(expense);
      setExpenseDescription(expense.description);
      setExpenseAmount(expense.amount.toString());
      setExpenseCategory(expense.category);
      setExpenseType(expense.type);
      setIsExpenseModalOpen(true);
      return;
    }

    setCurrentExpense(null);
    setExpenseDescription('');
    setExpenseAmount('');
    setExpenseCategory('Alimentação');
    setExpenseType('expense');
    setIsExpenseModalOpen(true);
  };
  
  // Save expense
  const handleSaveExpense = () => {
    const amount = Number(expenseAmount);
    if (!expenseDescription || Number.isNaN(amount) || amount <= 0 || !expenseCategory) {
      alert('Por favor, preencha todos os campos corretamente');
      return;
    }
    
    const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    
    if (currentExpense) {
      // Edit existing expense
      setExpenses(expenses.map(expense => 
        expense.id === currentExpense.id 
          ? { ...expense, description: expenseDescription, amount, category: expenseCategory, type: expenseType }
          : expense
      ));
      setIsExpenseModalOpen(false);
      return;
    }
    
    // Add new expense
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: formattedDate,
      description: expenseDescription,
      amount,
      category: expenseCategory,
      type: expenseType
    };
    setExpenses([...expenses, newExpense]);
    setIsExpenseModalOpen(false);
  };
  
  // Delete expense
  const handleDeleteExpense = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };
  
  // Back to calendar view
  const handleBackToCalendar = () => {
    setSelectedView('calendar');
  };

  // Handle Ant Calendar mode change (only year changing is allowed)
  const handlePanelChange = (date: Date, mode: CalendarMode) => {
    setSelectedDate(date);
  };
  
  // Custom tooltip for pie chart
  interface PayloadProps {
    payload: {
      name: string;
      value: number;
      type: 'expense' | 'income';
    };
  }

  interface CustomTooltipProps {
    active?: boolean;
    payloads?: PayloadProps[];
  }
  const CustomTooltip = ({ active, payloads }: CustomTooltipProps) => {
    if (active && payloads && payloads.length) {
      const data = payloads[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            {data.type === 'expense' ? 'Gasto' : 'Ganho'}: R$ {data.value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CalendarView = () => {
    return (
      <Card className="h-[calc(100vh-120px)]">
        <CardHeader>
          <CardTitle className="text-center">
            Selecione um mês para gerenciar seus gastos e ganhos
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)]">
          <Calendar 
            fullscreen={true}
            mode="year"
            onSelect={(date) => handleCalendarSelect(date.toDate())}
            onPanelChange={(date, mode) => handlePanelChange(date.toDate(), mode)}
            className="h-full"
          />
        </CardContent>
      </Card>
    );
  };

  const SummaryCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="bg-red-50 pb-2">
            <CardTitle className="text-red-700 text-center text-lg">Total de Gastos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-center text-xl font-bold text-red-600">
            R$ {totalExpenses.toFixed(2)}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-green-50 pb-2">
            <CardTitle className="text-green-700 text-center text-lg">
              Total de Ganhos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-center text-xl font-bold text-green-600">
            R$ {totalIncome.toFixed(2)}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className={`${balance >= 0 ? 'bg-blue-50' : 'bg-amber-50'} pb-2`}>
            <CardTitle className={`${balance >= 0 ? 'text-blue-700' : 'text-amber-700'} text-center text-lg`}>
              Saldo
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-4 text-center text-xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>
            R$ {balance.toFixed(2)}
          </CardContent>
        </Card>
      </div>
    );
  };

  const FinanceGraphic = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Gastos e Ganhos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${entry.name}-${index}`} 
                      fill={COLORS[entry.type][index % COLORS[entry.type].length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  };

  interface BadgeExpenseProps {
    expenseType: string;
  };

  const BadgeExpense = ({ expenseType }: BadgeExpenseProps) => {
    return (
      <div className="col-span-1">
        {expenseType === 'expense' 
          ? <Badge variant="destructive" className="bg-red-500">Gasto</Badge>
          : <Badge variant="default" className="bg-green-500">Ganho</Badge>
        }
      </div>
    );
  };

  const NoRegister = () => {
    return (
      <div className="py-4 text-center">
        Nenhum registro financeiro neste mês
      </div>
    ); 
  };

  interface RegisterProps {
    monthlyExpenses: Expense[];
  };
  
  const Registers = ({ monthlyExpenses }: RegisterProps) => {
    if (!monthlyExpenses.length) {
      return <NoRegister />;
    }

    return (
      <>
        {monthlyExpenses.map(expense => (
          <div key={expense.id} className="grid grid-cols-12 py-2 border-b">
            <div className="col-span-2">
              {format(new Date(expense.date), 'dd/MM/yyyy')}
            </div>
            <div className="col-span-3">{expense.description}</div>
            <div className="col-span-2">{expense.category}</div>
            <BadgeExpense expenseType={expense.type} />
            <div className={`col-span-2 text-right ${expense.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
              R$ {expense.amount.toFixed(2)}
            </div>
            <div className="col-span-2 text-right space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => openExpenseModal(expense)}
              >
                <Edit size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </>
    );
  };

  const FinanceTable = () => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Gastos e Ganhos</CardTitle>
          <div className="font-bold">
            Saldo: R$ {balance.toFixed(2)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-12 font-bold pb-2 border-b">
              <div className="col-span-2">Data</div>
              <div className="col-span-3">Descrição</div>
              <div className="col-span-2">Categoria</div>
              <div className="col-span-1">Tipo</div>
              <div className="col-span-2 text-right">Valor</div>
              <div className="col-span-2 text-right">Ações</div>
            </div>
            <Registers monthlyExpenses={monthlyExpenses} />
          </div>
        </CardContent>
      </Card>
    );
  };

  const HeaderTableViews = () => {
    return (
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBackToCalendar}>
          Voltar para Calendário
        </Button>
        <h2 className="text-2xl font-bold">
          {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <Button onClick={() => openExpenseModal()} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Adicionar Registro</span>
        </Button>
      </div>
    );
  };

  const ListCategories = () => {
    const listCategories = [
      'Alimentação',
      'Transporte',
      'Habitação',
      'Saúde',
      'Educação',
      'Lazer',
      'Trabalho',
      'Outros'
    ];
    return (
      <SelectContent>
        {listCategories.map(category => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    );
  }

  const AddEditExpenseModal = () => {
    return (
      <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              {currentExpense ? 'Editar Registro' : 'Adicionar Novo Registro'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-800">Tipo</Label>
              <Select value={expenseType} onValueChange={(value) => setExpenseType(value as 'expense' | 'income')}>
                <SelectTrigger className="text-black">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Gasto</SelectItem>
                  <SelectItem value="income">Ganho</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-800">Descrição</Label>
              <Input
                id="description"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                className="text-black"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-800">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="text-black"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-800">Categoria</Label>
              <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                <SelectTrigger className="text-black">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <ListCategories />
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExpenseModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveExpense}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const TablesViews = () => {
    return (
      <>
        <div className="space-y-6">
          <HeaderTableViews />        
          <SummaryCards />
          <FinanceGraphic />
          <FinanceTable />
        </div>
        <AddEditExpenseModal />
      </>
    )
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Finanças</h1>
      {selectedView === 'calendar' ? <CalendarView /> : <TablesViews />}
    </div>
  );
};