import react, {useState, useContext} from 'react'
import assests from '../assets/assets'
import {AuthContext} from '../../context/AuthContext'

export default function LoginPage(){
    const [currState, setCurrentState] = useState("Sign up");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const {login} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currState === "Sign up" && !isDataSubmitted) {
            setIsDataSubmitted(true);
            return;
        }
        login(currState === "Sign up" ? "signup" : "login", {fullName, email, password, bio});
    }

    return(

        <div className='min-h-screen bg-cover bg-center flex items-center justify-center
        gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

            <img src={assests.logo_big} className="w-[min(30vw, 250px)]" />
            <form onSubmit={handleSubmit} className="border-2  text-white border-gray-500 p-6 flex flex-col
            gap-6 rounded-lg shadow-lg">
                <h2 className='flex justify-between items-center'>
                    {currState}
                    {isDataSubmitted &&<img src={assests.arrow_icon} className='w-5 cursor-pointer'
                    onClick={() => setIsDataSubmitted(false)}/>}
                </h2>

                {currState === "Sign up" && !isDataSubmitted && (
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder="Full Name" className='p-2 rounded-md border border-gray-500
                    focus:outline-none bg-transparent' required />
                )}

                {!isDataSubmitted && (
                    <>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"
                            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
                            focus:ring-indigo-500 bg-transparent' placeholder='Email' required />

                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' 
                        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
                            focus:ring-indigo-500 bg-transparent' required />
                    </>
                )}

                 {currState === "Sign up" && isDataSubmitted && (
                    <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Bio'
                        className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
                        focus:ring-indigo-500 bg-transparent' required />
                    )}

                <button type="submit" className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
                    {currState === "Sign up" ? "Create Account" : "Login"}
                </button>

                <div className="flex flex-col gap-2">
                    {currState === "Sign up" ? (
                        <p className='text-sm text-gray-600'>Already have an account ? <span
                            onClick={() => {
                                setCurrentState("Login"); 
                                setIsDataSubmitted(false);
                            } 
                        }
                        className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
                    ) : (
                        <p className='text-sm text-gray-600'>Don't have an account ? <span
                        onClick={() => setCurrentState("Sign up")}
                        className='font-medium text-violet-500 cursor-pointer'>Sign up here</span></p>
                    )}
                </div>
            </form>
        </div>
    )
}