import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormInput } from "../../component/FormInput/FormInput";
import { Button } from "../../component/Button/Button";

export const Login = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, userData)
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.generateToken)
        );
        setSuccessMessage("Login berhasil!");
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 2000);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Login gagal. Coba lagi.");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setErrorMessage("");
        }, 3000);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[568px] shadow-lg border border-sm rounded-lg px-16 py-10">
        <h1 className="font-bold text-secondary text-2xl mb-5">Masuk</h1>
        <form onSubmit={handleSubmit} className="py-5">
          <FormInput
            type="text"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <FormInput
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <h3 className="text-sm text-secondary font-semibold text-end pb-5">
            Lupa Password
          </h3>
          <Button type="submit" text="Masuk" />
          {isError && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          {isSuccess && (
            <div className="text-green-500 text-center">{successMessage}</div>
          )}
        </form>
        <div className="border-t-2 text-center">
          <h3 className="text-base text-dark font-semibold py-10">
            Belum punya akun?{" "}
            <Link to="/register" className="text-primary">
              Daftar Sekarang
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
