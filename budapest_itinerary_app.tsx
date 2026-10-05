import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Clock, CreditCard, Info, Map, List, Home, Calendar, 
  CheckCircle, Circle, Heart, ChevronDown, ChevronUp, Navigation,
  Coffee, Utensils, Camera, Star, Train, Bus, Info as InfoIcon,
  Download, ArrowRight, Check, X, Shield, Wifi, Smartphone
} from 'lucide-react';

const BUDAPEST_DATA = {
  destination: "Budapest",
  duration: "4 Days · 3 Nights",
  tagline: "A practical DIY itinerary for exploring Budapest at your own pace.",
  price: "€25",
  overview: {
    period: "May - September (Ideal)",
    budget: "€60 - €100 / day",
    area: "District V (Pest) or District I (Buda)",
    transport: "Walking, Metro, Tram 2",
    currency: "Hungarian Forint (HUF)",
    language: "Hungarian (English widely spoken)",
    apps: "BudapestGO, Bolt, Google Maps"
  },
  days: [
    {
      id: 1,
      title: "Arrival + Budapest City Centre",
      description: "Get your bearings in Pest, featuring iconic architecture and riverside views.",
      activities: [
        {
          id: "d1-a1",
          time: "10:00 AM",
          type: "⭐ Must-see",
          name: "Hungarian Parliament Building",
          description: "Stunning Gothic Revival architecture. Walk around Kossuth Square to admire the details.",
          location: "Kossuth Lajos tér 1-3",
          duration: "1.5 hours",
          cost: "€15 (interior tour)",
          transport: "🚇 Metro M2 to Kossuth Lajos tér",
          travelTime: "15 mins from central hotels",
          tips: "If you want to go inside, you MUST book weeks in advance online. The exterior is arguably better.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Hungarian+Parliament+Building",
          food: null
        },
        {
          id: "d1-a2",
          time: "11:45 AM",
          type: "📸 Photo spot",
          name: "Shoes on the Danube Bank",
          description: "A moving memorial to the victims of the Holocaust. Located right on the riverbank.",
          location: "Id. Antall József rkp.",
          duration: "30 mins",
          cost: "💰 Free",
          transport: "🚶 5 min walk south from Parliament",
          travelTime: "5 mins",
          tips: "Be respectful, it is a memorial site.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Shoes+on+the+Danube+Bank",
          food: {
            time: "LUNCH",
            name: "Kiskakukk Étterem",
            distance: "10 min walk",
            cost: "€€",
            specialty: "Goulash & Duck",
            mapLink: "https://www.google.com/maps/dir/?api=1&destination=Kiskakukk"
          }
        },
        {
          id: "d1-a3",
          time: "02:00 PM",
          type: "⭐ Must-see",
          name: "St. Stephen's Basilica",
          description: "The most important church in Hungary. You can climb to the dome for panoramic views.",
          location: "Szent István tér 1",
          duration: "1 hour",
          cost: "€3 (Entry) + €6 (Dome)",
          transport: "🚶 15 min walk from the river",
          travelTime: "15 mins",
          tips: "Knees and shoulders should be covered.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=St.+Stephens+Basilica",
          food: {
            time: "SNACK",
            name: "Gelarto Rosa",
            distance: "1 min walk",
            cost: "€",
            specialty: "Rose-shaped artisanal gelato",
            mapLink: "https://www.google.com/maps/dir/?api=1&destination=Gelarto+Rosa"
          }
        },
        {
          id: "d1-a4",
          time: "04:30 PM",
          type: "🚶 Walking",
          name: "Váci Street & Chain Bridge",
          description: "Stroll down the famous pedestrian shopping street and head towards the iconic Chain Bridge at sunset.",
          location: "Váci utca",
          duration: "2 hours",
          cost: "💰 Free",
          transport: "🚶 Walking",
          travelTime: "10 mins",
          tips: "Avoid eating on Váci Street itself as it can be a tourist trap. Walk here for the atmosphere.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Széchenyi+Chain+Bridge",
          food: null
        }
      ]
    },
    {
      id: 2,
      title: "Buda Castle & The Hills",
      description: "Explore the historic and hilly Buda side with fairytale views.",
      activities: [
        {
          id: "d2-a1",
          time: "09:00 AM",
          type: "⭐ Must-see",
          name: "Fisherman's Bastion",
          description: "Fairytale-like towers with the best panoramic views of the Parliament and Pest side.",
          location: "Szentháromság tér",
          duration: "1.5 hours",
          cost: "€3 (upper terraces, free otherwise)",
          transport: "🚌 Bus 16 from Deák Ferenc tér",
          travelTime: "20 mins",
          tips: "Arrive before 9 AM to avoid the massive crowds and get perfect photos.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Fishermans+Bastion",
          food: null
        },
        {
          id: "d2-a2",
          time: "10:30 AM",
          type: "📸 Photo spot",
          name: "Matthias Church",
          description: "A stunning neo-Gothic church with a unique, colorful tiled roof.",
          location: "Szentháromság tér 2",
          duration: "45 mins",
          cost: "€5",
          transport: "🚶 Next to Fisherman's Bastion",
          travelTime: "1 min",
          tips: "Buy tickets online to skip the queue.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Matthias+Church",
          food: {
            time: "LUNCH",
            name: "Ruszwurm Cukrászda",
            distance: "3 min walk",
            cost: "€€",
            specialty: "Historic cafe, famous cream pastry (Krémes)",
            mapLink: "https://www.google.com/maps/dir/?api=1&destination=Ruszwurm"
          }
        },
        {
          id: "d2-a3",
          time: "01:00 PM",
          type: "🚶 Walking",
          name: "Buda Castle Complex",
          description: "Walk the grounds of the historical palace complex. Excellent views and grand courtyards.",
          location: "Szent György tér 2",
          duration: "2 hours",
          cost: "💰 Free (Grounds)",
          transport: "🚶 10 min walk from Matthias Church",
          travelTime: "10 mins",
          tips: "You don't need to pay to enter the museums inside unless you have a specific interest in Hungarian art/history.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Buda+Castle",
          food: null
        }
      ]
    },
    {
      id: 3,
      title: "Thermal Baths & Heroes' Square",
      description: "Relaxation and grandeur in the City Park area.",
      activities: [
        {
          id: "d3-a1",
          time: "09:00 AM",
          type: "⭐ Must-see",
          name: "Széchenyi Thermal Bath",
          description: "The iconic yellow outdoor thermal baths. A classic Budapest experience.",
          location: "Állatkerti krt. 9-11",
          duration: "3 hours",
          cost: "€25",
          transport: "🚇 Metro M1 to Széchenyi fürdő",
          travelTime: "15 mins",
          tips: "Bring your own towel and flip flops to save rental fees. Go early!",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Szechenyi+Bath",
          food: null
        },
        {
          id: "d3-a2",
          time: "01:00 PM",
          type: "📸 Photo spot",
          name: "Heroes' Square & Vajdahunyad Castle",
          description: "Monumental square and a quirky castle showcasing different architectural styles of Hungary.",
          location: "Hősök tere",
          duration: "1.5 hours",
          cost: "💰 Free",
          transport: "🚶 5 min walk from the baths",
          travelTime: "5 mins",
          tips: "Great spot for photos. The castle is right behind the square.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Heroes+Square",
          food: {
            time: "LUNCH",
            name: "Paprika Vendéglő",
            distance: "10 min walk",
            cost: "€€",
            specialty: "Traditional huge portions of Hungarian food",
            mapLink: "https://www.google.com/maps/dir/?api=1&destination=Paprika+Vendeglo"
          }
        }
      ]
    },
    {
      id: 4,
      title: "Jewish Quarter & Markets",
      description: "History, street food, and vibrant culture.",
      activities: [
        {
          id: "d4-a1",
          time: "10:00 AM",
          type: "⭐ Must-see",
          name: "Dohány Street Synagogue",
          description: "The largest synagogue in Europe. Beautiful architecture and a moving memorial garden.",
          location: "Dohány u. 2",
          duration: "1.5 hours",
          cost: "€22",
          transport: "🚇 Metro M2 to Astoria",
          travelTime: "10 mins",
          tips: "Security is strict. Modest dress required. Guided tour is included in the ticket.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Dohany+Street+Synagogue",
          food: null
        },
        {
          id: "d4-a2",
          time: "12:00 PM",
          type: "🍴 Food",
          name: "Central Market Hall",
          description: "Massive indoor market. Ground floor for produce/spices, top floor for street food and souvenirs.",
          location: "Vámház krt. 1-3",
          duration: "1.5 hours",
          cost: "💰 Free entry",
          transport: "🚶 15 min walk or Tram 47/49",
          travelTime: "15 mins",
          tips: "Buy Paprika here. Top floor gets very crowded, watch your belongings.",
          mapLink: "https://www.google.com/maps/dir/?api=1&destination=Central+Market+Hall",
          food: {
            time: "LUNCH",
            name: "Market Food Stalls",
            distance: "0 min",
            cost: "€",
            specialty: "Lángos, Sausages, Goulash",
            mapLink: null
          }
        }
      ]
    }
  ]
};

