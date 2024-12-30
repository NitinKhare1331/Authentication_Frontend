import { Route, Routes } from "react-router-dom"
import { SignupPage } from "../../components/SignupPage"
import { SigninPage } from "../../components/SigninPage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/user/signup' element={<SignupPage />}/>
            <Route path='/user/signin' element={<SigninPage />}/>
            <Route path='/home' element={<div>Home</div>}/>
        </Routes>
    )
}