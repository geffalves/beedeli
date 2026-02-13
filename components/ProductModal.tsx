import React, { useState, useEffect } from 'react';
import { Product, SpoonOption } from '../types';
import { Button } from './ui/Button';
import { X, Minus, Plus, Leaf, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart, clearCart } = useStore();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [spoon, setSpoon] = useState<SpoonOption | null>(null);
  const [notes, setNotes] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSpoon(null);
      setNotes('');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    if (!spoon) {
      alert("Por favor, selecione uma opção sobre a colher.");
      return;
    }

    // Fluxo Simplificado: Limpa carrinho anterior -> Adiciona novo -> Vai para Checkout
    clearCart();
    addToCart({
      id: Date.now().toString(),
      product,
      quantity,
      spoon,
      notes,
    });
    
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h2 className="text-lg font-bold text-stone-800">Personalize seu pedido</h2>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-stone-400 hover:text-stone-600 shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* Header Resumo */}
          <div className="flex gap-4 items-center bg-purple-50 p-3 rounded-xl">
             <img src={product.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt={product.name} />
             <div>
                <h3 className="font-bold text-purple-900">{product.name}</h3>
                <p className="text-xs text-purple-700">Edição Gourmet</p>
             </div>
          </div>

          {/* Quantity Selector - Big and Centered */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold text-stone-400 uppercase tracking-widest">Quantidade</span>
            <div className="flex items-center bg-white border-2 border-stone-100 rounded-2xl shadow-sm p-1">
                <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
                >
                <Minus size={24} />
                </button>
                <span className="w-16 text-center font-bold text-2xl text-stone-800">{quantity}</span>
                <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                >
                <Plus size={24} />
                </button>
            </div>
          </div>

          <div className="border-t border-stone-100 my-2"></div>

          {/* Option: Spoon */}
          <div className="space-y-3">
            <p className="font-medium text-stone-800 flex items-center gap-2 text-sm">
              <UtensilsCrossed size={16} className="text-amber-700"/> 
              Deseja colher descartável?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all text-center gap-2 ${spoon === SpoonOption.YES ? 'border-green-500 bg-green-50 text-green-700 font-semibold' : 'border-stone-200 text-stone-500'}`}
              >
                <input 
                  type="radio" 
                  name="spoon"
                  checked={spoon === SpoonOption.YES}
                  onChange={() => setSpoon(SpoonOption.YES)}
                  className="hidden"
                />
                <span className="">Sim</span>
              </label>

              <label 
                className={`flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all text-center gap-2 ${spoon === SpoonOption.NO ? 'border-green-500 bg-green-50 text-green-700 font-semibold' : 'border-stone-200 text-stone-500'}`}
              >
                <input 
                  type="radio" 
                  name="spoon"
                  checked={spoon === SpoonOption.NO}
                  onChange={() => setSpoon(SpoonOption.NO)}
                  className="hidden"
                />
                <span className="flex items-center gap-1">Não <Leaf size={12}/></span>
              </label>
            </div>
          </div>

          {/* Observation */}
          <div className="space-y-2">
            <label className="font-medium text-stone-800 text-sm">Observações (opcional):</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Tocar a campainha..."
              className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none text-stone-700 min-h-[80px] text-sm"
            ></textarea>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-100">
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={handleConfirm}
            disabled={!spoon}
            className="!py-4 text-lg"
          >
            Confirmar Pedido <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};