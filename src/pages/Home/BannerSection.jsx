import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import WorldMap from "../../../src/assets/World Map.svg";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const BannerSection = () => {
  return (
    <motion.section
      className="relative overflow-hidden h-[80vh] flex flex-col justify-center items-center text-center text-white"
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-contain rounded-xl"
        style={{ backgroundImage: `url(${WorldMap})` }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-xl"></div>

      <motion.div
        className="relative z-10 flex flex-col justify-center items-center px-4"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-4"
          variants={itemVariants}
        >
          Join Hands to Build a Better Tomorrow
        </motion.h1>

        <motion.div className="flex gap-4" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/upcoming-events" className="btn btn-primary px-6 py-3">
              Explore Events
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/create-event" className="btn btn-outline px-6 py-3">
              Create Event
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default BannerSection;
