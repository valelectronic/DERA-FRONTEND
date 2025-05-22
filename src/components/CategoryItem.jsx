import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] mx-auto">
      <Link to={`/category${category.href}`}>
        <div className="relative group overflow-hidden w-full h-32 sm:h-40 md:h-48 lg:h-52 rounded-lg">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10" />

          {/* Background image */}
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Text overlay inside image */}
          <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
            <h3 className="hidden sm:block text-white text-sm sm:text-base md:text-lg font-semibold mb-0.5 truncate">
              {category.name}
            </h3>
            <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm truncate">
              Explore {category.name}
            </p>
          </div>
        </div>
      </Link>

      {/* Mobile only: name below card */}
      <h3 className="text-white text-sm font-semibold mt-2 truncate text-center sm:hidden">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryItem;
