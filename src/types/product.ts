
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women';
  description: string | null;
  image_url: string;
  created_at: string;
}
