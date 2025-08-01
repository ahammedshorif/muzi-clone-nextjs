"use client"
import { signIn, signOut, useSession} from "next-auth/react";



export default function Appbar() {
    const session = useSession();
  return (
     
    <div className="bg-gray-500">
        <div className="flex justify-between mx-6">
            <div className="text-2xl font-bold mt-2">Muzi</div>
            <div>
                {!session.data?.user && <button className="m-2 p-2 bg-black text-white rounded-lg" onClick={()=> signIn()}>SignIn</button>}
                {session.data?.user && <button className="m-2 p-2 bg-black text-white rounded-lg" onClick={()=> signOut()}>Logout</button>}
            </div>
        </div>

    </div>
   
  )
}
