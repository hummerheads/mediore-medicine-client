import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const captchaRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleValidate = () => {
    const value = captchaRef.current.value;

    if (validateCaptcha(value)) {
      setDisabled(false);
    } else {
      console.log("Captcha is invalid");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log("User profile updated");
            fetch("https://mediore-medicine-server.vercel.app/allusers", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                email: email,
                photoURL: photoURL,
              }),
            })
            .then(response => response.json())
            .then(data => {
              console.log("User added to database:", data);
              navigate("/");
            })
            .catch(error => console.error("Error adding user:", error));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google user:", user);
        fetch("https://mediore-medicine-server.vercel.app/allusers", {
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
        .then(response => response.json())
        .then(data => {
          console.log("User added to database:", data);
          navigate("/");
        })
        .catch(error => console.error("Error adding user:", error));
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);

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
            Join Us in Your Health Journey
          </h2>
          <p className="mb-6 text-justify">
            At Mediore, we prioritize your health and well-being. By joining our
            community, you gain access to high-quality medicines and expert
            advice from our pharmacists.
          </p>
          <p className="text-justify">
            Register now to enjoy a seamless shopping experience and get your
            medicines delivered right to your doorstep.
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 p-2 md:p-10 flex flex-col justify-center ">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

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

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="photoURL"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoURL"
                className="input input-bordered w-full"
                placeholder="Enter your photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>

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
              Register
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm">
              Already have an account?
              <a
                href="/login"
                className="text-[#28A745] font-medium hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
