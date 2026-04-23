"use client";

import { useState, useRef, useEffect } from "react";
import { X, CreditCard, Banknote, Send, CheckCircle2, Image as ImageIcon, Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  cashPrice: string;   // e.g. "$160"
  cardPrice: string;   // e.g. "$166.40" (price + 4%)
  stripeLink: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  courseName,
  cashPrice,
  cardPrice,
  stripeLink,
}: PaymentModalProps) {
  const [step, setStep] = useState<"choose" | "zelle" | "done">("choose");
  const [form, setForm] = useState({ name: "", phone: "", reference: "" });
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Handle Lenis if present (it often uses data-lenis-prevent on the scrollable area)
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleClose() {
    setStep("choose");
    setForm({ name: "", phone: "", reference: "" });
    setScreenshot(null);
    setLoading(false);
    setError(null);
    onClose();
  }

  function handleCardPay() {
    window.open(stripeLink, "_blank", "noopener,noreferrer");
    handleClose();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleZelleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!screenshot) {
      setError("Please upload a screenshot of your Zelle payment");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payments/zelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          courseName,
          amount: parseFloat(cashPrice.replace("$", "")),
          screenshot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit payment");
      }

      setStep("done");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease" }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between border-b bg-[#05264d]">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
              Payment Options
            </p>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5 truncate">{courseName}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Note Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 sm:px-6 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[13px] sm:text-sm font-semibold text-amber-800">
            <Banknote className="w-4 h-4 shrink-0" />
            Cash (Zelle): <span className="text-green-700">{cashPrice}</span>
            <span className="text-amber-600 font-normal hidden sm:inline">— no extra fee</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] sm:text-sm font-semibold text-amber-800">
            <CreditCard className="w-4 h-4 shrink-0" />
            Card: <span className="text-[#d53033]">{cardPrice}</span>
            <span className="text-amber-600 font-normal hidden sm:inline">— Added 4% processing fee</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto" data-lenis-prevent>
          {/* STEP: Choose */}
          {step === "choose" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Choose your preferred payment method below.
              </p>
              {/* Cash / Zelle */}
              <button
                onClick={() => setStep("zelle")}
                className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border-2 border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Pay with Cash (Zelle)</p>
                  <p className="text-[12px] sm:text-sm text-gray-600">
                    Send <strong className="text-green-700">{cashPrice}</strong> to:
                    <span className="block text-green-700 font-bold break-all mt-0.5">
                      payments@exceedlearningcenterny.com
                    </span>
                  </p>
                </div>
              </button>

              {/* Card */}
              <button
                onClick={handleCardPay}
                className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#05264d] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-left min-w-0">
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Pay by Card (Stripe)</p>
                  <p className="text-[12px] sm:text-sm text-gray-600">
                    <strong className="text-[#d53033]">{cardPrice}</strong>{" "}
                    <span className="text-gray-500">(includes 4% fee)</span>
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* STEP: Zelle form */}
          {step === "zelle" && (
            <div>
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl text-xs sm:text-sm text-green-800">
                <p className="font-bold mb-1">How to pay via Zelle:</p>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Open your banking app and go to Zelle</li>
                  <li>
                    Send <strong>{cashPrice}</strong> to:
                    <span className="block font-black break-all mt-1 bg-white p-2 rounded-lg border border-green-200 text-center select-all cursor-pointer" title="Click to select">
                      payments@exceedlearningcenterny.com
                    </span>
                  </li>
                  <li>Note your reference number & take a screenshot</li>
                  <li>Fill in the form below to confirm enrollment</li>
                </ol>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleZelleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#05264d] uppercase tracking-wider ml-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#05264d] uppercase tracking-wider ml-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#05264d] uppercase tracking-wider ml-1">
                      Reference Number *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.reference}
                      onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                      placeholder="ZL123456789"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#05264d] uppercase tracking-wider ml-1">
                    Payment Screenshot *
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${screenshot ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {screenshot ? (
                      <div className="w-full aspect-video relative rounded-lg overflow-hidden border border-green-200">
                        <img src={screenshot} alt="Payment Screenshot" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs font-medium text-gray-600 text-center">
                          Click to upload payment screenshot
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("choose")}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? "Submitting..." : "Confirm Payment"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP: Done */}
          {step === "done" && (
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Payment Submitted!
              </h3>
              <p className="text-sm text-gray-600 mb-6 px-4">
                Thank you! We have received your payment
                details. Our team will verify it and send enrollment details
                shortly.
              </p>
              <button
                onClick={handleClose}
                className="px-10 py-3 rounded-xl bg-[#05264d] text-white font-bold text-sm hover:bg-[#05264d]/90 transition-colors shadow-lg shadow-blue-900/10"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
