
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Lock, Mail } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = onLogin(email, password);
      
      if (!success) {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm animate-scale-in">
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            className="pl-10 py-6 bg-secondary/50 border-0 shadow-sm" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            className="pl-10 py-6 bg-secondary/50 border-0 shadow-sm" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full py-6 rounded-lg shadow-sm transition-all duration-300 ease-in-out" 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
