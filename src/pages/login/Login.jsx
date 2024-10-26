import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const Login = () => {
  const captchaRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn, googleSignIn } = useContext(AuthContext);

  const handleValidate = () => {
    const value = captchaRef.current.value;

    if (validateCaptcha(value)) {
      setDisabled(false);
    } else {
      console.log("Captcha is invalid");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: "You Are Successfully Logged In!",
          text: "",
          imageUrl: `${user.photoURL}`,
          imageWidth: '10vw',  
          imageHeight: 'auto',  
          imageAlt: "Custom image",
          imageClass: 'rounded-full'  
        });
        console.log(user);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };
  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      console.log("Google user:", user);
      Swal.fire({
        title: "You Are Successfully Logged In!",
        text: "",
        imageUrl: `${user.photoURL}`,
        imageWidth: '10vw',  
        imageHeight: 'auto',  
        imageAlt: "Custom image",
        imageClass: 'rounded-full'  
      });
      fetch("http://localhost:5000/allusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User added to database:", data);
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.error("Error signing in with Google:", error);
        });
    });
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row my-10 md:mx-20">
      <div
        className="lg:w-2/3 bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/capsule.svg')",
        }}
      >
        <div className="bg-black bg-opacity-60 p-2 md:p-10 rounded-lg text-white md:mx-0 mx-2">
          <h2 className="md:text-4xl text-xl font-bold mb-4 text-justify">
            Your Health, Our Priority
          </h2>
          <p className="mb-6 text-justify">
            At Mediore, we are dedicated to providing you with high-quality
            medicines and health products to ensure your well-being. Our expert
            pharmacists are here to assist you with any questions you may have
            regarding your medications and overall health.
          </p>
          <p className="mb-6 text-justify">
            Enjoy a seamless shopping experience with our easy-to-use online
            platform. Get your medicines delivered right to your doorstep,
            ensuring convenience and reliability.
          </p>
          <p className="text-justify">
            Trust us to be your partner in health. Your safety and satisfaction
            are our top priorities.
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 p-2 md:p-10 flex flex-col justify-center ">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full mb-4 flex items-center justify-center"
          >
            <img
              src="/google-logo.svg"
              alt="Google Logo"
              className="h-5 w-5 mr-2"
            />
            Continue with Google
          </button>

          <div className="divider">OR</div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Your Email address
              </label>
              <input
                type="email"
                id="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="captcha"
              >
                Captcha
              </label>
              <LoadCanvasTemplate />
              <input
                type="text"
                ref={captchaRef}
                id="captcha"
                className="input input-bordered w-full mt-2"
                placeholder="Enter the above text"
              />
            </div>

            <button
              onClick={handleValidate}
              className="btn bg-[#28A745] text-white hover:bg-green-700 w-full mb-4"
            >
              Validate Captcha
            </button>

            <button
              type="submit"
              disabled={disabled}
              className="btn bg-[#28A745] text-white hover:bg-green-700 w-full mb-4"
            >
              <LockClosedIcon className="h-5 w-5 inline-block mr-2" />
              Log in
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm">
              Don&apos;t have an account?
              <a
                href="/register"
                className="text-[#28A745] font-medium hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
