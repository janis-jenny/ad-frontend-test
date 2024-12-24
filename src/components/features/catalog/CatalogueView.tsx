'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Game } from '@/types';
import { fetchGames } from '@/services/gameService';
import GameCard from './GameCard';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';

export default function CatalogPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const genre = searchParams.get('genre') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    let isMounted = true;

    const loadGames = async () => {
      setLoading(true);
      try {
        const data = await fetchGames(genre, currentPage);
        if (isMounted) {
          setGames(prevGames => 
            currentPage === 1 ? data.games : [...prevGames, ...data.games]
          );
          setGenres(data.availableFilters);
          setHasMore(data.games.length > 0 && currentPage < data.totalPages);
        }
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
      setLoading(false);
    };

    loadGames();
    return () => {
      isMounted = false;
    };
  }, [genre, currentPage]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = e.target.value;
    const params = new URLSearchParams();
    if (newGenre) params.set('genre', newGenre);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleSeeMore = () => {
    const nextPage = currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set('page', nextPage.toString());
    router.push(`/?${params.toString()}`);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="border-b border-gray-200">
      <div className="container mx-auto px-4 pt-6 pb-0">
        <h2 className="text-2xl lg:text-4xl uppercase lg:capitalize font-bold text-gray-500">Top Sellers</h2>
          <div className="flex flex-wrap justify-between lg:justify-end mx-auto my-12 py-3">
            <label htmlFor="genre" className="text-gray-500 font-bold text-xl lg:pr-2">
            Genre
            </label>
            <span className="border-r border-gray-500 lg:pl-4 mr-9 h-6 pt-2"></span>
            <select
              id="genre"
              value={genre}
              onChange={handleGenreChange}
              className="text-gray-500 text-xl font-normal rounded-lg focus:outline-none w-full lg:w-auto max-w-[200px] truncate"
            >
              <option value="">All</option>
              {genres.map((g) => (
                <option key={g} value={g} className="truncate">{g}</option>
              ))}
            </select>
          </div>
      </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 mt-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {loading ? (
            <Loading />
          ) : !hasMore && games.length > 0 ? (
            <div className="text-center mt-8 text-gray-500">
              No more games to show in this category
            </div>
          ) : hasMore && (
            <Button
              variant="primary"
              className="mt-10 lg:w-2/12 w-full"
              onClick={handleSeeMore}
            >
              SEE MORE
            </Button>
          )}
      </div>
    </>
  );
}
