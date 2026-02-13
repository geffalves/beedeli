import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { CustomerDetails, SpoonOption } from '../types';
import { ArrowLeft, CheckCircle2, MapPin, Phone, User, ShoppingBag } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // If simple flow, cart[0] is our item
  const item = cart[0];

  const [form, setForm] = useState<CustomerDetails>({
    name: '',
    address: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const phoneNumber = "5573981688290"; 
    
    let message = `******NOVO PEDIDO******\n\n`;
    message += `** Dados do Cliente:*\n`;
    message += `Nome: ${form.name}\n`;
    message += `Endereço: ${form.address}\n`;
    message += `Contato: ${form.phone}\n\n`;

    message += `** Pedido:*\n`;
    if (item) {
        message += `Produto: ${item.product.name}\n`;
        message += `Quantidade: ${item.quantity}\n`;
        message += `Colher: ${item.spoon === SpoonOption.YES ? 'Sim' : 'Não'}\n`;
        if (item.notes) message += `Obs: ${item.notes}\n`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
        clearCart();
        window.open(whatsappUrl, '_blank');
        setIsSuccess(true);
        setLoading(false);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-lg shadow-green-200">
            <CheckCircle2 size={48} />
        </div>
        <h1 className="text-2xl font-bold text-green-900 mb-2">Pedido encaminhado!</h1>
        <p className="text-green-700 mb-8 max-w-xs mx-auto">Você foi redirecionado para o WhatsApp para confirmar o envio.</p>
      </div>
    );
  }

  // Redirect if empty
  if (!item && !loading) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center gap-4">
            <ShoppingBag size={48} className="text-stone-300"/>
            <p className="text-stone-500">Nenhum pedido selecionado.</p>
            <Link to="/"><Button>Voltar</Button></Link>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white p-4 sticky top-0 z-30 shadow-sm flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-stone-800">Finalizar Pedido</h1>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        
        {/* Order Summary Card */}
        <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm mb-6 flex gap-4 items-center">
             <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.product.imageUrl} className="w-full h-full object-cover"/>
             </div>
             <div>
                 <h3 className="font-bold text-stone-800">{item.product.name}</h3>
                 <p className="text-sm text-stone-500">Quantidade: <span className="font-bold text-stone-800">{item.quantity}</span></p>
             </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           
           <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 space-y-4">
              <h2 className="font-semibold text-stone-700 border-b border-stone-100 pb-2 mb-2">Seus Dados</h2>
              
              <div className="space-y-2">
                 <label className="text-sm font-medium text-stone-600 flex items-center gap-2"><User size={16}/> Nome</label>
                 <input 
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Seu nome completo"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-stone-600 flex items-center gap-2"><MapPin size={16}/> Endereço</label>
                 <input 
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Rua, número e complemento"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-stone-600 flex items-center gap-2"><Phone size={16}/> Telefone / WhatsApp</label>
                 <input 
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="(XX) XXXXX-XXXX"
                 />
              </div>
           </div>

           <Button 
                type="submit" 
                fullWidth 
                variant="secondary" 
                disabled={loading}
                className="!py-4 text-lg"
            >
                {loading ? 'Preparando...' : 'Confirmar e Enviar Pedido'}
           </Button>
        </form>
      </main>
    </div>
  );
};