import { useLocation, useNavigate } from "react-router-dom";
import { LuArrowRightToLine } from "react-icons/lu";
import { useEffect, useState } from "react";
import useAuth from "../redux/hooks/auth/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const nav = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location?.state?.message) {
      setMessage(location.state.message);

      location.state.message = null;
    }
    if (message) {
      toast.success(message);
    }
  }, [location, message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials.userName, credentials.password);
      if (response?.success == false) {
        throw new Error("Login Failed!");
      }
      nav("/");
    } catch (error) {
      setError(error);
      setCredentials({ userName: "", password: "" });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className=" w-full h-screen ">
        <div className="flex w-full h-full justify-center align-middle items-center bg-[url(/logo/login_bg.jpg)] bg-cover bg-center">
          <div className=" rounded-xl shadow-lg glass_bg p-5 md:p-7 lg:p-10 flex flex-col gap-5 2xl:w-2/5 overflow-hidden relative min-w-[400px]">
            <div className=" flex flex-col gap-2 lg:gap-4 px-1 lg:px-0">
              <p className=" text-xs md:text-sm text-[#00000080] leading-relaxed tracking-wide font-semibold">
                Welcome back !!!
              </p>
              <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold text-white">
                Login
              </h2>
            </div>

            <form onSubmit={submitHandler} className=" flex flex-col gap-4 ">
              {error ? (
                <div className=" text-red-500 text-xs">{error}</div>
              ) : (
                ""
              )}
              <div className=" flex flex-col gap-1">
                <div className=" px-1 lg:px-3">
                  <label
                    htmlFor="userName"
                    className="text-sm md:text-base text-white"
                  >
                    Email
                  </label>
                </div>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  required
                  value={credentials.userName}
                  onChange={handleChange}
                  className=" text-black ring-0 focus:ring-0 bg-[#ffffff80] text-sm lg:text-base border-0 shadow-md rounded-md px-5 focus:bg-white focus:outline-none h-10"
                  placeholder="Enter email address to login"
                  autoFocus
                  autoComplete="false"
                />
              </div>
              <div className=" flex flex-col gap-1">
                <div className=" flex flex-row justify-between items-center px-1 lg:px-3">
                  <label
                    htmlFor="password"
                    className="text-sm md:text-base text-white"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className=" text-dark ring-0 focus:ring-0 text-sm lg:text-base border-0 shadow-md rounded-md px-5 focus:bg-white bg-[#ffffff80] focus:outline-none h-10"
                  placeholder="Password"
                />
              </div>

              <div className=" flex flex-col gap-3">
                <button
                  type="submit"
                  className=" group/cart-item border-0 shadow-md bg-[#ffffff80] hover:bg-white transition-colors duration-200 rounded-full px-5 py-2 font-semibold flex flex-row gap-2 items-center w-fit "
                >
                  <span className=" text-black group-hover/cart-item:text-black transition-colors duration-200 ">
                    Login
                  </span>{" "}
                  <LuArrowRightToLine className=" text-xl font-bold text-black group-hover/cart-item:text-black transition-colors duration-200 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
