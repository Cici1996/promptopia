import { connectToDb } from '@utils/database'
import Prompt from "@models/prompt"

export const GET = async (req:any,{params}:any) => {
    try {
        await connectToDb()
        const prompts = await Prompt.findById(params?.id).populate('creator')
        if(!prompts) return new Response("Prompt Not found", { status: 404 })
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response('Failed Fetch Data', { status: 500 })
    }
}

export const PATCH = async (req:any,{params}:any) => {
    try {
        const {prompt,tag} = await req.json()
        await connectToDb()
        const prompts = await Prompt.findById(params?.id)
        if(!prompts) return new Response("Prompt Not found", { status: 404 })

        prompts.prompt = prompt
        prompts.tag = tag

        await prompts.save()
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response('Failed Update Data', { status: 500 })
    }
}

export const DELETE = async (req:any,{params}:any) => {
    try {
        await connectToDb()
        const prompts = await Prompt.findByIdAndRemove(params?.id)
        return new Response('Success Delete Data', { status: 200 })
    } catch (error) {
        return new Response('Failed Delete Data', { status: 500 })
    }
}