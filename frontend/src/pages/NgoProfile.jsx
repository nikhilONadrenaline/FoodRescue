import React from "react";
import { User, Mail, Phone, MapPin, Building2, Calendar } from "lucide-react";

export function NgoProfile() {
  const userDetails = {
    name: "Hope Foundation Shelter",
    type: "Non-Governmental Organization (NGO)",
    email: "contact@hopefoundation.org",
    phone: "+1 800 123 4567",
    address: "789 Relief Ave, Community District, City",
    joined: "January 2023",
    capacity: "Feeds approx. 200 people daily",
    registrationNo: "NGO-REG-2023-001"
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-theme-yellow border-4 border-black rounded-full mx-auto flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-4">
          <Building2 size={40} className="text-theme-ink" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-black text-theme-ink uppercase tracking-widest">{userDetails.name}</h1>
        <p className="text-theme-green-deep font-bold text-sm mt-1 px-3 py-1 bg-theme-green/20 inline-block border-2 border-black">{userDetails.type}</p>
      </div>

      <div className="bg-theme-cream border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">Organization Details</h2>
        
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <Mail className="mt-0.5 text-theme-ink" size={20} strokeWidth={2.5} />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-theme-ink/60">Email Address</p>
              <p className="font-bold text-theme-ink text-lg">{userDetails.email}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Phone className="mt-0.5 text-theme-ink" size={20} strokeWidth={2.5} />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-theme-ink/60">Phone Number</p>
              <p className="font-bold text-theme-ink text-lg">{userDetails.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <MapPin className="mt-0.5 text-theme-ink" size={20} strokeWidth={2.5} />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-theme-ink/60">Registered Address</p>
              <p className="font-bold text-theme-ink text-lg">{userDetails.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <User className="mt-0.5 text-theme-ink" size={20} strokeWidth={2.5} />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-theme-ink/60">Capacity</p>
              <p className="font-bold text-theme-ink text-lg">{userDetails.capacity}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Calendar className="mt-0.5 text-theme-ink" size={20} strokeWidth={2.5} />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-theme-ink/60">Joined Platform</p>
              <p className="font-bold text-theme-ink text-lg">{userDetails.joined}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-black flex justify-end">
          <button className="bg-theme-ink text-white border-2 border-black px-6 py-2.5 font-black uppercase tracking-widest text-sm hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(252,224,104,1)]">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
