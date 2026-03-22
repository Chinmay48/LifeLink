import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MdAdd, MdRemove, MdRefresh, MdInventory2 } from "react-icons/md";
import { getInventory, updateInventoryStock } from "../../features/hospital/hospitalAPI";
import { showError, showSuccess } from "../../utils/toast";
import { ORGAN_TYPES } from "../../../../Backend/constants/Organ";
import OrganCard from "../../components/ui/OrganCard";


const OrganBank = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await getInventory();
      setInventory(res.data);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const updateStock = async (organType, delta) => {
    try {
      const res = await updateInventoryStock(organType, delta);
      fetchInventory();
      showSuccess(res.message);
    } catch (error) {
      showError(error.message);
    }
  };

  const mergedInventory = ORGAN_TYPES.map((type) => {
    const existing = inventory.find((item) => item.organType === type);
    return existing || { organType: type, availableCount: 0, _id: type };
  });

  return (
    <div className="relative min-h-screen bg-orange-50/50 p-4 md:p-8 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl font-black text-orange-600 flex items-center gap-3"
            >
              <MdInventory2 className="text-orange-500" />
              Organ Bank
            </motion.h1>
            <p className="text-orange-800/60 font-medium ml-1">Real-time inventory management</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchInventory}
            className="group flex items-center gap-2 bg-white border-2 border-orange-500 text-orange-600 px-6 py-2.5 rounded-full font-bold shadow-sm hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <MdRefresh className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} size={22} />
            Refresh Stock
          </motion.button>
        </header>

        {/* Content Area */}
        {loading && inventory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-orange-400">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4" />
            <p className="font-medium animate-pulse">Syncing Bank Data...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {mergedInventory.map((item, index) => (
                <OrganCard 
                  key={item.organType} 
                  item={item} 
                  index={index} 
                  onUpdate={updateStock} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};



export default OrganBank;