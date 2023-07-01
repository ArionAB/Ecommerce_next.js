import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("../src/Components/about-page/AboutPage"), {
  ssr: false
})

const About = () => {
  return (
    <AboutPage />
  )

}


export default About;
