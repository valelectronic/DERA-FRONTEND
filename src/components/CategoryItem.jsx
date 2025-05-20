import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative group overflow-hidden w-full h-32 sm:h-40 md:h-48 lg:h-52 max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] rounded-lg mx-auto">
      <Link to={`/category${category.href}`}>
        <div className="w-full h-full cursor-pointer rounded-lg overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10" />

          {/* Background image */}
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
            <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-0.5 truncate">
              {category.name}
            </h3>
            <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm truncate">
              Explore {category.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
