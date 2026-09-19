"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";

export default function CartCheckout({ dict, lang, cartItems, total }: { dict: any; lang: string; cartItems: any[]; total: number }) {
  const isRtl = lang === "ar";
  const dispatch = useDispatch();
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Open a blank window synchronously on user click to bypass popup blockers
    const whatsappWindow = window.open('about:blank', '_blank');
    
    try {
      const formData = new FormData();
      formData.append("name", deliveryInfo.name);
      formData.append("phone", deliveryInfo.phone);
      formData.append("email", deliveryInfo.email);
      formData.append("password", deliveryInfo.password);
      formData.append("address", deliveryInfo.address);
      
      // We don't send the raw blob URLs in JSON, we will replace them on the server side
      formData.append("cartData", JSON.stringify(cartItems));

      // Fetch blobs and append to FormData
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        
        if (item.backgroundImage && item.backgroundImage.startsWith('blob:')) {
          const res = await fetch(item.backgroundImage);
          const blob = await res.blob();
          formData.append(`bg_${i}`, blob, `bg_${i}.jpg`);
        }
        
        if (item.profilePhotos && item.profilePhotos.length > 0) {
          for (let p = 0; p < item.profilePhotos.length; p++) {
            const photoUrl = item.profilePhotos[p];
            if (photoUrl.startsWith('blob:')) {
              const res = await fetch(photoUrl);
              const blob = await res.blob();
              formData.append(`photo_${i}_${p}`, blob, `photo_${i}_${p}.jpg`);
            }
          }
        }
      }

      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Build WhatsApp message
        let text = `*New Order!*\n\n`;
        text += `*Customer Info:*\n`;
        text += `Name: ${deliveryInfo.name}\n`;
        text += `Phone: ${deliveryInfo.phone}\n`;
        text += `Email: ${deliveryInfo.email}\n`;
        text += `Address: ${deliveryInfo.address}\n\n`;
        
        text += `*Order Details:*\n`;
        cartItems.forEach((item, i) => {
          text += `${i + 1}. ${(item.productName || item.name || "ITEM").toUpperCase()}\n`;
        });
        
        text += `\n*Total: ${total} EGP*\n`;
        
        const whatsappUrl = `https://wa.me/201094743313?text=${encodeURIComponent(text)}`;
        
        if (whatsappWindow) {
          whatsappWindow.location.href = whatsappUrl;
        } else {
          window.open(whatsappUrl, "_blank");
        }
        
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        
        // Redirect the main window back to the home page
        window.location.href = `/${lang}`;
      } else {
        if (whatsappWindow) whatsappWindow.close();
        toast.error("Failed to place order. Ensure the dashboard server is running.");
      }
    } catch (error) {
      console.error(error);
      if (whatsappWindow) whatsappWindow.close();
      toast.error("Error placing order. Ensure the dashboard server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-6 shadow-[8px_8px_0px_0px_var(--text-primary)] sticky top-32">
      <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b-4 border-[var(--text-primary)] pb-4">
        {dict.cart.deliveryTitle}
      </h2>
      
      <form onSubmit={handleCheckout} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="deliveryName" className="block text-sm font-bold uppercase tracking-wider">
            {dict.cart.deliveryName}
          </label>
          <input
            id="deliveryName"
            type="text"
            required
            className="w-full bg-white border-2 border-[var(--text-primary)] py-3 px-4 text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all"
            value={deliveryInfo.name}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryPhone" className="block text-sm font-bold uppercase tracking-wider">
            {dict.cart.deliveryPhone}
          </label>
          <input
            id="deliveryPhone"
            type="tel"
            required
            className="w-full bg-white border-2 border-[var(--text-primary)] py-3 px-4 text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all"
            value={deliveryInfo.phone}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryEmail" className="block text-sm font-bold uppercase tracking-wider">
            {dict.cart?.deliveryEmail || "Email (For Digital Profile)"}
          </label>
          <input
            id="deliveryEmail"
            type="email"
            required
            className="w-full bg-white border-2 border-[var(--text-primary)] py-3 px-4 text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all"
            value={deliveryInfo.email || ""}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryPassword" className="block text-sm font-bold uppercase tracking-wider">
            {dict.cart?.deliveryPassword || "Password (For Digital Profile)"}
          </label>
          <input
            id="deliveryPassword"
            type="password"
            required
            className="w-full bg-white border-2 border-[var(--text-primary)] py-3 px-4 text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all"
            value={deliveryInfo.password || ""}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, password: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryAddress" className="block text-sm font-bold uppercase tracking-wider">
            {dict.cart.deliveryAddress}
          </label>
          <textarea
            id="deliveryAddress"
            required
            rows={3}
            className="w-full bg-white border-2 border-[var(--text-primary)] py-3 px-4 text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all resize-none"
            value={deliveryInfo.address}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full group relative flex justify-center items-center gap-2 py-4 px-4 border-4 border-[var(--text-primary)] ${isSubmitting ? 'bg-gray-400' : 'bg-[var(--cta-bg)]'} text-[var(--cta-text)] text-sm font-black uppercase tracking-widest hover:bg-[var(--text-primary)] transition-colors overflow-hidden mt-8`}
        >
          <span className="relative z-10">{isSubmitting ? "Placing Order..." : dict.cart.confirmOrder}</span>
          {!isSubmitting && <ArrowRight className={`relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />}
        </button>
      </form>
    </div>
  );
}



