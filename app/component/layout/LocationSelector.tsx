'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react'; // optional icon

const cities = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Moneragala', 'Nuwara Eliya', 'Polonnaruwa',
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya', 'Other',
  'Dehiwala', 'Moratuwa', 'Negombo', 'Panadura', 'Kalmunai',
  'Baddegama', 'Bentota', 'Horana', 'Bandarawela', 'Haputale',
  'Balangoda', 'Dickwella', 'Talawakele', 'Hatton', 'Wattala',
  'Weligama', 'Koggala', 'Elpitiya', 'Beruwala', 'Ifthikhar Nagar',
  'Akurana', 'Dambulla', 'Habarana', 'Katunayake', 'Seeduwa',
  'Pannala', 'Kuliyapitiya', 'Chilaw', 'Mannar Town', 'Mulativu',
  'Valvettithurai', 'Point Pedro', 'Puliyankulam', 'Kalpitiya',
  'Udugampola', 'Minuwangoda', 'Giriulla', 'Mahiyanganaya',
  'Akkaraipattu', 'Kalmunai Town', 'Beragala', 'Nawalapitiya',
  'Hatton Town', 'Rathnapura Town', 'Balangoda Town', 'Avissawella',
  'Peliyagoda', 'Kadawatha', 'Kiribathgoda', 'Kelaniya', 'Malabe',
  'Kaduwela', 'Thalawathugoda', 'Homagama', 'Padukka', 'Mawanella',
  'Polgahawela', 'Kegalle Town', 'Melsiripura', 'Ambalangoda',
  'Hikkaduwa', 'Morawaka', 'Rakwana', 'Deniyaya', 'Ahungalla',
  'Katuwana', 'Madampe', 'Chilaw Town', 'Puttalam Town',
  'Kilinochchi Town', 'Vavuniya Town', 'Trincomalee Town',
  'Muttur', 'Batticaloa Town', 'Kalmunai East', 'Kalmunai West',
  'Kinniya', 'Eravur', 'Chenkalady', 'Chavakachcheri', 'Jaffna Town',
  'Tellippalai', 'Valvettithurai Town', 'Karainagar', 'Kayts',
  'Other'
];

export default function LocationSelector() {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Selected City');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
      >
        <MapPin size={16} />
        {selectedCity}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="max-h-60 overflow-auto">
            {cities.map((city, index) => (
              <li
                key={`${city}-${index}`}
                onClick={() => {
                  setSelectedCity(city);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer border-b last:border-none"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
