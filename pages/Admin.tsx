import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit2, LogOut, ArrowLeft, Save, Clock } from 'lucide-react';

export const Admin: React.FC = () => {
  const { 
    products, isAdmin, loginAdmin, logoutAdmin, 
    addProduct, removeProduct, updateProductStock,
    openingTime, closingTime, setStoreHours 
  } = useStore();
  const [password, setPassword] = useState('');
  
  const DEFAULT_IMAGE = 'https://i.postimg.cc/6qnDZgJq/Chat-GPT-Image-3-02-2026-17-19-04.png';

  // Local state for adding new product
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
      name: '', description: '', stock: 0, imageUrl: DEFAULT_IMAGE
  });

  // Local state for time inputs to avoid context flickering on every keystroke
  const [localOpen, setLocalOpen] = useState(openingTime);
  const [localClose, setLocalClose] = useState(closingTime);

  // Login Screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h1 className="text-2xl font-bold text-stone-800 mb-6 text-center">Área Administrativa</h1>
            <input 
                type="password"
                className="w-full p-3 border border-stone-200 rounded-xl mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
                fullWidth 
                onClick={() => {
                    if(password === '47527722123') loginAdmin();
                    else alert('Senha incorreta');
                }}
            >
                Entrar
            </Button>
            <div className="mt-6 text-center">
                <Link to="/" className="text-stone-500 hover:text-stone-800 text-sm">Voltar para a loja</Link>
            </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-stone-50">
        <header className="bg-stone-800 text-white p-4 shadow-md flex justify-between items-center">
             <div className="flex items-center gap-4">
                <Link to="/" className="hover:bg-stone-700 p-2 rounded-full"><ArrowLeft size={20}/></Link>
                <h1 className="font-bold text-lg">Admin</h1>
             </div>
             <button onClick={logoutAdmin} className="text-red-300 hover:text-white flex items-center gap-1 text-sm">
                 <LogOut size={16}/> Sair
             </button>
        </header>

        <main className="p-4 max-w-4xl mx-auto space-y-6">
            
            {/* Operating Hours Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <div className="flex items-center gap-2 mb-4 border-b border-stone-100 pb-2">
                    <Clock size={20} className="text-purple-700"/>
                    <h2 className="font-bold text-stone-800 text-lg">Horário de Funcionamento</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Abertura</label>
                        <input 
                            type="time" 
                            value={localOpen}
                            onChange={(e) => setLocalOpen(e.target.value)}
                            className="w-full p-2 border border-stone-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Fechamento</label>
                        <input 
                            type="time" 
                            value={localClose}
                            onChange={(e) => setLocalClose(e.target.value)}
                            className="w-full p-2 border border-stone-300 rounded-lg"
                        />
                    </div>
                    <Button 
                        onClick={() => {
                            setStoreHours(localOpen, localClose);
                            alert('Horário atualizado com sucesso!');
                        }}
                        className="h-[42px]"
                    >
                        Salvar Horário
                    </Button>
                </div>
                <p className="text-xs text-stone-400 mt-2">
                    Defina o intervalo em que os clientes podem realizar pedidos. Fora deste horário, a loja aparecerá como "Fechada".
                </p>
            </div>

            {/* Product Management Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-stone-800 text-lg">Produtos</h2>
                    <Button variant="outline" onClick={() => setIsAdding(!isAdding)} className="!py-2 !px-3 text-sm">
                        <Plus size={16}/> {isAdding ? 'Cancelar' : 'Novo Sabor'}
                    </Button>
                </div>

                {isAdding && (
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6 animate-in slide-in-from-top-2 fade-in">
                        <h3 className="text-sm font-bold text-stone-600 mb-3 uppercase">Cadastrar Novo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input 
                                placeholder="Nome do Sabor"
                                className="p-2 rounded border"
                                value={newProduct.name}
                                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                            />
                            <input 
                                type="number"
                                placeholder="Quantidade inicial"
                                className="p-2 rounded border"
                                value={newProduct.stock}
                                onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                            />
                            <input 
                                placeholder="Descrição"
                                className="p-2 rounded border md:col-span-2"
                                value={newProduct.description}
                                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                            />
                        </div>
                        <Button 
                            variant="secondary"
                            onClick={() => {
                                if(newProduct.name) {
                                    addProduct({
                                        id: Date.now().toString(),
                                        name: newProduct.name!,
                                        description: newProduct.description || '',
                                        stock: newProduct.stock || 0,
                                        available: (newProduct.stock || 0) > 0,
                                        imageUrl: DEFAULT_IMAGE
                                    });
                                    setIsAdding(false);
                                    setNewProduct({name: '', description: '', stock: 0});
                                }
                            }}
                        >
                            Salvar Produto
                        </Button>
                    </div>
                )}

                {/* List */}
                <div className="space-y-3">
                    {products.map(product => (
                        <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-stone-100 rounded-lg hover:bg-stone-50 transition-colors gap-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800">{product.name}</h3>
                                <p className="text-xs text-stone-500 truncate">{product.description}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-stone-500 uppercase font-bold">Qtd:</span>
                                    <input 
                                        type="number"
                                        className="w-16 p-2 border border-stone-300 rounded text-center font-mono font-bold"
                                        value={product.stock}
                                        onChange={(e) => updateProductStock(product.id, parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <button 
                                    onClick={() => {
                                        if(window.confirm('Tem certeza que deseja remover este sabor?')) {
                                            removeProduct(product.id);
                                        }
                                    }}
                                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Remover"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    </div>
  );
};