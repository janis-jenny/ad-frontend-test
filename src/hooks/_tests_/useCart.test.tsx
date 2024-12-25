import { renderHook, act } from '@testing-library/react'
import { useCart } from '../useCart'
import { CartProvider } from '@/context/CartContext'
import { Game } from '@/types'
import { FC, PropsWithChildren } from 'react'

const mockGame: Game = {
 id: '1',
 name: 'Test Game',
 price: 59.99,
 image: '/test.jpg',
 genre: 'Action',
 description: 'Test description',
 isNew: false
}

describe('useCart', () => {
 beforeEach(() => {
   localStorage.clear()
 })

 const Wrapper: FC<PropsWithChildren> = ({children}) => (
    <CartProvider>{children}</CartProvider>
  ) 
 it('returns cart context value', () => {
   const { result } = renderHook(() => useCart(), { wrapper: Wrapper })
   expect(result.current.cart).toEqual([])
   expect(result.current.totalItems).toBe(0)
   expect(result.current.total).toBe(0)
 })

 it('adds items to cart', () => {
   const { result } = renderHook(() => useCart(), { wrapper: Wrapper })

   act(() => {
     result.current.addToCart(mockGame)
   })

   expect(result.current.cart).toHaveLength(1)
   expect(result.current.totalItems).toBe(1)
   expect(result.current.total).toBe(59.99)
 })

 it('removes items from cart', () => {
   const { result } = renderHook(() => useCart(), { wrapper: Wrapper })

   act(() => {
     result.current.addToCart(mockGame)
     result.current.removeFromCart('1')
   })

   expect(result.current.cart).toHaveLength(0)
   expect(result.current.totalItems).toBe(0)
 })

 it('throws error when used outside provider', () => {
   try {
     renderHook(() => useCart())
   } catch (error) {
     expect(error).toEqual(Error('useCart must be used within a CartProvider'))
   }
 })
})