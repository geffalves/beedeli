import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Trash2, Leaf } from 'lucide-react';
import { SpoonOption } from '../types';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, isStoreOpen } = useStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isStoreOpen) {
        alert("A loja está fechada. Não é possível finalizar o pedido.");
        return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-30 shadow-sm flex items-center gap-4">
        <Link to="/" className="p-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-stone-800">Seu Carrinho</h1>
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400 space-y-4">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center">
                <ShoppingBagIcon size={32} />
            </div>
            <p>Seu carrinho está vazio.</p>
            <Link to="/">
                <Button variant="outline">Voltar ao cardápio</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex gap-4">
                {/* Image Placeholder */}
                <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.product.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-stone-800">{item.product.name}</h3>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-1"
                    >
                        <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-stone-500 mt-1">Qtd: <span className="font-semibold text-stone-800">{item.quantity}</span></p>
                  
                  {/* Options display */}
                  <div className="mt-2 text-xs text-stone-400 space-y-1">
                     <div className="flex items-center gap-1">
                        {item.spoon === SpoonOption.YES ? (
                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Com colher</span>
                        ) : (
                            <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                                <Leaf size={10} /> Sem colher
                            </span>
                        )}
                     </div>
                     {item.notes && (
                         <p className="italic bg-stone-50 p-1.5 rounded text-stone-600">"{item.notes}"</p>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 bg-white border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           <div className="max-w-2xl mx-auto space-y-3">
             <div className="flex justify-between text-stone-600 font-medium">
                <span>Total de itens</span>
                <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
             </div>
             <Button fullWidth onClick={handleCheckout} disabled={!isStoreOpen}>
                {isStoreOpen ? 'Finalizar pedido' : 'Loja Fechada'}
             </Button>
           </div>
        </div>
      )}
    </div>
  );
};

// Simple Icon for empty state
const ShoppingBagIcon = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);