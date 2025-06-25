import Hero from "../components/Hero/Hero";
import PopularCategories from "../components/Categories/PopularCategories";
import ServiceCards from "../components/Tasks/FeaturedTasks";
import PopularSellers from "../components/Seller/PopularSeller";
import AppPromo from "../components/AppPromo/AppPromo";
import PopularTasks from "../components/Tasks/PopularTasks";
import Stat from "../components/Stat/Stat";

const Home = () => {
  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Hero />
      <PopularCategories />
      <Stat></Stat>
      <ServiceCards />
      <PopularSellers />
      <PopularTasks></PopularTasks>
      <AppPromo />
    </div>
  );
};

export default Home;
