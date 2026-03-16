import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Activity,
  CheckCircle,
  Clock,
  Plus,
  History,
  User,
  MapPin,
  ShieldCheck,
  Zap,
  ChevronRight,
  MoreVertical,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDonationHistory, getDonorProfile, updateAvailability } from "../../features/donor/donorAPI";
import { showSuccess, showError } from "../../utils/toast";

// --- Sub-Components ---

const StatsCard = ({ icon: Icon, label, value, colorClass, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 100 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white/70 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4"
  >
    <div className={`p-3 rounded-2xl ${colorClass} shadow-inner`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</p>
      <h3 className="text-xl md:text-2xl font-black text-slate-800">{value}</h3>
    </div>
  </motion.div>
);

const DonationMobileCard = ({ item }) => (
  <motion.div 
    layout
    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-3 flex items-center justify-between"
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 font-black text-xl">
        {item.organId.organType[0]}
      </div>
      <div>
        <p className="font-bold text-slate-800">{item.organId.organType}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
            item.status === 'AVAILABLE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500'
          }`}>
            {item.status}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock size={10} /> {new Date(item.expiryTime).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
    <ChevronRight size={18} className="text-slate-300" />
  </motion.div>
);

// --- Main Dashboard ---

const DonorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      const [profileRes, donationRes] = await Promise.all([
        getDonorProfile(),
        getDonationHistory(),
      ]);
      setProfile(profileRes.data);
      setDonations(donationRes.data);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      const newStatus = !profile.isAvailable;
      await updateAvailability(newStatus);
      setProfile((prev) => ({ ...prev, isAvailable: newStatus }));
      showSuccess("Status updated successfully");
    } catch (error) {
      showError(error.message);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-orange-50">
      <div className="relative">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-orange-400 rounded-full blur-xl"
        />
        <Heart className="text-orange-600 relative z-10 animate-pulse" size={48} fill="currentColor" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-24 md:pb-8">
      {/* Top Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-6 bg-white border-b border-orange-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <User size={20} />
          </div>
          <span className="font-bold text-slate-800">Hi, {profile?.fullName.split(' ')[0]}</span>
        </div>
        <button className="p-2 text-slate-400 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-4 md:pt-10 space-y-6 md:space-y-10">
        
        {/* Desktop Header */}
        <header className="hidden md:flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-orange-500 tracking-tight">Dashboard</h1>
            <p className="text-slate-400 font-medium flex items-center gap-2 mt-1">
              Welcome back to LifeLink Portal <span className="w-1 h-1 bg-slate-300 rounded-full" /> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/donor/donations/new")}
            className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-orange-200"
          >
            <Plus size={20} strokeWidth={3} /> New Donation
          </motion.button>
        </header>

        {/* Hero Card */}
        <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="relative group rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(249,115,22,0.25)] bg-slate-950 border border-white/5"
>
  {/* The Solar Gradient Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-400 opacity-95 transition-transform group-hover:scale-105 duration-1000" />
  
  {/* Animated Heat Waves (Subtle Background Glows) */}
  <motion.div 
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
      x: [0, 30, 0]
    }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-300/40 rounded-full blur-[100px]" 
  />

  <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row justify-between md:items-center gap-10">
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-black/25 backdrop-blur-2xl border border-white/20 px-4 py-2 rounded-2xl shadow-xl">
          <ShieldCheck size={18} className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]" />
          <span className="text-white text-[11px] font-black uppercase tracking-[0.25em]">Verified Elite Donor</span>
        </div>
        <div className="h-2 w-2 rounded-full bg-yellow-200 animate-pulse shadow-[0_0_10px_#fde047]" />
      </div>

      <div>
        <h2 className="text-orange-100/70 text-xs font-black uppercase tracking-[0.4em] mb-2 ml-1">Compatibility Profile</h2>
        <div className="relative inline-block">
          <h3 className="text-8xl md:text-9xl text-white font-black tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            {profile?.bloodGroup}
          </h3>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-white to-yellow-300 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl text-sm border border-white/20 hover:bg-white/20 transition-all shadow-inner">
          <MapPin size={16} className="text-yellow-300" />
          <span className="font-bold">{profile?.address.split(',')[0]}</span>
        </div>
        <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl text-sm border border-white/20">
          <Activity size={16} className="text-yellow-200" />
          <span className="font-bold">Life Score: 98%</span>
        </div>
      </div>
    </div>

    {/* The Golden Control Panel */}
    <div className="relative group/panel">
      {/* Outer Glow Ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-[2.5rem] blur-xl opacity-20 group-hover/panel:opacity-40 transition duration-700" />
      
      <div className="relative bg-black/20 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.8rem] flex flex-col items-center gap-6 min-w-[240px] shadow-2xl">
        <div className="space-y-1 text-center">
          <p className="text-yellow-200/60 text-[10px] font-black uppercase tracking-[0.3em]">Broadcast State</p>
          <p className="text-white text-xl font-black italic tracking-tight">
            {profile?.isAvailable ? 'SOLAR ACTIVE' : 'STEALTH MODE'}
          </p>
        </div>

        <button 
          onClick={toggleAvailability}
          className="relative group/btn cursor-pointer"
        >
          {/* Reactive Halo */}
          <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${profile?.isAvailable ? 'bg-yellow-400/40 scale-150' : 'bg-transparent'}`} />
          
          <div className={`w-24 h-12 rounded-full p-1.5 transition-all duration-500 border-2 ${
            profile?.isAvailable 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-white/40 shadow-[0_0_30px_rgba(251,191,36,0.5)]' 
            : 'bg-slate-900 border-white/10'
          }`}>
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-8 h-8 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center"
            >
              {profile?.isAvailable ? (
                <Zap size={16} className="text-orange-600 fill-orange-500" />
              ) : (
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
              )}
            </motion.div>
          </div>
        </button>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <p className="text-white/60 text-[10px] font-bold leading-relaxed text-center px-2">
          {profile?.isAvailable 
            ? "You are currently visible to emergency responders." 
            : "Invisible to matches. Toggle to go live."}
        </p>
      </div>
    </div>
  </div>
  
  {/* Sunflare decoration */}
  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-200 opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
</motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard icon={Heart} label="Total" value={donations.length} colorClass="bg-orange-100 text-orange-600" delay={0.1} />
          <StatsCard icon={Zap} label="Active" value={donations.filter(d => d.status === "AVAILABLE").length} colorClass="bg-blue-100 text-blue-600" delay={0.2} />
          <StatsCard icon={CheckCircle} label="Reserved" value={donations.filter(d => d.status === "RESERVED").length} colorClass="bg-green-100 text-green-600" delay={0.3} />
          <StatsCard icon={Clock} label="Expired" value={donations.filter(d => d.status === "EXPIRED").length} colorClass="bg-slate-100 text-slate-500" delay={0.4} />
        </div>

        {/* History Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              Recent Activity <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            </h3>
            <button className="text-orange-600 text-xs font-black uppercase tracking-widest hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
              See All
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.15em]">
                  <th className="px-8 py-5">Organ/Type</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Created At</th>
                  <th className="px-8 py-5">Expiry</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {donations.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                          {item.organId.organType[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{item.organId.organType}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{item.organId.subType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold">
                      <span className={`px-3 py-1 rounded-full ${
                        item.status === 'AVAILABLE' ? 'text-green-600 bg-green-50' : 'text-slate-500 bg-slate-50'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                      {new Date(item.createdAt).toDateString()}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-400 italic">
                      {new Date(item.expiryTime).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <button className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden">
            {donations.map((item) => (
              <DonationMobileCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Floating Action Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/donor/donations/new")}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-orange-600 rounded-full shadow-2xl shadow-orange-300 flex items-center justify-center text-white z-50 border-4 border-white"
      >
        <Plus size={32} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

export default DonorDashboard;