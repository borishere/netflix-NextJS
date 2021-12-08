import React, { FC, useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { EditMovieModal } from '../Components/EditMovieModal/EditMovieModal';
import { DeleteMovieModal } from '../Components/DeleteMovieModal/DeleteMovieModal';
import { AddMovieModal } from '../Components/AddMovieModal/AddMovieModal';
import { ErrorBoundary } from '../Components/ErrorBoundary/ErrorBoundary';
import { ModalContext } from '../Context/ModalContext';
import { Header } from '../Components/Header/Header';
import { Footer } from '../Components/Footer/Footer';
import { useTitle } from '../Hooks/hooks';
import { Body } from '../Components/Body/Body';
import { getMovies, getRunningOperationPromises, useGetMovieQuery, useGetMoviesQuery } from '../services/movies';
import { IGetMoviesArgs, TNullableMovie } from '../Models/models';
import { wrapper } from '../app/store';
import { useRouter } from 'next/router';

export default function App() {
  const [showAddMovieModal, setShowAddMovieModal] = useState<boolean>(false);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState<boolean>(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<TNullableMovie>(null);

  // const navigate = useNavigate();
  // const isRoot = useMatch('/');
  // const { searchQuery } = useParams();
  // const [searchParams] = useSearchParams();

  // const genreParam = searchParams.get('genre');
  // const sortByParam = searchParams.get('sortBy');
  // const movieParam = searchParams.get('movie');

  // const queryParams: IGetMoviesArgs = {};

  // if (genreParam) {
  //   queryParams['filter'] = genreParam;
  // }
  // if (sortByParam) {
  //   queryParams['sortBy'] = sortByParam;
  //   queryParams['sortOrder'] = 'asc';
  // }

  // if (searchQuery) {
  //   queryParams['search'] = searchQuery;
  //   queryParams['searchBy'] = 'title';
  // }

  const router = useRouter();

  // const name = router.query.name;

  // const { data: movies, error, isLoading } = useGetMoviesQuery(queryParams);
  const { data: movies, error, isLoading } = useGetMoviesQuery({});
  console.log('App ~ isLoading', isLoading);
  console.log('App ~ movies', movies);
  console.log('App ~ error', error);

  // const { data: movie, refetch: refetchMovie } = useGetMovieQuery(movieParam ?? skipToken);


  // const result/ = useGetMoviesQuery({}
  // typeof name === 'string' ? name : skipToken,
  // {
  //   // If the page is not yet generated, router.isFallback will be true
  //   // initially until getStaticProps() finishes running
  //   skip: router.isFallback
  // }
  // );

  // useEffect(() => {
  //   if (isRoot) {
  //     navigate('/search', { replace: true });
  //   }
  // }, [isRoot, navigate]);

  // useEffect(() => {
  //   if (movieParam) {
  //     if (movie) {
  //       setSelectedMovie(movie);
  //     }
  //   } else {
  //     setSelectedMovie(null);
  //   }
  // }, [movieParam, movie]);

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

    return (
      movies.map((m) => {
        return <div key={m.id}>{m.title}</div>;
      })
    );

    // return <Body />;
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

      {/* <AddMovieModal
        isShown={showAddMovieModal}
        show={setShowAddMovieModal}
      />

      {selectedMovie?.id && (
        <DeleteMovieModal
          isShown={showDeleteMovieModal}
          show={setShowDeleteMovieModal}
          movieId={selectedMovie.id}
        />
      )} */}

      {/* <EditMovieModal
        isShown={showEditMovieModal}
        show={setShowEditMovieModal}
        movie={selectedMovie}
        updateMovie={refetchMovie}
      /> */}
    </ModalContext.Provider>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    if (typeof name === 'string') {
      store.dispatch(getMovies.initiate({}));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {}
    };
  }
);
