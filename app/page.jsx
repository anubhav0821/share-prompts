import Feed from "@components/feed"



const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Prompt Maker is open source tool to create, discover and share creative and poerful AI prompts.
        </p>
        <Feed />
    </section>
  )
}

export default Home