import {  fireEvent } from '@testing-library/react';
import { render, screen } from '../../test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import CatalogPage from '../CatalogView'; 
import '@testing-library/jest-dom';
import { useGames } from '../../../../hooks/useGames';
import { useURLState } from '../../../../hooks/useURLState';
import { CartProvider } from '../../../../context/CartContext'

const mockScrollIntoView = jest.fn();
const mockRef = { 
  current: { 
    scrollIntoView: mockScrollIntoView 
  } 
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: () => mockRef,
  useEffect: jest.fn()
}));
jest.mock('@/hooks/useGames', () => ({
  useGames: jest.fn()
}))

jest.mock('@/hooks/useURLState', () => ({
  useURLState: jest.fn()
}))
const mockedUseGames = useGames as jest.MockedFunction<typeof useGames>
const mockedUseURLState = useURLState as jest.MockedFunction<typeof useURLState>

const mockGames = [
  { id: '1', name: 'Game 1', genre: 'Action', image: '/image1.jpg', description: 'Description 1', price: 10, isNew: true },
  { id: '2', name: 'Game 2', genre: 'Adventure', image: '/image2.jpg', description: 'Description 2', price: 20, isNew: false },
];

const mockGenres = ['Action', 'Adventure', 'RPG'];

describe('CatalogPage', () => {
  beforeEach(() => {
    mockedUseURLState.mockReturnValue({
      genre: '',
      currentPage: 1,
      setURLParams: jest.fn(),
    });

    mockedUseGames.mockReturnValue({
      games: mockGames,
      genres: mockGenres,
      loading: false,
      hasMore: true,
    });
  });

  it('renders the list of games', async () => {
    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Game 2')).toBeInTheDocument();
  });

  
  it('handles genre selection', async () => {
    const setURLParams = jest.fn()
    ;(useURLState as jest.Mock).mockReturnValue({
      genre: '',
      currentPage: 1,
      setURLParams
    })

    render(<CatalogPage />)
    
    const select = screen.getByLabelText('Genre')
    await userEvent.selectOptions(select, 'Action')
    
    expect(setURLParams).toHaveBeenCalledWith({
      genre: 'Action',
      page: '1'
    })
  })

  it('handles see more button click', async () => {
    const setURLParams = jest.fn()
    ;(useURLState as jest.Mock).mockReturnValue({
      genre: '',
      currentPage: 1,
      setURLParams
    })

    render(<CatalogPage />)
    
    fireEvent.click(screen.getByText('SEE MORE'))
    
    expect(setURLParams).toHaveBeenCalledWith({
      genre: '',
      page: '2'
    })
  })
})
