import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../hooks/useSignin";
import { LuTriangleAlert } from "react-icons/lu";
import { BiLoader } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

export const SigninPage = () => {
    const navigate = useNavigate();

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    });

    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, error, signinMutation } = useSignin();

    async function handleFormSubmit(e) {
        e.preventDefault();
        if(!signinForm.email || !signinForm.password) {
            console.log('All fields are required!');
            setValidationError({ message: 'All fields are required!' });
            return;
        }

        setValidationError(null);

        await signinMutation({
            email: signinForm.email,
            password: signinForm.password,
        })
    };

    useEffect(() => {
        if(isSuccess){
            setTimeout(() => {
                navigate('/home');
            }, 3000)
        }
    }, [isSuccess, navigate]);

    return (
        <div className="flex h-[100vh] justify-center items-center">
            <div className="flex flex-col h-[100vh] justify-center items-center">

                {validationError && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <LuTriangleAlert className="size-5"/>
                        <p>{validationError.message}</p>
                    </div>
                )}
                {error && (
                    <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <LuTriangleAlert className="size-5"/>
                        <p>{error.message}</p>
                    </div>
                )}
                
                {isSuccess && (
                    <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
                        <FaCheck className="size-5"/>
                        <p>
                            Successfully signed up. You will be redirected to the login page in a few seconds. 
                            <BiLoader className="animate-spin ml-2"/>
                        </p>
                    </div>
                )}
                <h1 className="font-bold text-lg mb-5">Sign In</h1>
                <form 
                    className="flex flex-col border p-20 bg-blue-200 rounded-lg"
                    onSubmit={handleFormSubmit}
                >
                    <label>Email</label>
                    <input 
                        className="p-2 mb-4 rounded" 
                        onChange={(e) => setSigninForm({...signinForm, email: e.target.value})}
                        value={signinForm.email}
                        type="email" 
                        placeholder="Email"
                        required
                        disabled={isPending}
                    />
                    <label>Password</label>
                    <input 
                        className="p-2 mb-4 rounded" 
                        onChange={(e) => setSigninForm({...signinForm, password: e.target.value})}
                        value={signinForm.password}
                        type="password" 
                        placeholder="password"
                        required
                        disabled={isPending}
                    />
                    <button 
                        type="submit" 
                        className="flex justify-center border mt-4 rounded border-black hover:bg-blue-300 transition"
                    >
                        Sign In
                    </button>

                    <p className="text-sm text-muted-foreground mt-4">
                    Don't have an account ? {' '}
                    <span 
                        className="text-sky-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/user/signup')}
                    >
                        Sign Up
                    </span>
                </p>
                </form>
            </div>
        </div>
    );
};