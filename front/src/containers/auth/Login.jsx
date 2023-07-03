import "./lgoin.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Cookies from "universal-cookie";
import photo from "../../assets/images/photo login.png";
import logo from "../../assets/images/logo.png";
import { GeneralContext } from "../../Hooks/context/GeneralContext";
//import LoginImage from '../../assets/images/login.jpg';

const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { setUser } = useContext(GeneralContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const onchange = (e) => {
    // console.log(e.target.name);
    if (e.target.name === "email") {
      if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setErrors((preverror) => ({
          ...preverror,
          email: "Email must be a valide email!!",
        }));
        // console.log('password must be at least 8 caracteres!!')
      } else {
        setErrors((preverror) => ({ ...preverror, email: null }));
      }
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      //console.log(e.target.value.length)
      if (e.target.value.length < 4) {
        setErrors((preverror) => ({
          ...preverror,
          password: "password must be at least 8 caracteres!!",
        }));
        console.log("password must be at least 8 caracteres!!");
      } else {
        setErrors((preverror) => ({ ...preverror, password: null }));
      }
      setPassword(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (errors.email || errors.password || email === "" || password === "") {
      return swal("Error!", " Vérifier votre Connexion ", "error");
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        if (
          result.data.active?.toString() === "true" ||
          result.data.role === "admin"
        ) {
          swal("Success!", result.message, "success");
          const jsconValue = JSON.stringify(result.data);
          cookies.set("user", jsconValue);
          cookies.set("jwt", result.token);
          setUser(result.data);
        } else {
          swal("Error!", "Sorry! yourn't permitted to access", "error");
        }
        return navigate("/");
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.log(error);
      return swal(
        "Error!",
        "votre mot de passe ou votre email est inccorect ",
        "error"
      );
    }
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center bg">
      <form className="w-4/5 " onSubmit={submit}>
        <div className="w-full flex flex-col items-center py-8 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {/* <div className="absolute top-0 left-1/2 h-2 w-32 rounded-b-md bg-blue-950"></div> */}
        <div className="flex flex-col md:flex-row gap-10 border bg-white rounded-md py-16 px-8 ">
          {/*<div className="absolute -mt-10 left-1/2 h-2 w-36 rounded-b-md bg-blue-950"></div>*/}
          <img
            src={photo}
            alt="login"
            className="w-2/3 sm:w-1/2 h-auto rounded-md mx-auto"
          />
          {/* <form > */}
          <div className="w-full flex flex-col gap-4 ">
            <div className="flex flex-row justify-center">
              <img
                src="https://www.khallasli.com/assets/images/LOGO%20KHALLASLI-08.png"
                alt="connexion"
                className="' px-1 -mt-4 py-2 h-20"
              />
              <h1 className="text-3xl font-bold text-center mb-4 text-gray-400">
                Connexion
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              {/*<label htmlFor="emailID" className="text-2xl font-medium">
                Nom d'utilisateur
              </label>*/}
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => onchange(e)}
                id="emailID"
                placeholder="Tapez votre Nom..."
                className={`border px-2 py-4 focus:outline-none ${
                  errors.email
                    ? "border-red-600 bg-red-50 text-red-600"
                    : "border-gray-500  bg-gray-100"
                } `}
              />
              <span className="text-sm font-medium text-red-600 -mt-2">
                {errors.email}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {/*<label htmlFor="passID" className="text-2xl font-medium">
                Mot de passe
              </label>*/}
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => onchange(e)}
                id="passID"
                placeholder="********"
                className={`border px-2 py-4 focus:outline-none ${
                  errors.password
                    ? "border-red-600 bg-red-50 text-red-600"
                    : "border-gray-500  bg-gray-100"
                } `}
              />
              <span className="text-sm font-medium text-red-600 -mt-2">
                {errors.password}
              </span>
            </div>
            <div className=" flex flex-col gap-3">
              <button
                type="submit"
                className="border border-gray-500 bgb bg-blue-950 px-2 py-4 text-white text-lg font-bold"
              >
                Connexion
              </button>

              {/*<button
                type="button"
                class=" text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-8 py-2 text-center mt-4 "
              >
                Log In
              </button>*/}
            </div>
            <div className="flex flex-col items-center ">
              <h2 className="text-base italic text-zinc-400 font-bold">
                Vous n'avez pas de compte?
              </h2>
              <Link to="/Register">
                <h2 className="cursor-pointer text-base italic text-sky-950 font-bold">
                  Créez votre compte KHALLASLI gratuitement
                </h2>
              </Link>
            </div>
          </div>
          {/* </form> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
