"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Search, 
  LogOut, 
  Filter, 
  Phone, 
  CreditCard,
  User as UserIcon,
  ChevronRight,
  ExternalLink,
  Loader2,
  X
} from "lucide-react";

interface Payment {
  _id: string;
  name: string;
  phone: string;
  reference: string;
  courseName: string;
  amount: number;
  screenshot: string;
  status: "pending" | "verified" | "rejected";
  createdAt: string;
}

export default function AdminDashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      const response = await fetch("/api/admin/payments");
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to fetch payments");
      }
      const data = await response.json();
      setPayments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: "verified" | "rejected") {
    setUpdatingId(id);
    try {
      const response = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) throw new Error("Update failed");

      setPayments((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filteredPayments = payments.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: payments.length,
    pending: payments.filter((p) => p.status === "pending").length,
    verified: payments.filter((p) => p.status === "verified").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-navy animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-900">
      {/* Sidebar/Header */}
      <nav className="bg-white border-b border-brand-navy/5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-white rounded-xl border border-brand-navy/5 shadow-sm">
                <Image
                  src="/exceed-logo.png"
                  alt="Logo"
                  width={40}
                  height={45}
                  className="w-10 h-auto"
                />
              </div>
              <div>
                <h1 className="text-sm font-black text-brand-navy tracking-tight uppercase">Admin Dashboard</h1>
                <p className="text-[10px] font-bold text-brand-red uppercase tracking-widest">Exceed Learning Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-slate-400 hover:text-brand-red uppercase tracking-widest transition-colors bg-slate-50 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Submissions", value: stats.total, icon: Filter, color: "brand-navy" },
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "brand-gold" },
            { label: "Verified Payments", value: stats.verified, icon: CheckCircle, color: "brand-red" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-brand-navy/5 shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 shadow-inner`}>
                <stat.icon className={`w-7 h-7 ${
                  stat.color === 'brand-navy' ? 'text-brand-navy' : 
                  stat.color === 'brand-gold' ? 'text-brand-gold' : 
                  'text-brand-red'
                }`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-brand-navy">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-3xl border border-brand-navy/5 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, reference, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-brand-navy rounded-2xl outline-none transition-all font-medium text-sm"
            />
          </div>
          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl w-full md:w-auto">
            {["all", "pending", "verified", "rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === s 
                    ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/10" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table/Grid */}
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-100">
              <p className="text-slate-400 font-bold uppercase tracking-widest">No payments found</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div 
                key={payment._id}
                className="bg-white rounded-3xl border border-brand-navy/5 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Image Preview */}
                  <div 
                    onClick={() => setSelectedImage(payment.screenshot)}
                    className="w-full lg:w-48 h-32 bg-slate-100 rounded-2xl overflow-hidden relative cursor-zoom-in group-hover:shadow-lg transition-all"
                  >
                    <img src={payment.screenshot} alt="Screenshot" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-black text-lg text-brand-navy mb-1 flex items-center gap-2">
                        {payment.name}
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          payment.status === 'pending' ? 'bg-brand-gold/10 text-brand-gold' :
                          payment.status === 'verified' ? 'bg-brand-red/10 text-brand-red' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {payment.status}
                        </span>
                      </h3>
                      <p className="text-sm font-bold text-brand-red/80 mb-2 uppercase tracking-wide">{payment.courseName}</p>
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(payment.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> ${payment.amount}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <Phone className="w-4 h-4 text-slate-300" />
                        {payment.phone}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <ExternalLink className="w-4 h-4 text-slate-300" />
                        Ref: {payment.reference}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 lg:justify-end">
                      {payment.status === "pending" ? (
                        <>
                          <button
                            disabled={updatingId === payment._id}
                            onClick={() => updateStatus(payment._id, "rejected")}
                            className="flex-1 lg:flex-none px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-red hover:bg-red-50 border-2 border-transparent hover:border-red-100 transition-all flex items-center justify-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                          <button
                            disabled={updatingId === payment._id}
                            onClick={() => updateStatus(payment._id, "verified")}
                            className="flex-1 lg:flex-none px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-brand-navy text-white shadow-lg shadow-brand-navy/10 hover:bg-brand-navy/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          >
                            {updatingId === payment._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                            Verify
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                          {payment.status === "verified" ? <CheckCircle className="w-4 h-4 text-brand-red" /> : <XCircle className="w-4 h-4" />}
                          Payment {payment.status}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/95 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-brand-gold transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
            >
              Close <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage} 
              alt="Payment Full" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-3xl shadow-2xl border-4 border-white/10" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
