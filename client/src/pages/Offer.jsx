import React from 'react';
import { Link } from 'react-router-dom'; 

const OffersAndDeals = () => {
  const offers = [
    {
      title: "Instant Foods Bonanza",
      description: "Stock up on instant meals and save big! Limited time offer.",
      discount: "50% OFF",
      tag: "Hot Deal",
      link: "/products/instant", 
    },
    {
      title: "Refreshing Beverages",
      description: "Juices, cold drinks, and more at 30% discount. Refresh yourself now ",
      discount: "30% OFF",
      tag: "Limited Time",
      link: "/products/drinks",
    },
    {
      title: "Breakfast Essentials",
      description: "Start your day right with breakfast staples at 25% OFF.",
      discount: "25% OFF",
      tag: "Trending",
      link: "/products/dairy",
    },
  ];

  return (
    <div className="bg-white pt-24 px-6 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#1F2937] mb-3">
          Offers & Deals
        </h1>
        <p className="text-gray-600 text-lg">
          Grab the best grocery deals before they're gone!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-[#1F2937]">{offer.title}</h2>
              <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                {offer.discount}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{offer.description}</p>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full mb-4">
              {offer.tag}
            </span>
            <Link
              to={offer.link}
              className="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-dark transition duration-200 text-center block"
            >
              Grab Deal
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-700 text-lg font-medium">
          Hurry! These grocery deals won’t last long!
        </p>
      </div>
    </div>
  );
};

export default OffersAndDeals;
