import * as yup from 'yup';

export interface Igenre {
  name: string;
  active: boolean;
}

export interface ImovieBase {
  title: string;
  overview: string;
  release_date?: string;
  poster_path: string;
  vote_average?: number;
  genres: string[];
  runtime: number;
  tagline?: string;
  vote_count?: number;
  budget?: number;
  revenue?: number;
}

export interface Imovie extends ImovieBase {
  id: number;
}

export type TNullableMovie = Imovie | null;

export interface IMoviesResponse {
  data: Imovie[];
  total: number;
  offset: number;
  limit: number;
}

export interface IMoviesState {
  sortBy: string;
  filter?: string[];
}

export interface IGetMoviesArgs {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc'
  filter?: string | string[]
  search?: string,
  searchBy?: string;
  movie?: string;
}

export const validationSchema = yup.object().shape({
  title: yup.string().required(),
  release_date: yup.date(),
  vote_average: yup.number(),
  genres: yup.array().of(yup.string()).required(),
  poster_path: yup.string().url().required(),
  overview: yup.string().required(),
  runtime: yup.number().min(0).integer().required()
});