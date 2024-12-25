import { renderHook } from '@testing-library/react'
import { useURLState } from '../useURLState'
import { useRouter, useSearchParams } from 'next/navigation'

jest.mock('next/navigation')

describe('useURLState', () => {
  const mockRouter = {
    replace: jest.fn()
  }

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
  })

  it('returns default values when no params exist', () => {
    const { result } = renderHook(() => useURLState())
    
    expect(result.current.genre).toBe('')
    expect(result.current.currentPage).toBe(1)
  })

  it('updates URL params correctly', () => {
    const { result } = renderHook(() => useURLState())
    
    result.current.setURLParams({ genre: 'Action', page: '2' })
    
    expect(mockRouter.replace).toHaveBeenCalled()
  })
})