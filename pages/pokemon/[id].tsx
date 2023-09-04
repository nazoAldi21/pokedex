// pages/pokemon/[id].tsx
import { useRouter } from 'next/router';
import { Pokemon } from '@/src/utils/constant';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Detail Pokemon #{id}</h1>
      {/* Tampilkan informasi lainnya tentang Pokémon */}
    </div>
  );
};

export default PokemonDetail;
