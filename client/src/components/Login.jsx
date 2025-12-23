import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name, email, password
      });
      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 bg-white w-80 sm:w-[360px] p-8 rounded-2xl shadow-2xl border border-gray-100"
      >
        <p className="text-2xl font-semibold text-center">
          <span className="text-primary">{state === "login" ? "Login" : "Sign Up"}</span>
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="font-medium text-gray-700">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your name"
              className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-primary bg-gray-50"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="font-medium text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="name@example.com"
            className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-primary bg-gray-50"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="font-medium text-gray-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-primary bg-gray-50"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-600 text-sm">
            New user?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-lg text-sm font-semibold">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
