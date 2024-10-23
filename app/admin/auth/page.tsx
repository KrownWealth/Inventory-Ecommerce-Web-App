import LoginView from '@/views/authentication/loginView'
import React from 'react'

const LoginAdmin = () => {
  return (
    <section className='w-full'>
      <div className="flex flex-col items-center justify-center m-auto">
         <h1>Admin Login</h1>
      <LoginView />
      </div>
     
    </section>
  )
}

export default LoginAdmin
