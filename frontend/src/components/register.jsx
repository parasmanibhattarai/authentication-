import { useState } from "react";
import { toast } from "react-hot-toast";
import {ToastContainer} from "react-toastify"

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    console.log(name, value);
    const updatedUserInfo = {...userInfo, [name]: value };
    setUserInfo(updatedUserInfo);
  }
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { name, email, password } = userInfo;
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    console.log("User Info:", userInfo);
    try {
      const response = await fetch("http://localhost:4001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name, 
          email: userInfo.email, 
          password: userInfo.password,
        })
      });

      const responseData = await response.json();

      const{ message, success } = responseData;

      // Display the message from the response
      if(success){
        toast.success(message);
        setTimeout(() => {
          window.location.href = "/login"; // Redirect to login page after successful registration
        },1000)
      }else if(!success){
        toast.error(message);
      }
      console.log("Response Data:", responseData);

    } catch (error) {
      console.log("Error:", error);
    }


    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Join us and start your journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
