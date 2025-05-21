import React from "react";
import Hero from "../components/Hero/Hero";
import Subscription from "../components/Subscription/Subscription";
import HomeBlog from "../components/Blogs/HomeBlogs";
import useTitle from "../hooks/useTitle";
import FaqSection from "../components/Faq/Faq";
import Numbers from "../components/Numbers/Numbers";
import PopularCategories from "../components/Categories/PopularCategories";
import ServiceCards from "../components/Tasks/FeaturedTasks";
import PopularSellers from "../components/Seller/PopularSeller";
import AppPromo from "../components/AppPromo/AppPromo";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  useTitle("Home");

  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Hero />
      <PopularCategories />
      <ServiceCards />
      <PopularSellers />
      <AppPromo />
      {/* <Subscription />
      <Numbers />
      <HomeBlog />
      <FaqSection /> */}
    </div>
  );
};

export default Home;
