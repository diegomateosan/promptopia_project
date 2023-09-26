import Link from 'next/link'
const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text_left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} y comparte prompts asombrosos con la comunidad y deja volar tu imaginación con cualquier plataforma impulsada por IA.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tu prompt de IA</span>
          <textarea
            value={post.prompt}
            onChange={(evt) => setPost({...post, prompt: evt.target.value})} 
            placeholder='Escribe tu prompt de IA aquí'
            required
            className='form_textarea' 
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {` `}
            <span className='font-normal'>(#productos, #desarrolloweb #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(evt) => setPost({...post, tag: evt.target.value})} 
            placeholder='#tag'
            required
            className='form_input' 
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancelar
          </Link>
          <button 
            type='submit' 
            disabled={submitting} 
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type} ...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
