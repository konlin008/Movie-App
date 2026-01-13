import React, { useEffect, useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useLogin, useRegister } from '@/queries/auth.queries'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "@/context/AuthContext";



const Login = () => {
    const { login: setAuthUser } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const { mutate: login,
        isPending: isLoginPending,
        error: loginError,
        data: loginData, } = useLogin()
    const { mutate: register,
        isPending: isRegisterPending,
        error: registerError,
        data: registerData, } = useRegister()

    useEffect(() => {
        if (loginError) toast.error(loginError.response?.data?.message || "Login failed")
    }, [loginError])
    useEffect(() => {
        if (registerError) toast.error(registerError.response?.data?.message || "Register failed")
    }, [registerError])
    useEffect(() => {
        if (loginData) {
            toast.success(loginData.message)
            setAuthUser(loginData.userData);
            navigate('/home')
        }
    }, [loginData])
    useEffect(() => {
        if (registerData) {
            toast.success(registerData.message);
            setEmail("");
            setPassword("");
            setName("");
        }
    }, [registerData])

    const registerHandler = async () => {
        if (!email || !password || !name) {

            toast('All Fields Are Required')
            return
        }
        if (password.length < 6) {
            toast("Password length must be at least 6");
            return;
        }
        register({ email, password, name });
    }
    const logInHandler = async () => {
        if (!email || !password) {
            toast('All Fields Are Required')
            return
        }
        login({ email, password })
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center px-4' >
            <div className="flex w-full max-w-sm flex-col gap-6 ">
                <Tabs defaultValue="account" >
                    <TabsList>
                        <TabsTrigger value="account">Register</TabsTrigger>
                        <TabsTrigger value="password">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                    Create an account and get started.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-email">Email</Label>
                                    <Input id="tabs-email" placeholder="Pedro Duarte" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-password" >Password</Label>
                                    <Input id="tabs-password" placeholder="@peduarte" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-name">Name</Label>
                                    <Input id="tabs-name" placeholder="@peduarte" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={registerHandler} disabled={isRegisterPending} >
                                    {isRegisterPending ? <> <Loader className="h-4 w-4 animate-spin" /> Loading </> : 'Register'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Sign in to continue to your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="loginEmail">UserName</Label>
                                    <Input id="loginEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="loginPassWord">password</Label>
                                    <Input id="loginPassWord" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter >
                                <Button onClick={logInHandler} disabled={isLoginPending} >
                                    {isLoginPending ? <> <Loader className="h-4 w-4 animate-spin" /> Loading </> : 'Login'}

                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Login