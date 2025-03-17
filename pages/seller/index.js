import Head from "next/head";
import { FaShoppingCart, FaBox, FaPlus, FaCoffee, FaCookieBite, FaPencilAlt, FaToiletPaper } from "react-icons/fa";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <Head>
        <title>Seller Dashboard</title>
      </Head>

      {/* Dashboard Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Seller Dashboard</h1>

        {/* Order & Inventory Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg flex items-center justify-between shadow">
            <FaShoppingCart className="text-3xl text-blue-600" />
            <div>
              <p className="text-xl font-bold">12</p>
              <p className="text-gray-700">Pending Orders</p>
            </div>
          </div>
          <div className="p-4 bg-green-100 rounded-lg flex items-center justify-between shadow">
            <FaBox className="text-3xl text-green-600" />
            <div>
              <p className="text-xl font-bold">230</p>
              <p className="text-gray-700">Inventory Left</p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <CategoryCard icon={<FaCoffee />} title="Beverages" count="40 Items" />
          <CategoryCard icon={<FaCookieBite />} title="Snacks" count="50 Items" />
          <CategoryCard icon={<FaPencilAlt />} title="Stationery" count="70 Items" />
          <CategoryCard icon={<FaToiletPaper />} title="Essentials" count="30 Items" />
        </div>

        {/* Add New Product Section */}
        <div className="p-4 bg-gray-200 rounded-lg flex justify-between items-center shadow">
          <div>
            <h3 className="text-lg font-bold">Add New Product</h3>
            <p className="text-gray-600 text-sm">Expand your store</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600">
            <FaPlus className="mr-2" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

// Category Card Component
const CategoryCard = ({ icon, title, count }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex items-center">
      <div className="text-3xl text-gray-700 mr-4">{icon}</div>
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-gray-600 text-sm">{count}</p>
      </div>
    </div>
  );
};
