

import { useState, useEffect } from "react";
import toast from "react-hot-toast";


function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
   setLoggedInUser(localStorage.getItem('loggedInUser'))}, []);


    const handleLogout =(e) => {
      e.preventDefault();
      localStorage.removeItem('token'); // Remove the token from local storage
      localStorage.removeItem('loggedInUser'); // Remove the user's name from local storage
      toast.success("Logged out successfully");
     setTimeout(() => {
       window.location.href = "/login"; // Redirect to login page after logout
     }, 1000);
    }
  
    const fetchProduct = async () => {
      console.log(localStorage.getItem("token"));
      try {
        const url = "https://authentication-api3.vercel.app/products";
        const headers = {
          headers: {
            Authorization: localStorage.getItem("token")
          }
          // Get the token from local storage
        };
        const response = await fetch(url, headers);

        const data = await response.json();

        setProducts(data);
       
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  useEffect(() => {
    fetchProduct();
  } , []);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center my-4">Welcome, {loggedInUser}!</h1>
        <h2 className="text-xl text-center mb-4">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {products && products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-gray-600">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
     
      <button
            onClick={handleLogout}
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Logout
          </button>
    </div>
  )
}


export default Home
