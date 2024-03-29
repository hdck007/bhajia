"use client"

import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { ReactMultiEmail } from "react-multi-email"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { ToastProvider } from "./ui/toast"
import { Toaster } from "./ui/toaster"
import { useToast } from "./ui/use-toast"
import { signOut } from "next-auth/react"

export default function Wrapper() {
  const [image, setImage] = useState("")
  const [email, setEmail] = useState("")
  const [bccs, setBccs] = useState<string[]>([])
  const [ccs, setCcs] = useState<string[]>([])
  const [name, setName] = useState("")
  const [years, setYears] = useState("")
  const [wishType, setWishType] = useState("birthday")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!image || !email || !name || (wishType === "anniversary" && !years)) {
      toast({
        title: "Error!",
        description: "Please fill all the fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    toast({
      title: "Sending...",
      description: "Sending email...",
    })
    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bcc: bccs.join(","),
        cc: ccs.join(","),
        email: email,
        image: image.split("d/")[1].split("/view")[0],
        name: name,
        years: years,
        isBirthday: wishType === "birthday",
      }),
    }).then((res) => {
      if (res.ok) {
        setIsLoading(false)
        toast({
          title: "Success!",
          description: "Email sent successfully.",
        })
      } else {
        setIsLoading(false)
        toast({
          title: "Error!",
          description:
            "Something went wrong. Please check your mail box and try after 5 mins",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <ToastProvider>
      <div className="mx-auto my-8 flex max-w-[1080px] flex-col gap-8">
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image"
        />
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Example: Amitabh Bachchan"
        />
        <Select value={wishType} onValueChange={setWishType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="work">Work Anniversary</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {wishType === "work" && (
          <Input
            type="text"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="Example: 5 years"
          />
        )}
        <ReactMultiEmail
          placeholder="BCC   "
          emails={bccs}
          onChange={(_emails: string[]) => {
            setBccs(_emails)
          }}
          getLabel={(email, index, removeEmail) => {
            return (
              <div className="ml-2" data-tag key={index}>
                <div data-tag-item>{email}</div>
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            )
          }}
        />
        <ReactMultiEmail
          placeholder="CC  "
          emails={ccs}
          onChange={(_emails: string[]) => {
            setCcs(_emails)
          }}
          getLabel={(email, index, removeEmail) => {
            return (
              <div className="ml-2" data-tag key={index}>
                <div data-tag-item>{email}</div>
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            )
          }}
        />
        <Button
          className="flex items-center gap-4"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Submit
          {isLoading && <Loader2Icon />}
        </Button>
        <Button
          onClick={() => {
            signOut()
          }}
        >Sign Out</Button>
        <Toaster />
      </div>
    </ToastProvider>
  )
}
