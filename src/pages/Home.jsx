import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home(data) {
  const {
    isLoading,
    error,
    data: activity,
  } = useQuery('activity', () =>
    fetch(
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=-1&lang=fr'
    ).then((res) => res.json())
  );

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {console.log(activity.results[1])}
      <h1>Home</h1>

      <ul>
        {activity.results.map((activity) => (
          <li key={activity.id}>
            <Link to={`/activity/${activity.id}`}>{activity.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
