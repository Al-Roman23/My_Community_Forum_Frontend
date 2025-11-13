import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, setUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters and include both uppercase and lowercase letters.",
        showConfirmButton: true,
      });
    }

    try {
      const userCredential = await createUser(email, password);
      const createdUser = userCredential.user;
      await updateUserProfile(name, photo);
      setUser({ ...createdUser, displayName: name, photoURL: photo });

      const newUser = { name, email, image: photo };
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been registered successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const googleUser = result.user;
        const newUser = {
          name: googleUser.displayName,
          email: googleUser.email,
          image: googleUser.photoURL,
        };

        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        setUser({ ...googleUser });

        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "You have successfully logged in with Google",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
          showConfirmButton: true,
        })
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-300">
      <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
        <h1 className="text-2xl font-semibold text-center py-5">
          Register Your Account!
        </h1>
        <form className="card-body" onSubmit={handleRegister}>
          <fieldset className="fieldset space-y-2">
            <label className="label">Your Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Enter your name"
              required
            />

            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="url"
              className="input"
              placeholder="Enter your photo URL"
              required
            />

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Enter your email"
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <button
                onClick={handleTogglePasswordShow}
                className="btn btn-xs absolute top-2 right-7"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5] mt-2"
            >
              Continue with Google
            </button>

            <p className="text-center font-semibold pt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
