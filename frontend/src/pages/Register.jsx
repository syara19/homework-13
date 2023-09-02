import { useState } from "react"
import { registerUser } from "../modules/fetch"
import {useNavigate} from "react-router-dom"



const Register = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return
        }
        try {
            await registerUser(
                e.target.name.value,
                e.target.email.value,
                password
            )
        
            navigate("/login")
        } catch (error) {
            throw new Error
        }
    }

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} >
                <label htmlFor="name">Name</label>
                <input required type="text" name="name" placeholder="Enter your name" />
                <label htmlFor="email">Email</label>
                <input required type="email" name="email" placeholder="Enter your email"  />
                <label htmlFor="password">Password</label>
                <input required type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input required type="password" name="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="submit" />
            </form>
        </>
    )
}

export default Register