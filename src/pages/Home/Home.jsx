import React from "react";
import BannerSection from "./BannerSection";
import FeatureSection from "./FeatureSection";
import NewsletterSection from "./NewsletterSection";
import GallerySection from "./GallerySection";

const Home = () => {
  const allImages = [
    "https://i.ibb.co/S70fhKR4/hero3.jpg",
    "https://i.ibb.co/DfvXrrdn/hero2.jpg",
    "https://i.ibb.co/NdpVRftL/hero4.jpg",
    "https://i.ibb.co/zTw7kVnY/hero5.jpg",
    "https://i.ibb.co/0jCr8j77/hero1.jpg",
    "https://i.ibb.co/tpPBxNrR/plants1.jpg",
    "https://i.ibb.co/hRjdf8cr/plants3.jpg",
    "https://i.ibb.co/LdtwrLSq/plants4.jpg",
    "https://i.ibb.co/9m1sRjxq/plants5.jpg",
    "https://i.ibb.co.com/MkdN2YnS/plants2.jpg",
    "https://i.ibb.co.com/8gv7yv76/plants6.jpg",
    "https://i.ibb.co.com/67cLDvBD/plants7.jpg",
    "https://i.ibb.co.com/mCrtpLPN/experts3.jpg",
    "https://i.ibb.co.com/0j0qzB7G/experts1.jpg",
    "https://i.ibb.co.com/Pv1Xgs5T/experts2.jpg",
    "https://i.ibb.co.com/7JD4rd80/eco3.jpg",
    "https://i.ibb.co.com/60sWBPyg/eco2.jpg",
    "https://i.ibb.co.com/Qvw31j4L/eco1.jpg",
    "https://i.ibb.co.com/PsgDyD24/plants-For-Home7.jpg",
    "https://i.ibb.co.com/9mNzmyVH/plants-For-Home6.jpg",
    "https://i.ibb.co.com/vWXRNbb/plants-For-Home5.jpg",
    "https://i.ibb.co.com/GLcq3dw/plants-For-Home3.jpg",
    "https://i.ibb.co.com/LdTHQ0Sw/plants-For-Home2.jpg",
    "https://i.ibb.co.com/0Rbjnv7F/plants-For-Home1.jpg",
    "https://i.ibb.co.com/V0f8qNrg/plants-For-Home4.jpg",
    "https://i.ibb.co.com/RpgcsKCz/Nike-Air-Max-270.jpg",
    "https://i.ibb.co.com/Qv3pyvrZ/Sony-Bravia-55-TV.jpg",
  ];

  return (
    <div>
      <BannerSection />
      <FeatureSection />
      <GallerySection
        title="Our Community Events"
        subtitle="Explore inspiring initiatives where people come together to make our neighborhoods greener, cleaner, and stronger. Join us in creating a better tomorrow!"
        images={allImages}
        eventTitles={[
          "Tree Plantation Drive",
          "Neighborhood Cleanup",
          "Community Gardening",
        ]}
        eventSubtitles={[
          "Join us in planting trees to make our environment healthier and greener.",
          "Help clean streets and parks to create a safer, cleaner neighborhood.",
          "Participate in community gardening to beautify public spaces and learn together.",
        ]}
      />
      <NewsletterSection />
    </div>
  );
};

export default Home;
