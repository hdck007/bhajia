"use client"
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ReactMultiEmail } from "react-multi-email";

export default function Wrapper() {

    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [bccs, setBccs] = useState<string[]>([])
    const [ccs, setCcs] = useState<string[]>([])
    const [focused, setFocused] = useState(false);
    const [name, setName] = useState("");
    const [years, setYears] = useState("");

    const handleSubmit = async () => {

        // check if any feild is empty

        if (!image || !email || !name || !years) {
            return
        }

      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bcc: bccs.join(','),
          cc: ccs.join(','),
          email: email,
          image: image,
          name: name,
          years: years
        })
      })
    }


  return (
    <>
    <button onClick={() => signIn('/google')} >Signin</button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <input type="text" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Years" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <ReactMultiEmail
        placeholder='Bcc'
        emails={bccs}
        onChange={(_emails: string[]) => {
          setBccs(_emails);
        }}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
       <br />
    <br />
    <br />
    <br />
    <br />
      <ReactMultiEmail
        placeholder='cc'
        emails={ccs}
        onChange={(_emails: string[]) => {
          setCcs(_emails);
        }}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />

      <br />
      <br />
      <br />
      <button onClick={handleSubmit} >
        Submit
      </button>
<br />
<br />
<br />
<br />
<br />
    </>
  )
}
