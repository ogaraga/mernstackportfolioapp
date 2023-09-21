import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";


//component Register
function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //asynchronouse fuction for fetch api response to request
  async function signup(event) {
    event.preventDefault();

    const formRegCon = document.querySelector("#register_form"),
      input = document.querySelectorAll("input:not([type= 'checkbox'])"),
      check = document.querySelector("#check"),
      spans = document.getElementById("spans"),
      label = document.getElementById("register_exception");

    // checked box 
    if (check.checked) {
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
        formRegCon.style.display = "none";
        input.forEach((item) => {
          item.style.border = "1px solid green";
          label.innerHTML = "All inputs are correct!";
          label.style.color = "green";
          return "registeration successful!";
        });
        return navigate("/login");
      } 
      
      else {
        input.forEach((item) => {
          item.style.border = "1px solid red";
          label.innerHTML = "Invalid input(s)! Pls try again.";
         
        });
      }
    }
    // accessing empty inputs and uchecked box
    else if (!check.checked){
      input.forEach(
      item => item.style.border = "1px solid red");
      formRegCon.style.display = "block";
      label.innerHTML = "Input field(s) can't be empty!";
      spans.innerHTML = "The box is unchecked yet!";
      spans.style.color = "red";     
    }
    else{
      return 'Registration failed due to glitch!';
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

        <button type="submit" id='btn'>
          Sign Up
        </button>
        <p>Already registered?</p>
        <a href="/login">Sign In</a>
        <i id="spans"></i>
        <i className={styles.register_exception} id="register_exception"></i>
      </form>
    </main>
  );
}
export default Register;
