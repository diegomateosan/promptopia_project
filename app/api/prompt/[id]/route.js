import { connectToDb } from '@utils/database'
import Prompt from '@models/Prompt'

export const GET = async (req, { params }) => {
  try {
    await connectToDb()
    const prompt = await Prompt.findById(params.id).populate('creator')
    if(!prompt) return new Response('Prompt not found', { status: 404 })
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()
  try {
    await connectToDb()
    const existingPrompt = await Prompt.findById(params.id).populate('creator')
    if(!existingPrompt) return new Response('Prompt not found', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response('Failed to update prompt', { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb()
    await Prompt.findByIdAndRemove(params.id)
    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response('Failed to delete prompt', { status: 500 })
  }
}