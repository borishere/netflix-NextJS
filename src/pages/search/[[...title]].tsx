import React, { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { EditMovieModal } from '../../Components/EditMovieModal/EditMovieModal';
import { DeleteMovieModal } from '../../Components/DeleteMovieModal/DeleteMovieModal';
import { AddMovieModal } from '../../Components/AddMovieModal/AddMovieModal';
import { ErrorBoundary } from '../../Components/ErrorBoundary/ErrorBoundary';
import { ModalContext } from '../../Context/ModalContext';
import { Header } from '../../Components/Header/Header';
import { Footer } from '../../Components/Footer/Footer';
import { useTitle } from '../../Hooks/hooks';
import { Body } from '../../Components/Body/Body';
import { getMovie, getMovies, getRunningOperationPromises, useGetMovieQuery, useGetMoviesQuery } from '../../services/movies';
import { IGetMoviesArgs, TNullableMovie } from '../../Models/models';
import { wrapper } from '../../app/store';
import { useRouter } from 'next/router';

export default function App() {
  const [showAddMovieModal, setShowAddMovieModal] = useState<boolean>(false);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState<boolean>(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<TNullableMovie>(null);

  const { query: searchQuery } = useRouter();

  const searchParam = searchQuery.title?.[0] as string;
  const genreQuery = searchQuery.genre as string;
  const sortByQuery = searchQuery.sortBy as string;
  const movieQuery = searchQuery.movie as string;

  const queryParams: IGetMoviesArgs = {};

  if (genreQuery) {
    queryParams['filter'] = genreQuery;
  }
  if (sortByQuery) {
    queryParams['sortBy'] = sortByQuery;
    queryParams['sortOrder'] = 'asc';
  }

  if (searchParam) {
    queryParams['search'] = searchParam;
    queryParams['searchBy'] = 'title';
  }

  const { data: movies, error, isLoading } = useGetMoviesQuery(queryParams);
  const { data: movie, refetch: refetchMovie } = useGetMovieQuery(movieQuery ?? skipToken);

  useEffect(() => {
    if (movieQuery) {
      if (movie) {
        setSelectedMovie(movie);
      }
    } else {
      setSelectedMovie(null);
    }
  }, [movieQuery, movie]);

  const renderBody = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>Error</div>;
    }

    if (!movies) {
      return <div>No movies :(</div>;
    }

    return <Body />;
  };

  useTitle('Netfilx');

  const modalContext = {
    setShowAddMovieModal,
    setShowDeleteMovieModal,
    setShowEditMovieModal
  };

  return (
    <ModalContext.Provider value={modalContext}>
      <Header selectedMovie={selectedMovie} />
      <ErrorBoundary>
        {renderBody()}
      </ErrorBoundary>
      <Footer />

      <AddMovieModal
        isShown={showAddMovieModal}
        show={setShowAddMovieModal}
      />

      {selectedMovie?.id && (
        <DeleteMovieModal
          isShown={showDeleteMovieModal}
          show={setShowDeleteMovieModal}
          movieId={selectedMovie.id}
        />
      )}

      <EditMovieModal
        isShown={showEditMovieModal}
        show={setShowEditMovieModal}
        movie={selectedMovie}
        updateMovie={refetchMovie}
      />
    </ModalContext.Provider>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParam = context.params?.title?.[0] as string;
    const genreQuery = context.query.genre;
    const sortByQuery = context.query.sortBy as string;
    const movieQuery = context.query.movie as string;

    const queryParams: IGetMoviesArgs = {};

    if (genreQuery) {
      queryParams['filter'] = genreQuery;
    }
    if (sortByQuery) {
      queryParams['sortBy'] = sortByQuery;
      queryParams['sortOrder'] = 'asc';
    }

    if (searchParam) {
      queryParams['search'] = searchParam;
      queryParams['searchBy'] = 'title';
    }

    store.dispatch(getMovies.initiate(queryParams));

    if (movieQuery) {
      store.dispatch(getMovie.initiate(movieQuery));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {}
    };
  }
);
