import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"


const UpvoteSchema = z.object({
    streamID: z.string(),

})

export async function POST(req: NextRequest){
    const session = await getServerSession ();

    
     //TODO: can get red of the db call here
  

    const user = await prismaClient.user.findOne({
        where:{
            email: session?.user?.email ?? ""
        }
    });

      if(!user){
        return NextResponse.json({
            message:"Unathenticated user"
        },{
            status: 403
        })
    }

    try{

        const data = UpvoteSchema.parse(await req.json());

        await prismaClient.updote.delete({
            where: {
                userID_streamID:{
                    userId: user.id,
                    streamID: data.streamID,
                }
            }
        })

    } catch(e){
        console.log(e)
        return NextResponse.json({
            message:"error while upvotiog"
        })
    }

}