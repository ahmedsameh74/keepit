"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart } from "../store/cartSlice";
import Link from "next/link";
import { Trash2, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import CartCheckout from "./CartCheckout";

export default function CartContent({ dict, lang }: { dict: any; lang: string }) {
  const isRtl = lang === "ar";
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-[var(--text-primary)]">
          {dict.cart.title}
        </h1>
        <div className="bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-12 shadow-[8px_8px_0px_0px_var(--text-primary)] max-w-2xl mx-auto flex flex-col items-center">
          <ShoppingCart className="w-24 h-24 mb-6 opacity-20" />
          <p className="text-2xl font-bold mb-8 uppercase tracking-wide">{dict.cart.empty}</p>
          <Link href={`/${lang}/shop`} className="bg-[var(--cta-bg)] text-[var(--cta-text)] px-8 py-4 font-black uppercase tracking-widest hover:opacity-90 transition-colors border-2 border-[var(--text-primary)] inline-flex items-center gap-2">
            {isRtl ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            {dict.cart.backToShop}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-[var(--text-primary)]">
        {dict.cart.title}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-[var(--bg-primary)] border-4 border-[var(--text-primary)] p-6 flex flex-col md:flex-row gap-6 items-start relative shadow-[4px_4px_0px_0px_var(--text-primary)]">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{item.productName}</h3>
                  <p className="text-xl font-bold">{item.price.toFixed(2)} EGP</p>
                </div>
                
                <div className="space-y-2 text-sm font-medium border-l-4 border-[var(--cta-bg)] pl-4 py-2">
                  <p><span className="font-bold opacity-70">{dict.cart.nameOnCard}</span> {item.nameOnCard}</p>
                  {item.message && <p><span className="font-bold opacity-70">{dict.cart.message}</span> {item.message}</p>}
                  <p><span className="font-bold opacity-70">{dict.cart.playlist}</span> <span className="break-all">{item.playlist}</span></p>
                  <p><span className="font-bold opacity-70">{dict.cart.date}</span> {item.date}</p>
                  {item.backgroundImage && <p><span className="font-bold text-[var(--cta-bg)]">✓ Digital Background Included</span></p>}
                  {item.profilePhotos && item.profilePhotos.length > 0 && <p><span className="font-bold text-[var(--cta-bg)]">✓ {item.profilePhotos.length} Profile Photos Included</span></p>}
                </div>
              </div>
              
              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                className="mt-4 md:mt-0 p-3 border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--cta-bg)] hover:text-[var(--cta-text)] transition-colors self-end md:self-start"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <div className="bg-[var(--text-primary)] text-[var(--bg-primary)] p-6 flex justify-between items-center border-4 border-[var(--text-primary)]">
            <span className="text-3xl font-black uppercase tracking-widest">{dict.cart.total}</span>
            <span className="text-4xl font-black">{total.toFixed(2)} EGP</span>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartCheckout dict={dict} lang={lang} cartItems={cartItems} total={total} />
        </div>
      </div>
    </div>
  );
}
