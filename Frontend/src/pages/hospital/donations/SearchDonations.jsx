import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Activity, 
  Droplet, 
  Navigation, 
  ChevronRight, 
  Heart,
  User,
  Loader2
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { getHospitalProfile, searchDonations } from "../../../features/hospital/hospitalAPI";
import { showError } from "../../../utils/toast";
import LocationPicker from "../../../components/maps/LocationPicker";

// Helper to smooth-center the map when coordinates change
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo([coords.lat, coords.lng], 13);
  }, [coords, map]);
  return null;
}

const SearchDonations = () => {
  const [formData, setFormData] = useState({ organType: "", bloodGroup: "", lat: "", lng: "" });
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHospitalLocation = async () => {
      try {
        const res = await getHospitalProfile();
        const coords = res.data.location.coordinates;
        const initialCoords = { lat: coords[1], lng: coords[0] };
        setFormData((prev) => ({ ...prev, ...initialCoords }));
        setCoordinates({ type: "Point", coordinates: coords });
      } catch (error) {
        showError(error.message);
      }
    };
    fetchHospitalLocation();
  }, []);

  useEffect(() => {
    if (coordinates) {
      setFormData((prev) => ({
        ...prev,
        lat: coordinates.coordinates[1],
        lng: coordinates.coordinates[0],
      }));
    }
  }, [coordinates]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await searchDonations(formData);
      setData(res.data);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const mapCenter = formData.lat && formData.lng ? [formData.lat, formData.lng] : [19.076, 72.8277];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="text-orange-500 w-8 h-8" />
            Find Nearby Donors
          </h1>
          <p className="text-slate-500 mt-1">Locate life-saving matches within your proximity.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-orange-100">
          <div className="bg-orange-100 p-2 rounded-xl">
            <MapPin className="text-orange-600 w-5 h-5" />
          </div>
          <div className="pr-4">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Current Search Area</p>
            <p className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
              {address || "Fetching location..."}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: FILTERS --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 p-6 border border-white">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 text-orange-500" /> Search Filters
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 ml-1">Organ Type</label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    placeholder="e.g. KIDNEY, HEART"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    onChange={(e) => setFormData({ ...formData, organType: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 ml-1">Blood Group</label>
                <div className="relative">
                  <Droplet className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    placeholder="e.g. A+, O-"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Adjust Location</p>
                <div className="rounded-2xl overflow-hidden border-2 border-slate-100 ring-4 ring-slate-50">
                  <LocationPicker setCoordinates={setCoordinates} setAddress={setAddress} />
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Navigation className="w-5 h-5" />}
                {loading ? "Searching..." : "Initialize Search"}
              </button>
            </div>
          </div>

          {/* --- RESULTS LIST --- */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Results ({data.length})
            </h3>
            <AnimatePresence mode="popLayout">
              {data.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="bg-orange-50 p-3 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{item.donor.fullName}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {item.organ.organType}
                          </span>
                          <span>•</span>
                          <span>{(item.distance / 1000).toFixed(1)} km away</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {data.length === 0 && !loading && (
              <div className="text-center py-10 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm">No donors found in this area yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* --- RIGHT COLUMN: MAP --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 h-[600px] lg:h-auto min-h-[500px] sticky top-8"
        >
          <div className="h-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white relative">
            <MapContainer center={mapCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <RecenterMap coords={{ lat: formData.lat, lng: formData.lng }} />

              {formData.lat && formData.lng && (
                <Marker position={[formData.lat, formData.lng]}>
                  <Popup>Hospital / Search Base</Popup>
                </Marker>
              )}

              {data.map((donor) => (
                <Marker
                  key={donor._id}
                  position={[
                    donor.donor.location?.coordinates[1],
                    donor.donor.location?.coordinates[0],
                  ]}
                >
                  <Popup>
                    <div className="p-2">
                      <p className="font-bold text-orange-600">{donor.donor.fullName}</p>
                      <p className="text-xs font-medium">Organ: {donor.organ.organType}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Map Overlay Badge */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-lg">
              <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Donor Database
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchDonations;