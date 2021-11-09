import { FaUser } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

export default function loginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState(""
    )

    const {login, error} = useContext(AuthContext)
    
    useEffect(()=> error && toast.error(error))

    const handleSubmit = (e) =>{
        e.preventDefault()
        login({email, password})
    }
    return (
        <Layout title="User Login">
            <div className={styles.auth}>
                <h1><FaUser/>User Login</h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value="login" className="btn-secondary"/>
                </form>
                <p>
                    Don't have an account? <Link href="/account/register"><a>Register</a></Link>
                </p>
            </div>
        </Layout>
    )
}
