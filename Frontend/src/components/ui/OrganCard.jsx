import { MdAdd, MdRemove  } from "react-icons/md";
import { FaHeartbeat, FaTint, FaLungs, FaEye, FaBone } from "react-icons/fa";
import { GiKidneys, GiLiver, GiHeartOrgan, GiSkeleton, GiStomach } from "react-icons/gi";
import {motion} from "framer-motion"
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

export default OrganCard