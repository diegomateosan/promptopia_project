import { connectToDb } from '@utils/database'
import Prompt from '@models/Prompt'

export const GET = async (req, { params }) => {
  try {
    await connectToDb()
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response('Failed to fetch all post', { status: 500 })
  }
}