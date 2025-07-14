import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"


const YT_REGEX= new RegExp("^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|shorts\/)?([A-Za-z0-9_-]{11})(\S*)?$")

const CreateStreamSchema = z.object({
    creatorID: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {

    try {

        const data = CreateStreamSchema.parse( await req.json());
        const isYtUrl = YT_REGEX.test(data.url)
        if(!isYtUrl){
             return NextResponse.json({
                message: "Not a youtube URL"
            },{
            status: 411
            })

        }

        const extractedID = data.url.split("?v=")[1];

       await prismaClient.stream.create({
            data: {
                userId: data.creatorID,
                url: data.url,
                extractedID: extractedID,
                type: "Youtube"
            }

        });

    } catch(e){
        console.log(e)
        return NextResponse.json({
            
            message: "Error while adding a stream"
        },{
            status: 411
        })
    }


}