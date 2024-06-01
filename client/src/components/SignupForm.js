import React, { useState, useEffect } from 'react';
import { FaUser, FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretkey, setSecretKey] = useState("");
  const [profile_Picture, setProfilePicture] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false); // State for terms checkbox
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const Auth = localStorage.getItem('user');
    if (Auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const Collectdata = async () => {

    if (secretkey !== "yashwant") {
      alert("Invalid user");
      return;
    }
    if (!termsChecked) {
      alert("Please accept the terms and conditions.");
      return;
    }


    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profile_picture', profile_Picture);

    try {
      let result = await fetch('http://localhost:3001/signup', {
        method: 'post',
        body: formData,
      });
      result = await result.json();
      if (result.auth) {
        alert("SignUp successfully. Welcome to this Website");
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/posts');
      } else {
        console.error("Server returned an error:", result.statusText);
        alert("Invalid User ");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className='Container-auth-box'>
        <div className='Register signup-box-1 '>
          <h2>Create Account</h2>
          <a className="login-icon" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={22} style={{ marginRight: '10px' }} />
          </a>
          <a className="login-icon" target="_blank" rel="noopener noreferrer">
            <FaGoogle size={22} style={{ marginRight: '10px' }} />
          </a>
          <a className="login-icon" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={22} style={{ marginRight: '10px' }} />
          </a>
          <br /><br />
          <div>
            <input
              className='inputBox'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter Name (optional)'
              required
            /><br /><br />
            <input
              className='inputBox'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
              required
            /><br /><br />
            <input
              className='inputBox'
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
              required
            />
            <button onClick={togglePasswordVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button><br /><br />
           
            <input
              className='inputBox'
              type="text"
              value={secretkey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder='Secret key'
            />
            <br /><br />
            <input
              className='inputBox'
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              accept="image/*"
            />
            <br /><br />
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleTermsChange}
            />
            <label htmlFor="terms">I agree to the <a href="/terms">Terms and Conditions</a></label>
            <br /><br />
            <button onClick={Collectdata} className='button-auth-signup ' type="button">Signup</button>
          </div>
        </div>
        <div className='Register  login-box-1'>
          <a className="icon" target="_blank" rel="noopener noreferrer">
            <FaUser size={22} style={{ marginRight: '10px' }} />
          </a><br /><br />
          <h2>Welcome Back!</h2>
          <br /> <br />
          <p className='p-tag-register'>To keep connected with us please <br /> login with your personal info</p>
          <NavLink to="/Login" className="signup-button" ><button>Login</button></NavLink>
        </div>
      </div>
      <style>
        {
          `
          .Container-auth-box {
            display: flex;
            margin-bottom:50px;
            justify-content: center;
          }
          .Register {
            padding: 100px;
          }
          .Register h2 {
            font-size: 24px;
            margin-bottom: 12px ;
          }
          .login-box-1 {
            color: white;
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          .signup-box-1 {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            border: 1px solid #ccc;
          }
          .p-tag-register {
            font-size: 16px;
            margin-bottom: 20px;
          }
          .inputBox {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .icon {
            color: white;
          }
          .button-auth-signup {
            width: 100%;
            padding: 10px;
            color: #fff;
            border: none;
            border-radius: 5px;
            background: linear-gradient(45deg, #00ff00, #008000);
            cursor: pointer;
          }
          .signup-button button {
            padding: 10px 40px;
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border-radius: 15px;
          }
          .button-auth-signup:hover {
            background: linear-gradient(45deg, #5eff00, #00cc00);
          }
          .signup-button button:hover {
            background: linear-gradient(To top, #4CA0, #FFEB);
            cursor: pointer;
          }
          `
        }
      </style>
    </>
  );
}

export default Signup;
