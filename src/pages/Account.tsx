import React, { FormEvent } from "react";
import { UserAccount } from "../types";
import { User, CreditCard, ShieldAlert, MonitorPlay, Disc3 } from "lucide-react";

interface AccountProps {
  account: UserAccount;
  onUpdateAccount: (updates: Partial<UserAccount>) => void;
}

export default function Account({ account, onUpdateAccount }: AccountProps) {
  const handleLevelChange = (level: "Standard" | "Gold" | "Platinum") => {
    onUpdateAccount({ membershipLevel: level });
  };

  const handleUsernameChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("username") as string;
    if (newName.trim()) {
      onUpdateAccount({ username: newName.trim() });
      alert("Username profile updated!");
    }
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4">
        <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
          <User className="w-4 h-4 text-slate-700" />
          Subscriber Account Profile Manager
        </h2>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Manage your unlimited DVD renting plan and digital Watch Instantly (Beta) allocation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Left Side: Profile Information */}
        <div className="md:col-span-2 flex flex-col gap-4">
          
          {/* Subscriber details card */}
          <div className="border border-slate-300 p-4 rounded bg-slate-50">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3 uppercase flex items-center gap-1.5">
              <Disc3 className="w-4 h-4 text-red-700 animate-spin" style={{ animationDuration: "12s" }} />
              Current Membership Details
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Subscriber Email:</span>
                <strong className="text-slate-800">{account.email}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Member Since:</span>
                <strong className="text-slate-800">September 15, 2004</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Subscription Tier:</span>
                <strong className="text-red-800 uppercase font-bold">{account.membershipLevel} VIP Plan</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Current Billing Rate:</span>
                <strong className="text-slate-800">$17.99 / month (Unlimited DVD Rentals)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Rents In-transit:</span>
                <strong className="text-slate-800">3 DVDs Out (2 slots remaining)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Watch Instantly Limits:</span>
                <strong className="text-emerald-700">UNLIMITED BETA MINUTES</strong>
              </div>
            </div>
          </div>

          {/* Update Account Profile Form */}
          <div className="border border-slate-300 p-4 rounded bg-slate-50">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3 uppercase">
              Update Subscriber Profile
            </h3>
            <form onSubmit={handleUsernameChange} className="flex gap-2 text-xs">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Subscriber Nickname:</label>
                <input
                  id="account-username-input"
                  name="username"
                  type="text"
                  defaultValue={account.username}
                  placeholder="Enter a handle..."
                  className="bg-white border border-slate-400 p-2 rounded outline-none text-slate-800"
                />
              </div>
              <button
                id="account-update-btn"
                type="submit"
                className="self-end bg-gradient-to-b from-slate-100 to-slate-300 hover:from-white hover:to-slate-200 border border-slate-500 text-slate-800 font-bold px-4 py-2 rounded shadow cursor-pointer active:translate-y-px"
              >
                Apply Change
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Plan tiers and security */}
        <div className="flex flex-col gap-3">
          
          {/* Plan Tiers Upgrade */}
          <div className="border border-slate-300 p-3 rounded bg-white">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2 uppercase flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-blue-600" />
              Renting Plan Upgrades
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
              Upgrade your mailbox limit to receive more physical DVDs at once. Watch Instantly is always unlimited on all premium plans.
            </p>
            <div className="flex flex-col gap-2">
              {(["Standard", "Gold", "Platinum"] as const).map((tier) => {
                const active = account.membershipLevel === tier;
                return (
                  <button
                    id={`account-tier-${tier}`}
                    key={tier}
                    onClick={() => handleLevelChange(tier)}
                    className={`text-left p-2 border rounded cursor-pointer transition-all ${
                      active
                        ? "bg-red-50 border-red-500 text-red-950 font-bold"
                        : "bg-slate-50 border-slate-300 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span>{tier} VIP plan</span>
                      {active && <span className="bg-red-800 text-white text-[8px] font-bold px-1.5 py-0.2 rounded uppercase">Active</span>}
                    </div>
                    <span className="text-[9px] text-slate-500 block font-normal mt-0.5">
                      {tier === "Standard" ? "3 DVDs out at once. $14.99/mo" : tier === "Gold" ? "5 DVDs out at once. $17.99/mo" : "8 DVDs out at once. $23.99/mo"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secure DRM Alert */}
          <div className="border border-amber-300 p-3 rounded bg-amber-50 text-slate-700 text-[10px] leading-relaxed flex gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div>
              <strong>Security Protocol Warning:</strong> This stream and device are encrypted under Microsoft Media DRM licenses. Re-distribution of streaming feeds over shared P2P software (e.g. LimeWire, BitTorrent) is a felony under DMCA rules.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
