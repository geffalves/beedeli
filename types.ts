export interface Product {
  id: string;
  name: string;
  description?: string;
  stock: number;
  imageUrl?: string;
  available: boolean;
}

export enum SpoonOption {
  YES = 'YES',
  NO = 'NO',
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  spoon: SpoonOption;
  notes: string;
}

export interface CustomerDetails {
  name: string;
  address: string;
  phone: string;
}
