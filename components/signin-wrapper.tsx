"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

const SignInWrapper = () => {
    return (
        <Button onClick={() => signIn("/google")}>Signin</Button>
    )
}

export default SignInWrapper;