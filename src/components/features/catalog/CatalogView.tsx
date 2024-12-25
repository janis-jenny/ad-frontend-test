'use client'
import React, { useRef, useEffect } from 'react';
import GameCard from './GameCard';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { useURLState } from '@/hooks/useURLState';
import { useGames } from '@/hooks/useGames';

export default function CatalogPage() {
  const { genre, currentPage, setURLParams } = useURLState();
  const { games, genres, loading, hasMore } = useGames(genre, currentPage);

  const seeMoreRef = useRef<HTMLDivElement | null>(null);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setURLParams({ genre: e.target.value, page: '1' });
  };

  const handleSeeMore = () => {
    setURLParams({ genre, page: (currentPage + 1).toString() });
  };

  useEffect(() => {
    if (seeMoreRef.current) {
      seeMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [ currentPage]);

  if (loading && games.length === 0) {
    return <Loading />;
  }

  return (
    <>
      {games.length > 0 && (
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
              ) : hasMore ? (
                <div ref={seeMoreRef}>
                  <Button
                    variant="primary"
                    className="mt-10 lg:w-2/12 w-full"
                    onClick={handleSeeMore}
                  >
                    SEE MORE
                  </Button>
                </div>
              ) : (
                <div className="text-center mt-8 text-gray-500 font-bold text-xl">
                  No more games to show in this category
                </div>
              )}
          </div>
        </>
      )}
    </>
  );
}
