
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-2xl p-8 shadow-xl animate-fade-in">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 animate-blur-in">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <h1 className="text-2xl font-bold mb-1 animate-slide-up">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
              Login to manage your lounges and users
            </p>
          </div>
          
          <LoginForm onLogin={onLogin} />
          
          <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p>Demo Account: admin@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
