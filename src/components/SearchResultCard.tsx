import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import useIntersectionObserver from "@/useIntersectionObserver";
type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className={`grid lg:grid-cols-[2fr_3fr] gap-5 group transition-transform duration-1000 ${
        isIntersecting ? "transform translate-x-0 opacity-100" : "transform -translate-x-60 opacity-0"
      }`}
      ref={ref}
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex" key={index}>
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ৳{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
