import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";


//component Register
function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //click to login for registered users
    const handleSign = ()=>{
    return navigate('/login');
   }
 
  //asynchronouse fuction for fetch api response to request
  async function signup(event) {
    event.preventDefault();

    const input = document.querySelectorAll("input:not([type= 'checkbox'])"),
      check = document.querySelector("#check"),
      spans = document.getElementById("spans"),
      label = document.getElementById("register_exception");

    // checked box 
    if (check.checked &&
      username !== "" &&
      isNaN(username) &&
      password.length >= 5 &&
      email !== "") {
      spans.innerHTML = "";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      };

      const url = "http://localhost:5500/";
      const response = await fetch(url, options);

      //good response will give successful registeration
      if (response.ok) {
        const ResData = response.json();
        console.log(ResData);
      input.forEach((item) => (item.style.border = "1px solid green"));
      label.innerHTML = "All inputs are correct!";
      label.style.color = "green";
      spans.innerHTML = "";
      setTimeout(() => {
        spans.innerHTML = "pls wait, creating an account...";
        spans.style.color = "blue";
        label.innerHTML = "";
      }, 3000);
      setTimeout(() => {
        spans.innerHTML = "Account created!";
        spans.style.color = "green";
      }, 5000);
      setTimeout(() => {
        return navigate("/login");
      }, 7000);
      } 
      
      else {
         label.innerHTML = "Backend error has occurred!";
          return navigate('/');
         }
      }
      // accessing empty inputs and unchecked box
    else if (
      !check.checked &&
      (username !== "" ||
        password !== "" ||
        password.length >= 5 ||
        email !== "")
    ) {
      input.forEach((item) => (item.style.border = "1px solid red"));
      spans.innerHTML = "The box is unchecked yet!";
      spans.style.color = 'red';
      return navigate("/");
    } else if (
      check.checked &&
      (username == "" ||
        password.length < 5 ||
        email == "")
    ) {
      spans.innerHTML = "Input field(s) can't be empty!";
      spans.style.color = "red";
      label.innerHTML = "Password must be greater than 4 characters!";
      return navigate('/')
    } else {
      input.forEach((item) => (item.style.border = "1px solid red"));
      label.innerHTML = "Invalid input(s)! Pls try again.";
      spans.innerHTML = "The box is unchecked yet!";
      spans.style.color = "red";
      return navigate("/");
    }
  
  }

  return (
    <main className={styles.register_form} id="register_form">
      <h1>Access Registration form</h1>
      <form id={styles.submit} onSubmit={signup}>
        <label htmlFor="name">
          Name<span>*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="email">
          Email<span>*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          password<span>*</span>
        </label>
        <input
          type="password"
          name="password"
          id="pass-reg"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.box}>
          <input type="checkbox" id="check" />
          <p>
            By checking this box, you have consented to abide by our Ts & Cs
            <span>*</span>
          </p>
        </div>

        <button type="submit" id="btn">
          Sign Up
        </button>
        <p>Already registered?</p>
        <a id="btn" onClick={handleSign}>Sign In</a>
        <i id="spans"></i>
        <i className={styles.register_exception} id="register_exception"></i>
      </form>
    </main>
  );
}

export default Register;

