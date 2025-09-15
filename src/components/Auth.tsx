import React, { useState } from 'react';
import type { User, UserRole } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please make sure it is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text-primary">
            {isLoginView ? 'Welcome' : 'Create Account'}
          </h2>
          <p className="mt-2 text-text-secondary">
            {isLoginView ? "Sign in to access the department portal." : "Get started with your account."}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLoginView && (
             <div className="relative">
              <input
                placeholder="Full Name"
                className="peer h-10 w-full bg-gray-700 border-b-2 border-border text-text-primary placeholder-transparent focus:outline-none focus:border-primary"
                required id="name" name="name" type="text"
              />
              <label htmlFor="name" className="absolute left-0 -top-3.5 text-text-secondary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">
                Full Name
              </label>
            </div>
          )}
           <div className="relative">
            <input
              placeholder="Email address"
              className="peer h-10 w-full bg-gray-700 border-b-2 border-border text-text-primary placeholder-transparent focus:outline-none focus:border-primary"
              required id="email" name="email" type="email" autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-text-secondary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full bg-gray-700 border-b-2 border-border text-text-primary placeholder-transparent focus:outline-none focus:border-primary"
              required id="password" name="password" type="password" defaultValue="password"
            />
             <label htmlFor="password" className="absolute left-0 -top-3.5 text-text-secondary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">
              Password
            </label>
          </div>

          {isLoginView && (
             <div>
                <label className="text-sm text-text-secondary">Login as:</label>
                <div className="flex items-center justify-between mt-2 rounded-lg bg-gray-700 p-1">
                    {(['STUDENT', 'STAFF', 'ADMIN'] as UserRole[]).map(r => (
                        <button type="button" key={r} onClick={() => setRole(r)}
                        className={`w-full py-2 text-sm font-medium rounded-md transition-colors ${role === r ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-600'}`}>
                            {r.charAt(0) + r.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>
          )}

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : (isLoginView ? 'Sign In' : 'Sign Up')}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-primary hover:text-primary-dark">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;