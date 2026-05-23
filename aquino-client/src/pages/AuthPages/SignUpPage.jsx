import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    contactNumber: '',
    gender: '',
    age: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await createUser(formData);

      setSuccess('Account created successfully!');

      setTimeout(() => {
        navigate('/auth/signin');
      }, 1200);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Registration failed. Please try again.';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-zinc-900">Sign Up</h1>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        {/* Username */}
        <div>
          <label className="text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        {/* Name */}
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
          required
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={inputClasses}
          required
        />

        {/* Address */}
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className={inputClasses}
          required
        />

        {/* Contact Number */}
        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className={inputClasses}
          required
        />

        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={inputClasses}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Age */}
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className={inputClasses}
          required
        />

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={isLoading}
        >
          {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </Button>

      </form>

      <div className="mt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;