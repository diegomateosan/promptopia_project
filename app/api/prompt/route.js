import { connectToDb } from '@utils/database'
import Prompt from '@models/Prompt'

export const GET = async (req, res) => {
  try {
    await connectToDb()
    const prompts = await Prompt.find().populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}