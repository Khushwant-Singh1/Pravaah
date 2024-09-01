import React from 'react'
import './Login.css';

const Login = () => {
  return (
    // <div className='w-full h-screen justify-center flex items-center'>
      

    // </div>
    <div className='login-container'>

    
    <section className='login-sec'>
            <form>
                <h1>Login</h1>
                <div class="inputbox">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" required />
                    <label for="">Email</label>
                </div>
                <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" required />
                    <label for="">Password</label>
                </div>
                <div class="forget">
                    <label for=""><input type="checkbox" />Remember Me</label>
                  <a href="#">Forget Password</a>
                </div>
                <button>Log in</button>
                <div class="register">
                    <p>Don't have a account <a href="#">Register</a></p>
                </div>
            </form>
        </section>
      </div>
  )
}

export default Login