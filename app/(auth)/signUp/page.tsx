"use client"
import { useState } from "react";
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import Link from "next/link";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // const [loading, setLoading] = useState(true)

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: React.FormEvent) =>{

    e.preventDefault()
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      setErrorMessage('Passwords do not match')
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      console.log(res?.user.uid)
       const token = res?.user?.uid
      if(token){
         setEmail('')
      setPassword('')
      setConfirmPassword('')
      router.push('/logIn')
      }else{
        return
      }


    } catch (error) {
      console.error('Error signing up:', error)
      // setErrorMessage(errorMessage)
    }
  }

  // console.log(errorMessage)

    return (
      <div className="flex flex-col justify-center h-auto w-full items-center m-auto my-32">
        <div className="flex gap-2 justify-center items-center mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5235 34.225C8.96683 36.6666 12.8935 36.6666 20.7502 36.6666C28.6068 36.6666 32.5352 36.6666 34.9752 34.225C37.4168 31.7866 37.4168 27.8566 37.4168 20C37.4168 12.1433 37.4168 8.21498 34.9752 5.77331C32.5368 3.33331 28.6068 3.33331 20.7502 3.33331C12.8935 3.33331 8.96516 3.33331 6.5235 5.77331C4.0835 8.21665 4.0835 12.1433 4.0835 20C4.0835 27.8566 4.0835 31.785 6.5235 34.225ZM16.5835 14.5833C15.5122 14.5833 14.4649 14.901 13.5742 15.4962C12.6834 16.0914 11.9891 16.9373 11.5791 17.9271C11.1692 18.9169 11.0619 20.006 11.2709 21.0567C11.4799 22.1074 11.9958 23.0726 12.7533 23.8301C13.5109 24.5877 14.476 25.1036 15.5268 25.3126C16.5775 25.5216 17.6666 25.4143 18.6564 25.0043C19.6461 24.5944 20.4921 23.9001 21.0873 23.0093C21.6825 22.1186 22.0002 21.0713 22.0002 20C22.0002 19.6685 22.1319 19.3505 22.3663 19.1161C22.6007 18.8817 22.9186 18.75 23.2502 18.75C23.5817 18.75 23.8996 18.8817 24.134 19.1161C24.3685 19.3505 24.5002 19.6685 24.5002 20C24.5002 21.5657 24.0359 23.0964 23.166 24.3982C22.2961 25.7001 21.0597 26.7148 19.6131 27.314C18.1665 27.9132 16.5747 28.07 15.039 27.7645C13.5033 27.4591 12.0927 26.7051 10.9856 25.5979C9.8784 24.4907 9.12441 23.0801 8.81895 21.5444C8.51348 20.0088 8.67026 18.417 9.26945 16.9704C9.86864 15.5238 10.8833 14.2874 12.1852 13.4175C13.4871 12.5476 15.0177 12.0833 16.5835 12.0833C16.915 12.0833 17.233 12.215 17.4674 12.4494C17.7018 12.6838 17.8335 13.0018 17.8335 13.3333C17.8335 13.6648 17.7018 13.9828 17.4674 14.2172C17.233 14.4516 16.915 14.5833 16.5835 14.5833ZM30.3335 20C30.3335 21.4366 29.7628 22.8143 28.747 23.8301C27.7312 24.846 26.3534 25.4166 24.9168 25.4166C24.5853 25.4166 24.2674 25.5483 24.0329 25.7828C23.7985 26.0172 23.6668 26.3351 23.6668 26.6666C23.6668 26.9982 23.7985 27.3161 24.0329 27.5505C24.2674 27.785 24.5853 27.9166 24.9168 27.9166C26.4826 27.9166 28.0132 27.4523 29.3151 26.5824C30.617 25.7126 31.6317 24.4761 32.2309 23.0296C32.8301 21.583 32.9868 19.9912 32.6814 18.4555C32.3759 16.9198 31.6219 15.5092 30.5148 14.4021C29.4076 13.2949 27.997 12.5409 26.4613 12.2354C24.9256 11.93 23.3338 12.0867 21.8873 12.6859C20.4407 13.2851 19.2043 14.2998 18.3344 15.6017C17.4645 16.9036 17.0002 18.4342 17.0002 20C17.0002 20.3315 17.1319 20.6494 17.3663 20.8839C17.6007 21.1183 17.9186 21.25 18.2502 21.25C18.5817 21.25 18.8996 21.1183 19.134 20.8839C19.3685 20.6494 19.5002 20.3315 19.5002 20C19.5002 18.5634 20.0708 17.1856 21.0867 16.1698C22.1025 15.154 23.4802 14.5833 24.9168 14.5833C26.3534 14.5833 27.7312 15.154 28.747 16.1698C29.7628 17.1856 30.3335 18.5634 30.3335 20Z"
              fill="#633CFF"
            />
          </svg>
          <h1 className=" text-[#333] text-2xl font-bold">devlinks</h1>
        </div>
        <form onSubmit={handleSignUp} className="w-[311px] md:w-[476px] h-auto p-8 md:p-10 bg-white border border-[#D9D9D9]">
          <h1 className="text-[#333] text-2xl md:text-3xl mb-2">Create account</h1>
          <p className="text-[#333] text-base mb-10">Let’s get you started sharing your links!</p>
          <div>
            <label className="mb-1 text-[#333] text-sm">Email address</label>
            <div className="flex mb-6 gap-2 px-4 py-3 w-full h-12 items-center bg-white border border-[#D9D9D9] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z"
                  fill="#737373"
                />
              </svg>
              <input
                type="email"
                placeholder="e.g. alex@gmail.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                className="text-[#333] text-base p-1 outline-none border-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 text-[#333] text-sm">Create password</label>
            <div className="flex mb-6 gap-2 px-4 py-3 w-full h-12 items-center bg-white border border-[#D9D9D9] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z"
                  fill="#737373"
                />
              </svg>
              <input
                type="password"
                placeholder="At least 8 character"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-[#333] text-base p-1 outline-none border-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 text-[#333] text-sm">Confirm password</label>
            <div className="flex mb-6 gap-2 px-4 py-3 w-full h-12 items-center bg-white border border-[#D9D9D9] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z"
                  fill="#737373"
                />
              </svg>
              <input
                type="password"
                placeholder="At least 8 character"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                required
                className="text-[#333] text-base p-1 outline-none border-none"
              />
              <p className="text-red-800 text-xs">{errorMessage}</p>
            </div>
          </div>
          <p className="text-sm text-[#333] mb-6">Password must contain at least 8 characters</p>
          <button type="submit" className="w-full h-12 rounded-lg flex justify-center py-3 bg-[#633CFF] text-white text-base font-semibold mb-6 cursor-pointer">Create new accout</button>
          {/* {error && <p>password do not match</p>} */}
          <div className="flex flex-col md:flex-row gap-1 text-base justify-center items-center">
            <p className="text-[#333]">Already have an account?</p>
            <Link href="/logIn" className="text-[#633CFF]">Login</Link>
          </div>
        </form>
      </div>
    );
  }