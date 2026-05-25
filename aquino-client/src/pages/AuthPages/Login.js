import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/UserService';
import Button from '../../components/Button'; 

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';
const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      const { token, type: role, firstName } = response.data;

      if (!token) {
        throw new Error('No token received');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('firstName', firstName);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'editor') {
        navigate('/editor/dashboard');
      } else {
        navigate('/viewer/dashboard');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-2">
        Log In
      </h2>
      <p className="text-sm text-zinc-600 mb-6">
        Access your account to manage your floral subscriptions.
      </p>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs text-zinc-500">
            Minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={isLoading}
        >
          {isLoading ? 'LOGGING IN...' : 'LOG IN'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-600">
        Don't have an account?{' '}
        <a href="/auth/signup" className="font-semibold text-zinc-900 hover:underline">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;