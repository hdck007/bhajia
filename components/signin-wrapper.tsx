"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

const SignInWrapper = () => {
    return (
        <Button onClick={() => signIn("/google")}>Sign In</Button>
    )
}

export default SignInWrapper;