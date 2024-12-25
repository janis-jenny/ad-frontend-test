import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { CartProvider } from '@/context/CartContext'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    {children}
  </CartProvider>
)

const customRender = (ui: ReactElement) => 
  render(ui, { wrapper: AllTheProviders })

export * from '@testing-library/react'
export { customRender as render }
describe('Test Utils', () => {
    it('wraps components with necessary providers', () => {
      const TestComponent = () => <div>Test</div>
      const { container } = render(<TestComponent />)
      expect(container).toBeInTheDocument()
    })
  })