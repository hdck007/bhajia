import Wrapper from "@/components/wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function IndexPage() {

  const data = await getServerSession(authOptions)

  console.log(data)

  return (
   <Wrapper />
  )
}
