import Wrapper from "@/components/wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInWrapper from "@/components/signin-wrapper";

export default async function IndexPage() {

  const data = await getServerSession(authOptions)

  if (!data) {
    return (
      <SignInWrapper />
    )
  }

  return (
   <Wrapper />
  )
}
