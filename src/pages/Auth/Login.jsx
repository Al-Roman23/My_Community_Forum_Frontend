import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const getFriendlyErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-credential":
      return "The credentials are invalid. Please check your email and password.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "You have successfully logged in.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: getFriendlyErrorMessage(error.code),
        showConfirmButton: true,
      });
    }
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const googleUser = result.user;

      const newUser = {
        name: googleUser.displayName,
        email: googleUser.email,
        image: googleUser.photoURL,
      };

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      setUser({ ...googleUser });

      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "You have successfully logged in with Google",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: getFriendlyErrorMessage(error.code),
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
        <h1 className="text-2xl font-semibold text-center py-5">
          Login to Your Account!
        </h1>

        <form className="card-body" onSubmit={handleLogin}>
          <fieldset className="fieldset space-y-3">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="Email!"
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password!"
                required
              />
              <button
                onClick={handleTogglePasswordShow}
                className="btn btn-xs absolute top-2 right-7"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="link link-hover text-emerald-600"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5] mt-2 flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            <p className="text-center font-semibold pt-5">
              Don't Have An Account?{" "}
              <Link to="/register" className="text-secondary">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
