import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

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
      <div className="md:px-32 bg-gray-50 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-dark_color">
          খিদা লাগসে ঢাবিয়ান্স!?
        </h1>
        <span className="text-xl">Git a Grub by just a click!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter text-dark_color">
            Fill your tummy from your department now!
          </span>
          <span>
            Download the GitGrub App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
          <Link to="/employee-profile" className="text-blue-500 hover:text-blue-700">ManageEmployeePage</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;