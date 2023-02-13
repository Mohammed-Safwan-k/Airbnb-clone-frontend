import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl mb-4 text-center">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@gmail.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account? <Link className="underline text-black" to="/register"> Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
