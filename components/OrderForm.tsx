"use client";

import { motion } from "framer-motion";
import { User, MessageSquare, Music, Calendar, ArrowRight, Sparkles, Image as ImageIcon, Camera, ImagePlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useRouter } from "next/navigation";

export default function OrderForm({ dict, lang, productId, productName, price }: { dict: any; lang: string; productId: string; productName: string; price: number }) {
  const isRtl = lang === "ar";
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nameOnCard: "",
    message: "",
    playlist: "",
    date: "",
    backgroundImage: "",
    profilePhotos: [] as string[],
  });

  const removeGalleryImage = (index: number) => {
    const newPhotos = [...formData.profilePhotos];
    newPhotos.splice(index, 1);
    setFormData({ ...formData, profilePhotos: newPhotos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: Date.now().toString(),
      productId,
      name: productName, // For backward compatibility with older spec
      productName,
      price,
      nameOnCard: formData.nameOnCard,
      message: formData.message,
      playlist: formData.playlist,
      date: formData.date,
      backgroundImage: formData.backgroundImage,
      profilePhotos: formData.profilePhotos,
    }));
    router.push(`/${lang}/cart`);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-8 md:p-10 shadow-[8px_8px_0px_0px_var(--text-primary)] relative"
      >
        <div className="absolute top-4 right-4 text-[var(--text-primary)]">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            {dict.orderForm.title}
          </h2>
          <p className="text-[var(--text-primary)]/80 font-medium">
            {dict.orderForm.subtitle}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-bold uppercase tracking-wider"
            >
              {dict.orderForm.nameLabel}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <User className="h-5 w-5 text-[var(--text-primary)]/50" />
              </div>
              <input
                id="name"
                type="text"
                required
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                placeholder={dict.orderForm.namePlaceholder}
                value={formData.nameOnCard}
                onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-bold uppercase tracking-wider"
            >
              {dict.orderForm.messageLabel}
            </label>
            <div className="relative">
              <div className={`absolute top-4 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-start pointer-events-none`}>
                <MessageSquare className="h-5 w-5 text-[var(--text-primary)]/50" />
              </div>
              <textarea
                id="message"
                rows={4}
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all resize-none`}
                placeholder={dict.orderForm.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="playlist"
              className="block text-sm font-bold uppercase tracking-wider"
            >
              {dict.orderForm.playlistLabel}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Music className="h-5 w-5 text-[var(--text-primary)]/50" />
              </div>
              <input
                id="playlist"
                type="url"
                required
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                placeholder={dict.orderForm.playlistPlaceholder}
                value={formData.playlist}
                onChange={(e) => setFormData({ ...formData, playlist: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-bold uppercase tracking-wider"
            >
              {dict.orderForm.dateLabel}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Calendar className="h-5 w-5 text-[var(--text-primary)]/50" />
              </div>
              <input
                id="date"
                type="date"
                required
                className={`w-full bg-white border-2 border-[var(--text-primary)] py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 focus:outline-none focus:ring-4 focus:ring-[var(--text-primary)]/20 transition-all`}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider">
              {dict.orderForm?.backgroundLabel || "Background Image (Digital Profile)"}
            </label>
            <div className="relative group border-4 border-dashed border-[var(--text-primary)] bg-white p-8 text-center cursor-pointer hover:bg-[var(--text-primary)] hover:text-white transition-colors duration-300">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({ ...formData, backgroundImage: URL.createObjectURL(e.target.files[0]) });
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {formData.backgroundImage ? (
                <div className="relative w-full h-48 md:h-64 object-cover">
                  <img src={formData.backgroundImage} alt="Background Preview" className="w-full h-full object-cover border-4 border-[var(--text-primary)]" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 h-48">
                  <ImagePlus size={48} className="mb-2 text-[var(--text-primary)] group-hover:text-white transition-colors duration-300" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">Upload Background Image</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider">
              {dict.orderForm?.photosLabel || "Profile Photos (Digital Profile)"}
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.profilePhotos.map((img, index) => (
                <div key={index} className="relative group border-4 border-[var(--text-primary)] aspect-square bg-white">
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover border-2 border-[var(--text-primary)]" />
                  <button 
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-[var(--cta-bg)] text-[var(--cta-text)] p-2 border-2 border-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity brutal-shadow-sm z-20 hover:bg-[var(--text-primary)] hover:text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <div className="relative border-4 border-dashed border-[var(--text-primary)] bg-white flex items-center justify-center aspect-square hover:bg-[var(--text-primary)] hover:text-white transition-colors duration-300 group">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
                      setFormData({ ...formData, profilePhotos: [...formData.profilePhotos, ...filesArray] });
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <Plus size={32} className="text-[var(--text-primary)] group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full group relative flex justify-center items-center gap-2 py-4 px-4 border-4 border-[var(--text-primary)] bg-[var(--cta-bg)] text-[var(--cta-text)] text-sm font-black uppercase tracking-widest hover:bg-[var(--text-primary)] transition-colors overflow-hidden"
          >
            <span className="relative z-10">{dict.orderForm.submit}</span>
            <ArrowRight className={`relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            
            {/* Hover effect background */}
            <div className="absolute inset-0 h-full w-0 bg-[var(--text-primary)] group-hover:w-full transition-all duration-300 ease-out z-0"></div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
