import { useRouter, useSearchParams } from 'next/navigation';


export const useURLState = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const genre = searchParams.get('genre') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const setURLParams = (params: Record<string, string>) => {
    const updatedParams = new URLSearchParams(searchParams);
     if (!params.genre) {
        updatedParams.delete('genre');
      } else {
        updatedParams.set('genre', params.genre);
      }
  
      updatedParams.set('page', params.page);
  
    router.replace(`/?${updatedParams.toString()}`);
  };

  return { genre, currentPage, setURLParams };
};
