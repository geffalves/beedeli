import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductModal } from '../components/ProductModal';
import { Sparkles, Star } from 'lucide-react';
import { Product } from '../types';

export const Home: React.FC = () => {
  const { products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-900 to-stone-50 z-0"></div>
      <div className="absolute top-10 right-10 text-white/10 rotate-12">
        <Sparkles size={120} />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 mt-8">
        
        {/* Brand */}
        <div className="mb-12 text-center text-white">
            <h1 className="text-3xl font-bold mb-1">Beedeli Gourmet 🍇</h1>
            <p className="text-purple-200 text-sm tracking-widest uppercase">O doce que você merece</p>
        </div>

        {/* Product Grid */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
            {products.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-[2rem] shadow-2xl shadow-purple-900/10 max-w-sm w-full border border-stone-100 flex flex-col items-center text-center transform transition-all hover:scale-[1.01]">
                    
                    {/* Image Container */}
                    <div className="w-64 h-64 -mt-16 mb-6 rounded-full p-2 bg-white shadow-lg relative">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover rounded-full border-4 border-stone-50" 
                        />
                        <div className="absolute bottom-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Fresquinho!
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-center gap-1 text-amber-400">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <h2 className="text-2xl font-bold text-stone-800 leading-tight min-h-[4rem] flex items-center justify-center">
                            {product.name}
                        </h2>
                        <p className="text-stone-500 leading-relaxed min-h-[3rem]">
                            {product.description}
                        </p>
                    </div>

                    {/* Price Display */}
                    <div className="mb-6">
                        <span className="text-3xl font-extrabold text-purple-900">
                            Apenas R$ 10,00
                        </span>
                    </div>

                    {/* CTA Button */}
                    <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-purple-900 hover:bg-purple-950 text-white font-bold py-4 rounded-xl shadow-xl shadow-purple-200 transition-transform active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        Pedir Agora
                        <Sparkles size={18} className="group-hover:animate-spin" />
                    </button>
                    
                    <p className="mt-4 text-xs text-stone-400">
                        Entregas rápidas • Feito com amor
                    </p>
                </div>
            ))}
        </div>

        <footer className="mt-12 text-stone-400 text-xs text-center">
            &copy; {new Date().getFullYear()} Beedeli Gourmet
        </footer>

      </main>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};