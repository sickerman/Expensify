import React from 'react'
import "@/styles/global.css"

const AuthRootLayout = ({children}) => {
  return (
  <html lang="en">
    <body className='h-screen w-screen flex items-center justify-center bg-gray-50'>
      {children}
    </body>
  </html>
  )
}

export default AuthRootLayout;