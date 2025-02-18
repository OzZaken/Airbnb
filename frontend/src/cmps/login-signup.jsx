import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './img-uploader'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [users, setUsers] = useState([])
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        async function getUsers() {
            const users = await userService.getUsers()
            setUsers(users)
        }
        getUsers()
    }, [])

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    const handleChange = ev => {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    const onLogin = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    const onSignup = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        clearState()
    }

    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }

    const onUploaded = (imgUrl) => {
        setCredentials({ ...credentials, imgUrl })
    }

    return <section className="login-page">
        <p>
            <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
        </p>

        {!isSignup && <form className="login-form" onSubmit={onLogin}>

            <select name="username" value={credentials.username} onChange={handleChange}>

                <option value="">Select User</option>

                {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
            </select>

            <button>Login!</button>
        </form>}

        <div className="signup-section">
            {isSignup && <form className="signup-form" onSubmit={onSignup}>
                <input type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                />
                <input type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <ImgUploader onUploaded={onUploaded} />
                <button >Signup!</button>
            </form>}
        </div>
    </section>
}