import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { useEffect, useState } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { BiLoader } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

export const SignupPage = () => {
    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        username: ''
    });

    const [ validationError, setValidationError ] = useState(null);

    const { isPending, isSuccess, error, signupMutation } = useSignup();

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        if(!signupForm.email || !signupForm.password ||!signupForm.username) {
            console.log('All fields are required!');
            setValidationError({ message: 'All fields are required!' });
            return;
        }

        setValidationError(null);

        await signupMutation({
            email: signupForm.email,
            password: signupForm.password,
            username: signupForm.username
        })
    };

    useEffect(()=> {
        if(isSuccess) {
            setTimeout(() => {
                navigate('/user/signin')
            }, 3000);
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

                <h1 className="font-bold text-lg mb-5">Sign Up</h1>
                <form 
                    className="flex flex-col border p-20 bg-blue-200 rounded-lg"
                    onSubmit={handleFormSubmit}
                >
                    <label>Email</label>
                    <input 
                        className="p-2 mb-4 rounded" 
                        onChange={(e) => setSignupForm({ ...signupForm, email:e.target.value })}
                        value={signupForm.email}
                        type="email" 
                        placeholder="Email"
                        required
                        disabled={isPending}
                    />
                    <label>Password</label>
                    <input 
                        className="p-2 mb-4 rounded"
                        onChange={(e) => setSignupForm({ ...signupForm, password:e.target.value })}
                        value={signupForm.password} 
                        type="password" 
                        placeholder="password"
                        required
                        disabled={isPending}
                    />
                    <label>Username</label>
                    <input 
                        className="p-2 mb-4 rounded" 
                        onChange={(e) => setSignupForm({ ...signupForm, username:e.target.value })}
                        value={signupForm.username}
                        type="text" 
                        placeholder="username"
                        required
                        disabled={isPending}
                    />
                    <button 
                        type="submit" 
                        className="flex justify-center border mt-4 rounded border-black hover:bg-blue-300 transition"
                    >
                        Sign Up
                    </button>

                    <p className="text-sm text-muted-foreground mt-4">
                    Already have an account ? {' '}
                    <span 
                        className="text-sky-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/user/signin')}
                    >
                        Sign In
                    </span>
                </p>
                </form>
            </div>
        </div>
    );
};
