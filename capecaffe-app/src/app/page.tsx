import Navbar from "@/Navigation bar/Navbar";
import HomeComponent from "@/Home/Home";
import AboutUs from "@/AboutUs/AboutUs";
import ContactUs from "@/ContactUs/ContactUs";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomeComponent />
      <AboutUs/>
      <ContactUs/>
      
      
    </div>
  );
}
