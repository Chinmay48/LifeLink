import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  Calendar, 
  Clock, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  History
} from "lucide-react";
import { getDonationHistory } from "../../../features/donor/donorAPI";
import { showSuccess, showError } from "../../../utils/toast";

const DonationHistory = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getDonationHistory();
      setHistory(res.data);
      showSuccess(res.message);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 p-6 md:p-10">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <History className="text-orange-500" size={32} />
            Donation History
          </h1>
          <p className="text-gray-500 mt-1">Track your life-saving contributions and their status.</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
          {history?.length || 0}
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {history?.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 relative overflow-hidden group"
              >
                {/* Background Accent Decor */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-200">
                      <Droplets size={24} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                      item.status === 'AVAILABLE' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-800">
                      {item.organId.organType} <span className="text-orange-500">{item.organId.subType}</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-tighter">
                      ID: {item._id.slice(-8)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar size={16} className="text-orange-400" />
                      <span>Donated: {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock size={16} className="text-orange-400" />
                      <span>Expires: {new Date(item.expiryTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Building2 size={16} className="text-orange-400" />
                      <span>{item.assignedHospital || "Awaiting Assignment"}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-3 bg-gray-50 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-gray-500">
                    View Details
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && history?.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-orange-200">
          <AlertCircle className="mx-auto text-orange-300 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-700">No donations found</h2>
          <p className="text-gray-400">Ready to make a difference? Start your first donation today.</p>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;