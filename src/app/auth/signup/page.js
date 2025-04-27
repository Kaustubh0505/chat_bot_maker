'use client'
import { signup } from '@/services/auth';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

 const Signup = () => {
  const [form,setForm] = useState({
    email:'',
    password:''
  });
  function chandelchnage(e){
    const fieldName = e.target.name;
    const fieldValue = e.target.value
    setForm({
      ...form,[fieldName]:fieldValue,
    })
  }
   async function handelsubmit(e){
    try{
      e.preventDefault();
      let response = await signup ({email: form.email, password : form.password})
      alert(response.message)
  }
  catch(error){
    alert (error);
  }
}
  return (
    <div>
      <h1>Sign Up Pages!!</h1>
      <form onChange={chandelchnage} onSubmit={handelsubmit}>
        <input type="email" name='email' placeholder='enter email' />
        <input type="password" name="password" id=""  placeholder='enter password'/>
        <button type='submit'>SignUp</button>
      </form>
    </div>
  )
}
export default Signup;
