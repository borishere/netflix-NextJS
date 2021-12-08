import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useMatch, useParams, useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from './Components/ErrorBoundary/ErrorBoundary';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Body } from './Components/Body/Body';
import { IGetMoviesArgs, TNullableMovie } from './Models/models';
import { DeleteMovieModal } from './Components/DeleteMovieModal/DeleteMovieModal';
import { ModalContext } from './Context/ModalContext';
import { EditMovieModal } from './Components/EditMovieModal/EditMovieModal';
import { AddMovieModal } from './Components/AddMovieModal/AddMovieModal';
import { useTitle } from './Hooks/hooks';
import { useGetMovieQuery, useGetMoviesQuery } from './services/movies';
import { skipToken } from '@reduxjs/toolkit/dist/query';

export const App: FC = () => {
  const [showAddMovieModal, setShowAddMovieModal] = useState<boolean>(false);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState<boolean>(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<TNullableMovie>(null);

  const navigate = useNavigate();
  const isRoot = useMatch('/');
  const { searchQuery } = useParams();
  const [searchParams] = useSearchParams();

  const genreParam = searchParams.get('genre');
  const sortByParam = searchParams.get('sortBy');
  const movieParam = searchParams.get('movie');

  const queryParams: IGetMoviesArgs = {};

  if (genreParam) {
    queryParams['filter'] = genreParam;
  }
  if (sortByParam) {
    queryParams['sortBy'] = sortByParam;
    queryParams['sortOrder'] = 'asc';
  }

  if (searchQuery) {
    queryParams['search'] = searchQuery;
    queryParams['searchBy'] = 'title';
  }

  const { data: movies, error, isLoading } = useGetMoviesQuery(queryParams);
  const { data: movie, refetch: refetchMovie } = useGetMovieQuery(movieParam ?? skipToken);

  useEffect(() => {
    if (isRoot) {
      navigate('/search', { replace: true });
    }
  }, [isRoot, navigate]);

  useEffect(() => {
    if (movieParam) {
      if (movie) {
        setSelectedMovie(movie);
      }
    } else {
      setSelectedMovie(null);
    }
  }, [movieParam, movie]);

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
};