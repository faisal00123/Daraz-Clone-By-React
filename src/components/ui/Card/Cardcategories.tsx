import { Link } from '@tanstack/react-router';

const Cardcategories = () => {
  const categoryImageMap = [
    {
      name: 'Electronics',
      image: 'Category3.png',
    },
    {
      name: 'Jewelery',
      image: 'Category4.png',
    },
    {
      name: "Men's clothing",
      image: 'Category1.png',
    },
    {
      name: "Women's clothing",
      image: 'Category2.png',
    },
  ];

  return (
    <>
      {categoryImageMap.map((data) => (
        <Link key={data.name} to="/categories/$id" params={{ id: data.name }}>
          <div className="group relative  flex flex-col h-full bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img
                src={data.image}
                alt={data.name}
                className=" h-50 w-full object-contain transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col grow p-3 ">
              <div className="grow space-y-2">
                <h3 className="font-bold text-slate-800 text-base md:text-lg line-clamp-2 min-h-12 leading-tight group-hover:text-blue-600 transition-colors">
                  {/* {data.category.toUpperCase()} */}
                  {data.name}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Cardcategories;
