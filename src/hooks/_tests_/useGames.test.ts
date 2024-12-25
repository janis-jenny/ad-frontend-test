import { renderHook, waitFor } from '@testing-library/react'
import { useGames } from '../useGames'
import { fetchGames } from '@/services/gameService'

jest.mock('@/services/gameService')

describe('useGames', () => {
  beforeEach(() => {
    (fetchGames as jest.Mock).mockResolvedValue({
      games: [{ id: 1, title: 'Game 1' }],
      availableFilters: ['Action'],
      totalPages: 2
    })
  })

  it('fetches games on mount', async () => {
    const { result } = renderHook(() => useGames('', 1))

    await waitFor(() => {
      expect(result.current.games).toHaveLength(1)
      expect(result.current.genres).toEqual(['Action'])
      expect(result.current.hasMore).toBeTruthy()
    })
  })

  it('handles errors', async () => {
    (fetchGames as jest.Mock).mockRejectedValue(new Error('API Error'))
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const { result } = renderHook(() => useGames('', 1))

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy()
      expect(consoleSpy).toHaveBeenCalled()
    })
  })
})