const PRACTICAL_INFO = {
  currency: "Hungarian Forint (HUF). €1 ≈ 390 HUF. Cards are accepted 95% of the time. Have ~10,000 HUF cash just in case.",
  transport: "Public transport is excellent. Download the 'BudapestGO' app. Validate paper tickets before boarding!",
  safety: "Very safe, but beware of pickpockets in crowded areas (e.g., tram 2, markets).",
  etiquette: "Don't clink beer glasses (historical tradition). Do say 'Köszönöm' (Thank you)."
};

const PRE_TRIP_CHECKLIST = [
  { id: 'c1', label: 'Passport & ID' },
  { id: 'c2', label: 'Travel insurance' },
  { id: 'c3', label: 'Download BudapestGO app' },
  { id: 'c4', label: 'Download offline Google Map of Budapest' },
  { id: 'c5', label: 'Comfortable walking shoes (Lots of cobblestones!)' },
  { id: 'c6', label: 'Swimsuit & flip flops (for thermal baths)' },
  { id: 'c7', label: 'European power adapter (Type C/F)' }
];


// Elegant, minimal button component
const Button = ({ children, variant = 'primary', className = '', onClick, fullWidth = false }) => {
  const base = "font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 px-6 py-3";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-gray-200 text-gray-900 hover:border-gray-900",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
  };
  const width = fullWidth ? "w-full" : "w-auto";
  
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${width} ${className}`}>
      {children}
    </button>
  );
};

// Icon matcher for activity types
const getTypeIcon = (type) => {
  if (type.includes("Must-see")) return <Star className="w-4 h-4 text-amber-500" />;
  if (type.includes("Photo")) return <Camera className="w-4 h-4 text-blue-500" />;
  if (type.includes("Walking")) return <MapPin className="w-4 h-4 text-emerald-500" />;
  if (type.includes("Food")) return <Utensils className="w-4 h-4 text-orange-500" />;
  return <MapPin className="w-4 h-4 text-gray-500" />;
};

export default function App() {
  const [view, setView] = useState('product'); // product, overview, today, itinerary, map, budget, more
  const [activeDay, setActiveDay] = useState(1);
  const [checklist, setChecklist] = useState({});
  const [activityStatus, setActivityStatus] = useState({});
  const [currency, setCurrency] = useState('EUR'); // EUR, USD, HUF
  const [offlineSaved, setOfflineSaved] = useState(false);

  // Currency multiplier relative to EUR
  const rates = { EUR: 1, USD: 1.08, HUF: 395 };
  const formatMoney = (amount) => {
    const converted = amount * rates[currency];
    if (currency === 'HUF') return `${Math.round(converted).toLocaleString()} HUF`;
    if (currency === 'USD') return `$${converted.toFixed(2)}`;
    return `€${converted.toFixed(2)}`;
  };

  const toggleChecklist = (id) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateActivityStatus = (id, statusType) => { // statusType: 'visited', 'favourite'
    setActivityStatus(prev => {
      const current = prev[id] || {};
      return { ...prev, [id]: { ...current, [statusType]: !current[statusType] } };
    });
  };

  const handlePurchase = () => {
    // In reality, this would open WhatsApp or a checkout page.
    window.open('https://wa.me/00000000000?text=I%20want%20to%20get%20the%20Budapest%20DIY%20Itinerary', '_blank');
  };

  const unlockApp = () => {
    setView('overview');
  };

  const renderProductPage = () => (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Image (Using Unsplash) */}
      <div className="h-[60vh] w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Budapest Parliament" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white max-w-4xl mx-auto">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium tracking-wide border border-white/30 uppercase">
            DIY Itinerary
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-4 mb-2">{BUDAPEST_DATA.destination}</h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">{BUDAPEST_DATA.duration}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="md:grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-2xl font-light leading-relaxed text-gray-800 mb-8">
              {BUDAPEST_DATA.tagline}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mobile Companion</h3>
                  <p className="text-gray-600 mt-1">Navigate seamlessly with a built-in "Today" mode and interactive maps. No app download required.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Wifi className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Offline Ready</h3>
                  <p className="text-gray-600 mt-1">Save the entire itinerary to your device. Never worry about roaming data while exploring the city.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Curated & Tested</h3>
                  <p className="text-gray-600 mt-1">No fluff. Just practical routing, avoiding tourist traps, and realistic travel times.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 mt-10 md:mt-0 sticky top-8 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Instant Access</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold">{BUDAPEST_DATA.price}</span>
              <span className="text-gray-500 pb-1">one-time</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <Check className="w-5 h-5 text-green-500" /> Day-by-day practical schedule
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Check className="w-5 h-5 text-green-500" /> Integrated Google Maps routing
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Check className="w-5 h-5 text-green-500" /> Food & restaurant recommendations
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <Check className="w-5 h-5 text-green-500" /> Budget calculator & checklists
              </li>
            </ul>

            <Button onClick={handlePurchase} fullWidth className="mb-4 text-lg py-4">
              Get Itinerary via WhatsApp
            </Button>
            <Button onClick={unlockApp} variant="outline" fullWidth>
              Preview App Experience
            </Button>
            <p className="text-center text-sm text-gray-400 mt-4">Secure payment. Instant digital access.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="animate-in fade-in duration-500">
      <div className="bg-gray-900 text-white rounded-[2rem] p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <h1 className="text-3xl font-bold mb-2">{BUDAPEST_DATA.destination}</h1>
        <p className="text-gray-300 mb-8">{BUDAPEST_DATA.duration}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Budget</p>
            <p className="font-medium">{BUDAPEST_DATA.overview.budget}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Currency</p>
            <p className="font-medium">{BUDAPEST_DATA.overview.currency}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Transport</p>
            <p className="font-medium">{BUDAPEST_DATA.overview.transport}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Best Apps</p>
            <p className="font-medium">{BUDAPEST_DATA.overview.apps}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Button onClick={() => { setActiveDay(1); setView('today'); }} className="flex-1 py-4 text-lg">
          Start Day 1
        </Button>
        <Button onClick={() => {
            setOfflineSaved(true);
            setTimeout(() => setOfflineSaved(false), 3000);
          }} 
          variant="secondary" 
          className="py-4"
        >
          {offlineSaved ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Download className="w-5 h-5" />}
          {offlineSaved ? "Saved to device" : "Save for Offline"}
        </Button>
      </div>

      <h2 className="text-xl font-bold mb-4">Trip Summary</h2>
      <div className="space-y-4">
        {BUDAPEST_DATA.days.map((day) => (
          <div key={day.id} onClick={() => { setActiveDay(day.id); setView('today'); }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between group">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Day {day.id}</p>
              <h3 className="font-bold text-lg group-hover:text-gray-600 transition-colors">{day.title}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => {
    const isVisited = activityStatus[activity.id]?.visited;
    const isFav = activityStatus[activity.id]?.favourite;

    return (
      <div className={`relative pl-8 pb-8 ${isVisited ? 'opacity-60' : ''} transition-opacity duration-300`}>
        {/* Timeline Line */}
        <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gray-100"></div>
        {/* Timeline Dot */}
        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center ${isVisited ? 'bg-green-500' : 'bg-gray-900'}`}></div>

        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider mb-3 flex items-center gap-1.5 w-fit">
                {getTypeIcon(activity.type)} {activity.time}
              </span>
              <h3 className="text-xl font-bold">{activity.name}</h3>
            </div>
            
            {/* Action Toggles */}
            <div className="flex gap-2">
              <button onClick={() => updateActivityStatus(activity.id, 'favourite')} className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button onClick={() => updateActivityStatus(activity.id, 'visited')} className="p-2 rounded-full hover:bg-green-50 text-gray-400 hover:text-green-500 transition-colors">
                <CheckCircle className={`w-5 h-5 ${isVisited ? 'fill-green-500 text-green-500' : ''}`} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase">Duration</p>
                <p className="text-sm font-medium">{activity.duration}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase">Est. Cost</p>
                <p className="text-sm font-medium">{activity.cost}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 col-span-2 bg-gray-50 p-3 rounded-xl">
              <Navigation className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Transport:</span> {activity.transport} <span className="text-gray-400">({activity.travelTime})</span></p>
              </div>
            </div>
          </div>

          {activity.tips && (
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex gap-3 mb-6">
              <InfoIcon className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-900 leading-relaxed">{activity.tips}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" className="py-2.5 px-4 text-sm" onClick={() => window.open(activity.mapLink, '_blank')}>
              <MapPin className="w-4 h-4" /> Open in Maps
            </Button>
          </div>

          {/* Integrated Food Recommendation */}
          {activity.food && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Coffee className="w-4 h-4" /> Nearby {activity.food.time} Recommendation
              </h4>
              <div className="flex items-center justify-between bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <div>
                  <p className="font-bold text-gray-900">{activity.food.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.food.distance} • {activity.food.cost} • {activity.food.specialty}</p>
                </div>
                {activity.food.mapLink && (
                  <button onClick={() => window.open(activity.food.mapLink, '_blank')} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 border border-gray-200">
                    <Navigation className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTodayView = () => {
    const dayData = BUDAPEST_DATA.days.find(d => d.id === activeDay);
    if (!dayData) return null;

    const totalActs = dayData.activities.length;
    const completedActs = dayData.activities.filter(a => activityStatus[a.id]?.visited).length;
    const progress = Math.round((completedActs / totalActs) * 100) || 0;

    return (
      <div className="animate-in slide-in-from-right-4 duration-300">
        
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {BUDAPEST_DATA.days.map(d => (
            <button 
              key={d.id}
              onClick={() => setActiveDay(d.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                activeDay === d.id 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Day {d.id}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Your Day</p>
              <h2 className="text-2xl font-bold">{dayData.title}</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-light text-gray-900">{progress}%</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="mt-8">
          {dayData.activities.map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      </div>
    );
  };

  const renderItineraryView = () => (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold mb-6">Complete Itinerary</h2>
      <div className="space-y-6">
        {BUDAPEST_DATA.days.map((day) => (
          <div key={day.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Day {day.id}</p>
                <h3 className="font-bold text-lg">{day.title}</h3>
              </div>
              <Button variant="secondary" onClick={() => { setActiveDay(day.id); setView('today'); }}>
                View Day
              </Button>
            </div>
            <div className="space-y-4">
              {day.activities.map(act => (
                <div key={act.id} className="flex gap-4 items-start p-4 rounded-2xl bg-gray-50">
                  <span className="text-sm font-bold w-20 shrink-0 text-gray-500">{act.time}</span>
                  <div>
                    <p className="font-bold text-gray-900">{act.name}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMapView = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interactive Map</h2>
        <Button variant="outline" className="py-2 text-sm" onClick={() => window.open('https://maps.google.com/maps?q=Budapest', '_blank')}>
          Open Google Maps
        </Button>
      </div>
      <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm flex-1 relative overflow-hidden min-h-[60vh]">
        {/* Using a generic google maps iframe embed for realistic map look without API key */}
        <iframe 
          title="Budapest Map"
          width="100%" 
          height="100%" 
          style={{ border: 0, borderRadius: '1.5rem' }}
          loading="lazy" 
          allowFullScreen 
          src={`https://maps.google.com/maps?q=Budapest,${BUDAPEST_DATA.days[activeDay-1]?.activities[0]?.name || 'Hungary'}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
        
        {/* Overlay Day Selector */}
        <div className="absolute top-6 left-6 right-6">
           <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-lg flex gap-2 overflow-x-auto scrollbar-hide border border-white/20">
             {BUDAPEST_DATA.days.map(d => (
                <button 
                  key={d.id}
                  onClick={() => setActiveDay(d.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium text-sm transition-colors flex-1 ${
                    activeDay === d.id 
                      ? 'bg-gray-900 text-white' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  Day {d.id}
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderBudgetView = () => (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Budget Calculator</h2>
        <div className="bg-gray-100 rounded-full p-1 flex">
          {['EUR', 'USD', 'HUF'].map(c => (
            <button 
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${currency === c ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-3xl p-8 mb-8">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Estimated Total</p>
        <p className="text-5xl font-light">{formatMoney(450)}</p>
        <p className="text-gray-400 mt-2 text-sm">Based on 1 person for 4 days</p>
      </div>

      <div className="space-y-4">
        {[
          { category: "Accommodation (3 Nights)", est: 180, icon: <Home className="w-5 h-5 text-indigo-500" /> },
          { category: "Food & Drinks", est: 140, icon: <Utensils className="w-5 h-5 text-orange-500" /> },
          { category: "Attractions & Entry Fees", est: 80, icon: <Camera className="w-5 h-5 text-pink-500" /> },
          { category: "Local Transport", est: 25, icon: <Train className="w-5 h-5 text-blue-500" /> },
          { category: "Misc / Shopping", est: 25, icon: <CreditCard className="w-5 h-5 text-green-500" /> }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <p className="font-medium text-gray-900">{item.category}</p>
            </div>
            <p className="font-bold text-gray-600">{formatMoney(item.est)}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
        <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Note:</strong> This is a baseline estimate. Flight/train tickets to Budapest are not included. Tipping is generally 10% in restaurants if service charge is not already included on the bill.
        </p>
      </div>
    </div>
  );

  const renderMoreView = () => (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold mb-6">Pre-Trip Checklist</h2>
      <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm mb-10">
        {PRE_TRIP_CHECKLIST.map((item) => (
          <div 
            key={item.id} 
            onClick={() => toggleChecklist(item.id)}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer rounded-2xl transition-colors"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${checklist[item.id] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
              {checklist[item.id] && <Check className="w-4 h-4 text-white" />}
            </div>
            <p className={`font-medium transition-all ${checklist[item.id] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Know Before You Go</h2>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2"><CreditCard className="w-5 h-5 text-gray-400" /> Currency & Payments</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{PRACTICAL_INFO.currency}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2"><Bus className="w-5 h-5 text-gray-400" /> Getting Around</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{PRACTICAL_INFO.transport}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-gray-400" /> Safety</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{PRACTICAL_INFO.safety}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2"><InfoIcon className="w-5 h-5 text-gray-400" /> Local Etiquette</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{PRACTICAL_INFO.etiquette}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-200">
      
      {/* View routing logic */}
      {view === 'product' ? (
        renderProductPage()
      ) : (
        <div className="pb-24 md:pb-12 pt-6 md:pt-12 px-4 md:px-8 max-w-6xl mx-auto">
          
          {/* Header for App mode */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">{BUDAPEST_DATA.destination}</h1>
              <p className="text-xs text-gray-500">DIY Itinerary</p>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
              {[
                { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
                { id: 'today', label: 'Today', icon: <Calendar className="w-4 h-4" /> },
                { id: 'itinerary', label: 'Itinerary', icon: <List className="w-4 h-4" /> },
                { id: 'map', label: 'Map', icon: <Map className="w-4 h-4" /> },
                { id: 'budget', label: 'Budget', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'more', label: 'More', icon: <Info className="w-4 h-4" /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    view === item.id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setView('product')} className="px-2">
                <X className="w-6 h-6" />
              </Button>
            </div>
          </header>

          {/* Desktop Two-Column Layout Container */}
          <div className="md:grid md:grid-cols-12 md:gap-10 items-start">
            
            {/* Main Content Column */}
            <main className="md:col-span-7 lg:col-span-8">
              {view === 'overview' && renderOverview()}
              {view === 'today' && renderTodayView()}
              {view === 'itinerary' && renderItineraryView()}
              {view === 'map' && renderMapView()}
              {view === 'budget' && renderBudgetView()}
              {view === 'more' && renderMoreView()}
            </main>

            {/* Sticky Sidebar for Desktop ONLY */}
            <aside className="hidden md:block md:col-span-5 lg:col-span-4 sticky top-8 space-y-6">
              
              {/* Mini Map Snippet */}
              <div className="bg-white rounded-3xl p-2 border border-gray-100 shadow-sm h-64 overflow-hidden relative group cursor-pointer" onClick={() => setView('map')}>
                 <iframe 
                    title="Sidebar Map"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, borderRadius: '1.5rem', pointerEvents: 'none' }}
                    src={`https://maps.google.com/maps?q=Budapest&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow-md text-sm flex items-center gap-2">
                      <Map className="w-4 h-4" /> Expand Map
                    </span>
                  </div>
              </div>

              {/* Trip Quick Stats */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Trip Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">4 Days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Activities Completed</span>
                    <span className="font-medium text-gray-900">
                      {Object.values(activityStatus).filter(s => s.visited).length} / 11
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Budget Estimate</span>
                    <span className="font-medium text-gray-900">{formatMoney(450)}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Button variant="outline" fullWidth onClick={() => setView('budget')}>View Budget</Button>
                </div>
              </div>
            </aside>

          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation (Sticky) */}
      {view !== 'product' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 pb-safe pt-2 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
          <div className="flex justify-between max-w-md mx-auto relative">
            {[
              { id: 'overview', icon: <Home className="w-6 h-6" />, label: 'Home' },
              { id: 'today', icon: <Calendar className="w-6 h-6" />, label: 'Today' },
              { id: 'itinerary', icon: <List className="w-6 h-6" />, label: 'Itinerary' },
              { id: 'map', icon: <Map className="w-6 h-6" />, label: 'Map' },
              { id: 'budget', icon: <CreditCard className="w-6 h-6" />, label: 'Budget' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center p-2 min-w-[64px] transition-colors duration-200 ${
                  view === item.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`${view === item.id ? 'scale-110' : 'scale-100'} transition-transform duration-200 mb-1`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

    </div>
  );
}