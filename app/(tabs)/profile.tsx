import AuthDisplay from '@/components/Auth'
import LoginDisplay from '@/components/Login'
import React, { useState } from 'react'

export default function Profilecreen() {
     const [isAuth, setIsAuth] = useState<boolean>(false)

     if (isAuth) return <AuthDisplay setIsAuth={setIsAuth} />

     return <LoginDisplay setIsAuth={setIsAuth} />

}
