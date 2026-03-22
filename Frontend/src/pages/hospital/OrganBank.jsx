import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeartbeat, FaTint, FaLungs, FaEye, FaBone } from "react-icons/fa";
import { GiKidneys, GiLiver, GiHeartOrgan, GiSkeleton, GiStomach } from "react-icons/gi";
import { MdAdd, MdRemove, MdRefresh, MdInventory2 } from "react-icons/md";
import { getInventory, updateInventoryStock } from "../../features/hospital/hospitalAPI";
import { showError, showSuccess } from "../../utils/toast";
import { ORGAN_TYPES } from "../../../../Backend/constants/Organ";

const iconMap = {
  BLOOD: <FaTint />,
  HEART: <FaHeartbeat />,
  LUNG: <FaLungs />,
  KIDNEY: <GiKidneys />,
  LIVER: <GiLiver />,
  PANCREAS: <GiHeartOrgan />,
  BONE: <FaBone />,
  SKIN: <GiSkeleton />,
  CORNEA: <FaEye />,
  INTESTINE: <GiStomach />,
};

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

const OrganCard = ({ item, index, onUpdate }) => {
  const isLowStock = item.availableCount < 3;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,165,0,0.1)] transition-all duration-300"
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent rounded-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${isLowStock ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'} group-hover:scale-110 transition-transform duration-300 text-2xl`}>
            {iconMap[item.organType] || <FaHeartbeat />}
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${isLowStock ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-green-100 text-green-600'}`}>
            {isLowStock ? 'Critical Stock' : 'Stable'}
          </div>
        </div>

        <h3 className="text-gray-800 font-bold text-xl mb-1">{item.organType}</h3>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className={`text-4xl font-black transition-colors duration-300 ${isLowStock ? 'text-red-500' : 'text-orange-600'}`}>
            {item.availableCount}
          </span>
          <span className="text-gray-400 font-medium text-sm">Units Available</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdate(item.organType, -1)}
            disabled={item.availableCount === 0}
            className="flex items-center justify-center gap-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-600 transition-colors"
          >
            <MdRemove size={20} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdate(item.organType, 1)}
            className="flex items-center justify-center gap-1 py-3 rounded-xl bg-orange-600 text-white font-bold shadow-md shadow-orange-200 hover:bg-orange-700 transition-colors"
          >
            <MdAdd size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrganBank;