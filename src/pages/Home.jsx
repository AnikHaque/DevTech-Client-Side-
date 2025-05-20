import React from "react";
import Hero from "../components/Hero/Hero";
import Subscription from "../components/Subscription/Subscription";
import HomeBlog from "../components/Blogs/HomeBlogs";
import useTitle from "../hooks/useTitle";
import FaqSection from "../components/Faq/Faq";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Hero></Hero>
      <Subscription></Subscription>
      <HomeBlog></HomeBlog>
      <FaqSection></FaqSection>
    </div>
  );
};

export default Home;
