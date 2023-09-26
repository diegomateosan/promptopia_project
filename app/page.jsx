import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Descrube & Comparte
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>IA-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia es una herramienta open-source de IA prompting para descrubrir, crear y compartir los prompts más creativos.
      </p>
      <Feed />
    </section>
  )
}

export default Home
