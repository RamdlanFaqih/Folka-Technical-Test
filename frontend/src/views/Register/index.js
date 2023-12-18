import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../component/FormInput/FormInput";
import { Button } from "../../component/Button/Button";
export const Register = () => {
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
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

    if (data.password !== data.confirmPassword) {
      setErrorMessage("Password dan Konfirmasi Password harus sama");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
      return;
    }
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/register`, userData)
      .then((response) => {
        console.log(response);

        setSuccessMessage("Daftar Berhasil");
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setSuccessMessage("");
        }, 2000);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage("Daftar Gagal");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setErrorMessage("");
        }, 3000);
      });
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[568px] shadow-lg border border-sm rounded-lg px-16 py-10">
        <h1 className="font-bold text-secondary text-2xl mb-5">
          Daftar Sekarang
        </h1>
        <form onSubmit={handleSubmit} className="gap-5 py-5">
          <FormInput
            type="text"
            placeholder="Nama Depan"
            name="first_name"
            value={data.first_name}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="Nama Belakang"
            name="last_name"
            value={data.last_name}
            onChange={handleChange}
          />
          <FormInput
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            value={data.phone_number}
            onChange={handleChange}
          />
          <FormInput
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <FormInput 
            type="password" 
            placeholder="Konfirmasi Password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange} />
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
            Belum punya akun? Daftar Sekarang
          </h3>
        </div>
      </div>
    </div>
  );
};
