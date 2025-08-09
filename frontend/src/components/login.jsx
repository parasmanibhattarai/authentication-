import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
  const [loginInfo, setloginInfo] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });


    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!loginInfo.email || !loginInfo.password) {
        toast.error("All fields are required");
        return;
      }

      console.log("Login Info:", loginInfo);
      try {
        const response = await fetch("https://authentication-api3.vercel.app/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo)
        });
  
        const responseData = await response.json();
       
  
        const{ success,message,token,name,error } = responseData;
       
        // Display the message from the response
        if(success){

          toast.success(message);

          // Store the token and user name in local storage

          localStorage.setItem("token", token); // Store the token in local storage
          localStorage.setItem("loggedInUser", name); // Store the user's name in local storage
          setTimeout(() => {
            window.location.href = "/home"; // Redirect to login page after successful registration
          },1000)
        }
        else if(error){
          toast.error(error);
        }
        else if(!success){
          toast.error(message);
        }
        console.log("Response Data:", responseData);
  
      } catch (error) {
        console.log("Error:", error);
      }

    // Simulate login
    console.log("Logging in", loginInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginInfo.email}
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
              value={loginInfo.password}
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
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
