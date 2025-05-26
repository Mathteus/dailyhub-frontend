'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from 'sonner';
// import { useAuth } from '@/contexts/auth-context';
import { useTimeContext } from '@/contexts/time-context';
import { Tab } from '@nextui-org/react';

// List of common timezones
const TIMEZONES = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
  { value: 'America/New_York', label: 'New York (GMT-5/GMT-4)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-8/GMT-7)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (GMT+1/GMT+2)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (GMT+8)' },
  { value: 'Australia/Sydney', label: 'Sydney (GMT+10/GMT+11)' },
  { value: 'Pacific/Auckland', label: 'Auckland (GMT+12/GMT+13)' },
];

const user = {
  fullname: 'Convidado',
  username: 'Convidado',
  email: 'convidado@email.com'
}

interface ThemeSettings {
  bodyBg: string;
  bodyText: string;
  contentBg: string;
  contentText: string;
}

const defaultThemeSettings: ThemeSettings = {
  bodyBg: '#000000',
  bodyText: '#C8C8C9',
  contentBg: '#FFFFFF',
  contentText: '#333333'k
};  

const defaultLanguages = [
  { value: 'pt-BR', label: 'Português (Brasil) 🇧🇷' },
  { value: 'en', label: 'English 🇺🇸' },
];

export default function SettingsPage() {
  // const { user } = useAuth();
  const { timezone, setTimezone } = useTimeContext();
  const [language, setLanguage] = useState('pt-BR');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings);
  
  // Apply theme settings when they change
  useEffect(() => {
    const root = document.documentElement;
    
    // Update CSS variables or directly modify styles
    document.body.style.backgroundColor = themeSettings.bodyBg;
    document.body.style.color = themeSettings.bodyText;
    
    // Find all elements with content-area class and update their styles
    const contentAreas = document.querySelectorAll('.content-area');
    for (const htmlArea of contentAreas) {
      const element = htmlArea as HTMLElement;
      element.style.backgroundColor = themeSettings.contentBg;
      element.style.color = themeSettings.contentText;
    }
    
  }, [themeSettings]);
  
  const handleSaveSettings = () => {
    // In a real app, this would call an API
    toast.success('Configurações salvas com sucesso!');
  };
  
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }
    
    // In a real app, this would call an API
    toast.success('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const TabsCategories = () => {
    const categories = [
      { value: 'appearance', label: 'Aparência' },
      { value: 'account', label: 'Conta' },
      { value: 'language', label: 'Idioma' },
      { value: 'time', label: 'Fuso Horário' },
    ];

    return (
      <TabsList className="grid w-full grid-cols-4 mb-6">
        {categories.map(category => (
          <TabsTrigger key={category.value} value={category.value}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    );
  };

  interface TabHeaderProps {
    title: string;
    description: string;
  };
  const TabHeader = ({ title, description }: TabHeaderProps) => {
    return (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
    );
  };

  const TabAppearance = () => {
    return (
      <TabsContent value="appearance">
        <Card>
          <TabHeader 
            title="Aparência" 
            description="Personalize as cores do dashboard"
          />
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="body-bg">Cor de Fundo do Body</Label>
              <div className="flex space-x-4 items-center">
                <Input
                  id="body-bg"
                  type="color"
                  value={themeSettings.bodyBg}
                  onChange={(e) => setThemeSettings({...themeSettings, bodyBg: e.target.value})}
                  className="w-12 h-12 cursor-pointer p-1"
                />
                <Input
                  type="text"
                  value={themeSettings.bodyBg}
                  onChange={(e) => setThemeSettings({...themeSettings, bodyBg: e.target.value})}
                  className="w-32"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body-text">Cor do Texto do Body</Label>
              <div className="flex space-x-4 items-center">
                <Input
                  id="body-text"
                  type="color"
                  value={themeSettings.bodyText}
                  onChange={(e) => setThemeSettings({...themeSettings, bodyText: e.target.value})}
                  className="w-12 h-12 cursor-pointer p-1"
                />
                <Input
                  type="text"
                  value={themeSettings.bodyText}
                  onChange={(e) => setThemeSettings({...themeSettings, bodyText: e.target.value})}
                  className="w-32"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-bg">Cor de Fundo do Conteúdo</Label>
              <div className="flex space-x-4 items-center">
                <Input
                  id="content-bg"
                  type="color"
                  value={themeSettings.contentBg}
                  onChange={(e) => setThemeSettings({...themeSettings, contentBg: e.target.value})}
                  className="w-12 h-12 cursor-pointer p-1"
                />
                <Input
                  type="text"
                  value={themeSettings.contentBg}
                  onChange={(e) => setThemeSettings({...themeSettings, contentBg: e.target.value})}
                  className="w-32"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-text">Cor do Texto do Conteúdo</Label>
              <div className="flex space-x-4 items-center">
                <Input
                  id="content-text"
                  type="color"
                  value={themeSettings.contentText}
                  onChange={(e) => setThemeSettings({...themeSettings, contentText: e.target.value})}
                  className="w-12 h-12 cursor-pointer p-1"
                />
                <Input
                  type="text"
                  value={themeSettings.contentText}
                  onChange={(e) => setThemeSettings({...themeSettings, contentText: e.target.value})}
                  className="w-32"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setThemeSettings(defaultThemeSettings)}
              >
                Resetar
              </Button>
              <Button onClick={handleSaveSettings}>
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    );
  };

  const TabAccount = () => {
    const Guest = () => {
      return (
        <div className="py-4 text-center">
          <p className="mb-4">Faça login para gerenciar suas informações de conta</p>
        </div>
      );
    };

    const Authenticated = () => {
      return (
        <>
          <div className="space-y-1">
            <Label>Nome</Label>
            <div className="p-2 bg-gray-100 rounded text-dashboard-background">
              {user.fullname}
            </div>
          </div>
          
          <div className="space-y-1">
            <Label>Nome de usuário</Label>
            <div className="p-2 bg-gray-100 rounded text-dashboard-background">
              @{user.username}
            </div>
          </div>
          
          <div className="space-y-1">
            <Label>Email</Label>
            <div className="p-2 bg-gray-100 rounded text-dashboard-background">
              {user.email}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <Button onClick={handleChangePassword}>
                Alterar Senha
              </Button>
            </div>
          </div>
        </>
      );
    };


    return (
      <TabsContent value="account">
        <Card>
          <TabHeader
            title="Conta"
            description="Gerencie suas informações de conta"
          />
          <CardContent className="space-y-6">
            {user.username !== 'Convidado' ? <Authenticated /> : <Guest />}
          </CardContent>
        </Card>
      </TabsContent>
    );
  };

  const TabLanguage = () => {
    const RadioLanguages = () => {
      return defaultLanguages.map(lang => (
        <div key={lang.value} className="flex items-center space-x-2">
          <RadioGroupItem value={lang.value} id={lang.value} />
          <Label htmlFor={lang.value}>{lang.label}</Label>
        </div>
      ))
    };

    return (
      <TabsContent value="language">
        <Card>
          <TabHeader 
            title="Idioma" 
            description="Selecione o idioma do dashboard"
          />
          <CardContent className="space-y-6">
            <RadioGroup value={language} onValueChange={setLanguage}>
              <RadioLanguages />
            </RadioGroup>
            
            <Button onClick={handleSaveSettings}>
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    );
  };

  const TabTimezone = () => {
    return (
      <TabsContent value="time">
        <Card>
          <TabHeader
            title="Fuso Horário"
            description="Selecione o fuso horário do dashboard"
          />
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select 
                value={timezone} 
                onValueChange={(value) => setTimezone(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fuso horário" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                O relógio digital na barra lateral irá mostrar o horário neste fuso horário.
              </p>
            </div>
            
            <Button onClick={handleSaveSettings}>
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    );
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      <Tabs defaultValue="appearance">
        <TabsCategories />
        <TabAppearance />
        <TabAccount />
        <TabLanguage />
        <TabTimezone />
      </Tabs>
    </>
  );
};
