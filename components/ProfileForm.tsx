"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Music, Plus, Trash2, Save, Loader2, Edit2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateProfile } from "../store/authSlice";
import { toast } from "react-hot-toast";

export default function ProfileForm({ dict }: { dict: any }) {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      const currentLang = window.location.pathname.split("/")[1] || "en";
      router.push(`/${currentLang}/login`);
    }
  }, [mounted, isLoggedIn, router]);

const [bgImage, setBgImage] = useState<string | null>(
    user?.backgroundImage ? `http://localhost:3001${user.backgroundImage}` : null
  );
  const [description, setDescription] = useState(user?.description || "");
  const [gallery, setGallery] = useState<string[]>(
    user?.profilePhotos ? user.profilePhotos.map(p => `http://localhost:3001${p}`) : []
  );
  const [musicUrls, setMusicUrls] = useState<string[]>(user?.musicUrls?.length ? user.musicUrls : [""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBgImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setGallery([...gallery, ...newImages]);
    }
  };

  const addMusicUrl = () => {
    setMusicUrls([...musicUrls, ""]);
  };

  const removeMusicUrl = (index: number) => {
    const newUrls = [...musicUrls];
    newUrls.splice(index, 1);
    setMusicUrls(newUrls);
  };

  const updateMusicUrl = (index: number, value: string) => {
    const newUrls = [...musicUrls];
    newUrls[index] = value;
    setMusicUrls(newUrls);
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    setGallery(newGallery);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("description", description);
      
      const cleanMusicUrls = musicUrls.filter(url => url.trim() !== "");
      formData.append("musicUrls", JSON.stringify(cleanMusicUrls));
      
      // Handle Background
      if (bgImage) {
        if (bgImage.startsWith("blob:")) {
          const res = await fetch(bgImage);
          const blob = await res.blob();
          formData.append("newBgImage", blob, "bg.jpg");
        } else {
          formData.append("existingBgImage", bgImage);
        }
      }
      
      // Handle Gallery
      const existingGallery: string[] = [];
      let newPhotoIndex = 0;
      
      for (const img of gallery) {
        if (img.startsWith("blob:")) {
          const res = await fetch(img);
          const blob = await res.blob();
          formData.append(`newGallery_${newPhotoIndex}`, blob, `gallery_${newPhotoIndex}.jpg`);
          newPhotoIndex++;
        } else {
          existingGallery.push(img);
        }
      }
      formData.append("existingGallery", JSON.stringify(existingGallery));

      const res = await fetch("http://localhost:3001/api/users/update", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(updateProfile(data.user));
        toast.success("Profile saved successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile. Make sure dashboard server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (!mounted || !isLoggedIn) return null;

  return (
    <>
      {mounted && bgImage && (
        <div 
          className="fixed inset-0 z-[-1] pointer-events-none transition-all duration-500"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35) blur(8px) sepia(0.3) hue-rotate(-15deg)',
          }}
        />
      )}
      <div className="w-full max-w-4xl mx-auto space-y-12 mb-20 bg-[var(--bg-primary)]/[0.20] p-4 md:p-8 border-4 border-transparent">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[var(--text-primary)] leading-none">
          {dict.profile.title}
        </h1>
        <p className="text-xl md:text-2xl font-bold text-[var(--text-secondary)]">
          {dict.profile.subtitle}
        </p>
      </div>

      {!isEditing ? (
        <div className="bg-[var(--bg-secondary)] border-4 border-[var(--text-primary)] p-6 md:p-12 brutal-shadow">
          <div className="flex justify-between items-center mb-8 border-b-4 border-[var(--text-primary)] pb-4">
            <h2 className="text-3xl font-black uppercase tracking-widest">{mounted ? user?.name : ""}'s Profile</h2>
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--cta-bg)] text-[var(--cta-text)] border-4 border-[var(--text-primary)] font-bold uppercase tracking-widest hover:-translate-y-1 hover:translate-x-1 brutal-shadow-sm transition-transform"
            >
              <Edit2 size={20} />
              Edit
            </button>
          </div>

          <div className="space-y-10">
            {/* Description */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">{dict.profile.descLabel}</h3>
              {description ? (
                <p className="text-lg font-bold text-[var(--text-primary)]/80 bg-[var(--bg-primary)] p-6 border-4 border-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{description}</p>
              ) : (
                <p className="text-lg font-bold text-[var(--text-primary)]/40 italic">No description provided yet.</p>
              )}
            </div>

            {/* Gallery */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">{dict.profile.galleryLabel}</h3>
              {gallery.length > 0 ? (
                <div className="relative group">
                  <div 
                    ref={galleryRef}
                    className="flex overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {gallery.map((img, index) => (
                      <div 
                        key={index} 
                        onClick={() => setLightboxIndex(index)}
                        className="relative shrink-0 w-64 h-80 border-4 border-[var(--text-primary)] bg-[var(--bg-primary)] snap-center cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:z-10 brutal-shadow"
                        style={{ 
                          marginLeft: index === 0 ? '0' : '-3rem',
                          transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                          zIndex: index
                        }}
                      >
                        <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover border-2 border-black" />
                      </div>
                    ))}
                  </div>
                  
                  {gallery.length > 1 && (
                    <>
                      <button 
                        onClick={() => scrollGallery('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-2 brutal-shadow-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors z-20 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button 
                        onClick={() => scrollGallery('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-2 brutal-shadow-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors z-20 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={32} />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-lg font-bold text-[var(--text-primary)]/40 italic">No gallery photos provided yet.</p>
              )}
            </div>

            {/* Music */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">{dict.profile.musicLabel}</h3>
              {musicUrls.filter(u => u.trim() !== "").length > 0 ? (
                <div className="space-y-4">
                  {musicUrls.filter(u => u.trim() !== "").map((url, index) => (
                    <a key={index} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-4 border-4 border-[var(--text-primary)] bg-[var(--bg-primary)] p-4 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
                      <Music size={24} />
                      <span className="font-bold truncate">{url}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-lg font-bold text-[var(--text-primary)]/40 italic">No music links provided yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-secondary)] border-4 border-[var(--text-primary)] p-6 md:p-12 brutal-shadow">
          <div className="flex justify-between items-center mb-8 border-b-4 border-[var(--text-primary)] pb-4">
            <h2 className="text-3xl font-black uppercase tracking-widest">Edit Profile</h2>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-sm font-bold uppercase tracking-widest underline hover:text-[var(--text-primary)]/70"
            >
              Cancel
            </button>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Background Image Upload */}
          <div className="space-y-4">
            <label className="block text-xl font-black uppercase tracking-wider text-[var(--text-primary)]">
              {dict.profile.bgImageLabel}
            </label>
            <div className="relative group border-4 border-dashed border-[var(--text-primary)] bg-[var(--bg-primary)] p-8 text-center cursor-pointer hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleBgImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {bgImage ? (
                <div className="relative w-full h-48 md:h-64 object-cover">
                  <img src={bgImage} alt="Background Preview" className="w-full h-full object-cover border-4 border-black" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 h-48">
                  <ImagePlus size={48} className="mb-2" />
                  <span className="text-lg font-bold uppercase tracking-wider">{dict.profile.bgImagePlaceholder}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-4">
            <label className="block text-xl font-black uppercase tracking-wider text-[var(--text-primary)]">
              {dict.profile.descLabel}
            </label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={dict.profile.descPlaceholder}
              className="w-full px-6 py-4 bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] text-[var(--text-primary)] text-lg font-bold focus:outline-none focus:ring-4 focus:ring-[var(--accent)] resize-none"
            />
          </div>

          {/* Gallery Images Upload */}
          <div className="space-y-4">
            <label className="block text-xl font-black uppercase tracking-wider text-[var(--text-primary)]">
              {dict.profile.galleryLabel}
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {gallery.map((img, index) => (
                <div key={index} className="relative group border-4 border-[var(--text-primary)] aspect-square bg-[var(--bg-primary)]">
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover border-2 border-black" />
                  <button 
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity brutal-shadow-sm z-20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              {/* Add New Gallery Image Button */}
              <div className="relative border-4 border-dashed border-[var(--text-primary)] bg-[var(--bg-primary)] flex items-center justify-center aspect-square hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={handleGalleryUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <Plus size={32} />
              </div>
            </div>
          </div>

          {/* Music URLs */}
          <div className="space-y-4">
            <label className="block text-xl font-black uppercase tracking-wider text-[var(--text-primary)]">
              {dict.profile.musicLabel}
            </label>
            
            <div className="space-y-4">
              {musicUrls.map((url, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-grow flex border-4 border-[var(--text-primary)] bg-[var(--bg-primary)] focus-within:ring-4 focus-within:ring-[var(--accent)]">
                    <div className="px-4 flex items-center justify-center bg-[var(--text-primary)] text-[var(--bg-primary)]">
                      <Music size={20} />
                    </div>
                    <input 
                      type="url"
                      value={url}
                      onChange={(e) => updateMusicUrl(index, e.target.value)}
                      placeholder={dict.profile.musicPlaceholder}
                      className="w-full px-6 py-4 bg-transparent text-[var(--text-primary)] text-lg font-bold focus:outline-none"
                    />
                  </div>
                  {musicUrls.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeMusicUrl(index)}
                      className="bg-red-500 text-white px-6 border-4 border-black hover:-translate-y-1 hover:translate-x-1 transition-transform brutal-shadow-sm flex items-center justify-center"
                    >
                      <Trash2 size={24} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              type="button"
              onClick={addMusicUrl}
              className="flex items-center gap-2 font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors mt-2"
            >
              <Plus size={20} /> {dict.profile.addMusic}
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-8 mt-8 border-t-4 border-[var(--text-primary)]">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 border-4 border-[var(--text-primary)] text-2xl font-black uppercase tracking-widest transition-transform flex items-center justify-center gap-3 ${isSubmitting ? 'bg-gray-400 text-gray-700' : 'bg-[var(--cta-bg)] text-[var(--cta-text)] hover:-translate-y-2 hover:translate-x-2 brutal-shadow'}`}
            >
              {isSubmitting ? <Loader2 size={28} className="animate-spin" /> : <Save size={28} />}
              {isSubmitting ? "Saving..." : dict.profile.save}
            </button>
          </div>

          </form>
        </div>
      )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4" 
          onClick={() => setLightboxIndex(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-[var(--accent)] transition-colors">
            <X size={40} />
          </button>
          
          {lightboxIndex > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              className="absolute left-6 text-white hover:text-[var(--accent)] transition-colors p-4"
            >
              <ChevronLeft size={64} />
            </button>
          )}

          <img 
            src={gallery[lightboxIndex]} 
            className="max-w-full max-h-full border-4 border-white object-contain brutal-shadow" 
            alt={`Enlarged gallery view ${lightboxIndex + 1}`} 
            onClick={(e) => e.stopPropagation()} 
          />

          {lightboxIndex < gallery.length - 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              className="absolute right-6 text-white hover:text-[var(--accent)] transition-colors p-4"
            >
              <ChevronRight size={64} />
            </button>
          )}
        </div>
      )}
    </>
  );
}









