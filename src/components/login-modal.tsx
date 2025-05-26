
// import type React from 'react';
// import { useState } from 'react';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
// } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// // import { useAuth } from '../contexts/auth-context';
// import { toast } from 'sonner';

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
//   // const { login, register, verifyCode, showVerification, setShowVerification, tempUserData } = useAuth();
  
//   // Login state
//   const [loginIdentifier, setLoginIdentifier] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
  
//   // Register state
//   const [fullname, setFullname] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   // Verification state
//   const [code, setCode] = useState('');
  
//   const handleLogin = async () => {
//     if (!loginIdentifier || !loginPassword) {
//       toast.error('Preencha todos os campos');
//       return;
//     }
    
//     // Determine method based on if the identifier contains @ (email) or not (username)
//     const isEmail = loginIdentifier.includes('@');
    
//     const success = await login(
//       loginIdentifier, 
//       loginPassword, 
//       isEmail
//     );
    
//     if (success) {
//       toast.success('Login realizado com sucesso!');
//       onClose();
//     } else {
//       toast.error('Credenciais inválidas');
//     }
//   };
  
//   const handleRegister = async () => {
//     if (!fullname || !username || !email || !password || !confirmPassword) {
//       toast.error('Preencha todos os campos');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       toast.error('As senhas não coincidem');
//       return;
//     }
    
//     const success = await register(fullname, username, email, password);
    
//     if (success) {
//       toast.success('Código de verificação enviado');
//     } else {
//       toast.error('Erro ao registrar');
//     }
//   };
  
//   const handleVerifyCode = async () => {
//     if (!code) {
//       toast.error('Digite o código de verificação');
//       return;
//     }
    
//     const success = await verifyCode(code);
    
//     if (success) {
//       toast.success('Registro concluído com sucesso!');
//       onClose();
//     } else {
//       toast.error('Código inválido');
//     }
//   };
  
//   const handleBack = () => {
//     setShowVerification(false);
//   };
  
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Entre ou Registre-se</DialogTitle>
//         </DialogHeader>
        
//         {showVerification ? (
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="verification-code">Código de verificação</Label>
//               <Input
//                 id="verification-code"
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Digite o código recebido"
//                 className="text-black"
//               />
//             </div>
//             <div className="flex justify-between">
//               <Button variant="outline" onClick={handleBack}>
//                 Voltar
//               </Button>
//               <Button onClick={handleVerifyCode}>
//                 Confirmar
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Tabs defaultValue="login">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Entrar</TabsTrigger>
//               <TabsTrigger value="register">Registrar</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="login" className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="login-identifier">
//                   Nome de usuário ou Email
//                 </Label>
//                 <Input
//                   id="login-identifier"
//                   type="text"
//                   value={loginIdentifier}
//                   onChange={(e) => setLoginIdentifier(e.target.value)}
//                   placeholder="seu_usuario ou seu@email.com"
//                   className="text-black"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="login-password">Senha</Label>
//                 <Input
//                   id="login-password"
//                   type="password"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                   className="text-black"
//                 />
//               </div>
              
//               <Button onClick={handleLogin} className="w-full">
//                 Entrar
//               </Button>
//             </TabsContent>
            
//             <TabsContent value="register" className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullname">Nome completo</Label>
//                 <Input
//                   id="fullname"
//                   type="text"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                   className="text-black"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="register-username">Nome de usuário</Label>
//                 <Input
//                   id="register-username"
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="text-black"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="register-email">Email</Label>
//                 <Input
//                   id="register-email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="text-black"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="register-password">Senha</Label>
//                 <Input
//                   id="register-password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="text-black"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="confirm-password">Confirme a senha</Label>
//                 <Input
//                   id="confirm-password"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="text-black"
//                 />
//               </div>
              
//               <Button onClick={handleRegister} className="w-full">
//                 Registrar
//               </Button>
//             </TabsContent>
//           </Tabs>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LoginModal;
