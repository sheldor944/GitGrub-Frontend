import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const controlsSearchBar = useAnimation();
  const controlsLandingImage = useAnimation();
  const controlsTextSection = useAnimation();

  const { ref: refSearchBar, inView: inViewSearchBar } = useInView({ threshold: 0.2 });
  const { ref: refLandingImage, inView: inViewLandingImage } = useInView({ threshold: 0.2 });
  const { ref: refTextSection, inView: inViewTextSection } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inViewSearchBar) {
      controlsSearchBar.start("visible");
    } else {
      controlsSearchBar.start("hidden");
    }
  }, [controlsSearchBar, inViewSearchBar]);

  useEffect(() => {
    if (inViewLandingImage) {
      controlsLandingImage.start("visible");
    } else {
      controlsLandingImage.start("hidden");
    }
  }, [controlsLandingImage, inViewLandingImage]);

  useEffect(() => {
    if (inViewTextSection) {
      controlsTextSection.start("visible");
    } else {
      controlsTextSection.start("hidden");
    }
  }, [controlsTextSection, inViewTextSection]);

  const searchBarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const landingImageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  const textSectionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <motion.div
        ref={refSearchBar}
        className="md:px-32 bg-gray-50 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16"
        initial="hidden"
        animate={controlsSearchBar}
        variants={searchBarVariants}
      >
        <h1 className="text-5xl font-bold tracking-tight text-dark_color">
          খিদা লাগসে ঢাবিয়ান্স!?
        </h1>
        <span className="text-xl">Git a Grub by just a click!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </motion.div>
      <div className="grid md:grid-cols-2 gap-5">
        <motion.img
          ref={refLandingImage}
          src={landingImage}
          initial="hidden"
          animate={controlsLandingImage}
          variants={landingImageVariants}
        />
        <motion.div
          ref={refTextSection}
          initial="hidden"
          animate={controlsTextSection}
          variants={textSectionVariants}
          className="flex flex-col items-center justify-center gap-4 text-center"
        >
          <span className="font-bold text-3xl tracking-tighter text-dark_color">
            Fill your tummy from your department now!
          </span>
          <span>
            Download the GitGrub App for faster ordering and personalised
            recommendations
          </span>
          <motion.img
            src={appDownloadImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
