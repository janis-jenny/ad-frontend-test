export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}
  
export interface CartItem extends Game {
  quantity: number;
}

type OrderSummaryItem = Pick<Game, 'id' | 'name' | 'price'> & {
  quantity: number;
};

export interface OrderSummaryProps {
  items: OrderSummaryItem[];
  total: number;
  itemCount: number;
}