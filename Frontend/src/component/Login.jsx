import styles from './Login.module.css';
import {useState} from 'react';
import {useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //login submit/click
  async function loginHandle(event){
    event.preventDefault();
      const formLogCon = document.querySelector("#login_form"),
      input = document.querySelectorAll("input"),
      label = document.getElementById('login_exception');
      const url = "http://localhost:5500/login";
      const options = {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
      };
      const response = await fetch(url, options);
      if(response.ok){
        const ResData = response.json();
        console.log(ResData);
        formLogCon.style.display = 'none';
        input.forEach(item=>item.style.border = '1px solid green');
        label.innerHTML = "All inputs are correct! pls login."
        label.style.color = 'green';
        return navigate('/portfolio');  
      }
      else{
        input.forEach(item=>item.style.border = '1px solid red');
        label.innerHTML = "Wrong input(s)! Pls try again or create an account.";
        return navigate('/login');
      }    

  }

  return (
    <main className={styles.login_form} id='login_form'>
 <h1>Access login</h1>
      <form action="" onSubmit={loginHandle}>
        <label htmlFor="email">Email<span>*</span></label>
        <input type="email" name="email" id="email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="password">password<span>*</span></label>
        <input type="password" name="password" id="pass-reg" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <i className={styles.login_exception} id='login_exception'></i>
      </form>
    </main>
  )
}

export default Login;