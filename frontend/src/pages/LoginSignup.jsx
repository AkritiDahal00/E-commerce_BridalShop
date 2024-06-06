import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'
import ForgetPassword from '../Components/ForgetPassword/ForgetPassword'


const LoginSignup = () => {
    const [state,setState] = useState("Login");



    

    const [formData, setFromData] = useState({
        name: "",
        password:"",
        email:""
    });
    const [error, setError] = useState("");
    const changeHandler =(e)    =>{
        setFromData({...formData,[e.target.name]:e.target.value});
        setError("");
    }

    ////hmmmmmm this is to valid a email if there is no proper email address
    const isEmailValid = (email) => {
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        return emailPattern.test(email);
      };
    
    

    const login =async()=>{
        console.log("login function executed",formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            alert("User created successfully!");
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }

    }

    const signup =async()=>{

        if (!isEmailValid(formData.email)) {
            setError("Please enter a valid email address.");
            alert("please enter a valid email");
            return;
          }
        console.log("Signup function executed", formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){

            // sendverifymail(req.body.name, req.body.email, userdata_id);


            localStorage.setItem('auth-token',responseData.token);
            alert("User created successfully!");
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }
   

  

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
        {state ==="Forget Password" ?     
            <ForgetPassword />:(
                <>

            <h1>{state}</h1>
            <div className="loginsignup-fields">
                {state === "Sign Up"?<input type='text'name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' />:<></>}
                <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
                <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
                <p className="loginsignup-forgot-password forget_password" onClick={() => setState("Forget Password")}>
              Forget Password?
            </p>

          
                
            </div>
            <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

           
           
            {state==="Sign Up"? 
            <p className="loginsignup-login">
                Already have an account? 
                <span onClick={()=>{setState("Login")}}>
                    Login Here </span></p>:
                <p className="loginsignup-login">
                Create an Account? <span onClick={()=>{setState("Sign Up")}}>Click here!</span>
            </p>}

           
           
         
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id=''/>
                <p>By Continuing, i agree to the terms of use & Privacy policy</p>
            </div>
            </>
            )}
        </div>
      
    </div>
  )
}

export default LoginSignup
