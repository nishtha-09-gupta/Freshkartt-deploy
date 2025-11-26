
// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const SellerLogin = () => {
//   const { isSeller, setIsSeller, navigate, axios } = useAppContext();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await axios.post('/api/seller/login', { email, password });
//       if (data.success) {
//         setIsSeller(true);
//         navigate('/seller');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

  
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { data } = await axios.get('/api/seller/is-auth');
//         if (data.success) {
//           setIsSeller(true);
//           navigate('/seller');
//         } else {
//           setIsSeller(false);
//         }
//       } catch (error) {
//         setIsSeller(false);
//       }
//     };
//     checkAuth();
//   }, []);

  
//   if (isSeller) return null;

//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
//       <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
//         <p className='text-2xl font-medium m-auto'>
//           <span className='text-primary'>Seller</span> Login
//         </p>
//         <p className='text-xs text-gray-500 m-auto'>
//           For testing, use <span className='font-medium'>admin@example.com</span> and password{' '}
//           <span className='font-medium'>12345</span>
//         </p>
//         <div className='w-full'>
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type='email'
//             placeholder='enter your email'
//             className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
//             required
//           />
//         </div>
//         <div className='w-full'>
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             type='password'
//             placeholder='enter your password'
//             className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
//             required
//           />
//         </div>
//         <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
//       </div>
//     </form>
//   );
// };

// export default SellerLogin;

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
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] text-white px-4 py-2 rounded-md"
      >
        ⬅ Back
      </button>

      <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
          <p className='text-2xl font-medium m-auto'>
            <span className='text-primary'>Seller</span> Login
          </p>

          <p className='text-xs text-gray-500 m-auto'>
            For testing, use <span className='font-medium'>admin@example.com</span> and password{' '}
            <span className='font-medium'>12345</span>
          </p>

          <div className='w-full'>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              placeholder='enter your email'
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
              required
            />
          </div>

          <div className='w-full'>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              placeholder='enter your password'
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
              required
            />
          </div>

          <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default SellerLogin;
