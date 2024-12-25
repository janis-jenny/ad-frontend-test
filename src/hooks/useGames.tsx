import React, { useEffect, useState } from 'react';
import { Game } from '@/types';
import { fetchGames } from '@/services/gameService';
export const useGames = (genre: string, currentPage: number) => {
    const [games, setGames] = useState<Game[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      const loadGames = async () => {
        setLoading(true);
        try {
          const data = await fetchGames(genre, currentPage);
          setGames((prevGames) =>
            currentPage === 1 ? data.games : [...prevGames, ...data.games]
          );
          setGenres(data.availableFilters);
          setHasMore(data.games.length > 0 && currentPage < data.totalPages);
        } catch (error) {
          console.error('Error loading games:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadGames();
    }, [genre, currentPage]);
  
    return { games, genres, loading, hasMore };
  };