import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function Museum() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: activity,
  } = useQuery('activity', () =>
    fetch(
      `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?where=%22${id}%22&limit=-1`
    ).then((res) => res.json())
  );

  // const removeHtmlTags = (html) => {
  //   return html.replace(/<[^>]*>?/gm, ' ');
  // };

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{activity.results[0].nom_officiel}</h1>
      <p>{activity.results[0].histoire}</p>
    </div>
  );
}
