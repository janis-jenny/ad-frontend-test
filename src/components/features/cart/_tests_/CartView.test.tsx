import { render, screen } from '@testing-library/react'
import { CartView } from '../CartView'
import { useCart } from '@/hooks/useCart'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@/hooks/useCart')
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>

describe('CartView', () => {
  it('renders cart items and summary', () => {
    mockUseCart.mockReturnValue({
      cart: [{ id: '1', name: 'Game 1', price: 59.99, image: '/game1.jpg', genre: 'Action', quantity: 1, description: 'An action game', isNew: true }],
      removeFromCart: jest.fn(),
      totalItems: 1,
      total: 59.99,
      addToCart: jest.fn(),
    })

    render(<CartView />)
    expect(screen.getByText('Your Cart')).toBeInTheDocument()
    expect(screen.getAllByText('1 item')[0]).toBeInTheDocument()
  })

  it('handles empty cart', () => {
    mockUseCart.mockReturnValue({
      cart: [],
      removeFromCart: jest.fn(),
      totalItems: 0,
      total: 0,
      addToCart: jest.fn(),
    })
 
    render(<CartView />)
    expect(screen.getAllByText('0 items')[0]).toBeInTheDocument()
  })
 })