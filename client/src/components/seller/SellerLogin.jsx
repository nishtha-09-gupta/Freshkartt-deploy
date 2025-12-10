import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', { email, password });
      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/api/seller/is-auth');
        if (data.success) {
          setIsSeller(true);
          navigate('/seller');
        } else {
          setIsSeller(false);
        }
      } catch (error) {
        setIsSeller(false);
      }
    };
    checkAuth();
  }, []);

  if (isSeller) return null;

  return (
    <>
      {/* BACK BUTTON FIXED */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-50 bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md shadow-md transition"
      >
        ⬅ Back
      </button>

      {/* MAIN FORM */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-200 w-full max-w-sm"
        >
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="text-primary">Seller</span> Login
          </h2>

          <p className="text-xs text-gray-500 text-center mb-6">
            For testing: <b>admin@example.com</b> / <b>12345</b>
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 outline-primary focus:ring-2 focus:ring-primary/40"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-2 outline-primary focus:ring-2 focus:ring-primary/40"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default SellerLogin;
