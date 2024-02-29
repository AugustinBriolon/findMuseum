import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import getLocalisation from '../utils/getLocalisation';

export default function Home() {
  const [region, setRegion] = useState('Ile-de-France');
  const localisation = getLocalisation();

  console.log(region);

  const {
    isLoading,
    error,
    data: museums,
  } = useQuery('museum', () =>
    fetch(
      `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?limit=-1&lang=fr&refine=region%3A%22${region}%22`
    ).then((res) => res.json())
  );

  const getRegionWithLocalisation = () => {
    fetch(
      `https://api-adresse.data.gouv.fr/reverse/?lon=${localisation.long}&lat=${localisation.lat}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRegion(removeExtraContent(data.features[0].properties.context));
      });
  };

  const removeExtraContent = (text) => {
    return text.slice(text.indexOf(',', text.indexOf(',') + 1) + 2);
    // return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1 className='text-3xl font-bold'>Museums</h1>
      {localisation.lat && localisation.long && (
        <p>
          {localisation.lat} - {localisation.long}
        </p>
      )}
      <p
        onClick={getRegionWithLocalisation}
        className='py-4 cursor-pointer select-none'
      >
        Get Region
      </p>

      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {museums.results.map((museum) => (
          <li key={museum.identifiant} className='flex max-w-md w-fit '>
            <Link to={`/museum/${museum.identifiant}`}>
              <p className='font-bold text-md line-clamp-1'>
                {museum.nom_officiel}
              </p>
              <p className='text-sm line-clamp-2'>{museum.lieu}</p>
              <div className='space-x-2'>
                {museum.domaine_thematique &&
                  museum.domaine_thematique.map((tag) => (
                    <span key={tag} className='text-sm'>
                      {tag}
                    </span>
                  ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
