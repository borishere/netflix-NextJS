import React, { FC } from 'react';
import { ErrorMessage, Field, Form } from 'formik';
import './ModalForm.scss';

export const ModalForm: FC = () => {
  return (
    <Form className='modal-form'>
      <div className='modal-form__item-wrap'>
        <div className='modal-form__item long'>
          <label>TITLE</label>
          <Field
            className='modal-form__item-input'
            type='text'
            name='title'
            aria-label='title-input'
          />
          <ErrorMessage name='title' aria-label='titleError' component='div' />
        </div>

        <div className='modal-form__item'>
          <label>RELEASE DATE</label>
          <Field
            className='modal-form__item-input'
            type='date'
            name='release_date'
            placeholder='Select Date'
            aria-label='date-input'
          />
          <ErrorMessage name='release_date' component='div' aria-label='dateError'/>
        </div>
      </div>

      <div className='modal-form__item-wrap'>
        <div className='modal-form__item long'>
          <label>MOVIE URL</label>
          <Field
            className='modal-form__item-input'
            type='text'
            name='poster_path'
            placeholder='https://'
            aria-label='url-input'
          />
          <ErrorMessage name='poster_path' component='div' aria-label='urlError'/>
        </div>

        <div className='modal-form__item'>
          <label>RATING</label>
          <Field
            className='modal-form__item-input'
            type='number'
            name='vote_average'
            placeholder='7.8'
            aria-label='rating-input'
          />
          <ErrorMessage name='vote_average' component='div' aria-label='ratingError'/>

        </div>
      </div>

      <div className='modal-form__item-wrap'>
        <div className='modal-form__item long'>
          <label>GENRE</label>
          <Field
            className='modal-form__item-input'
            as='select'
            name='genres'
            multiple
            placeholder='Select Genre'
            aria-label='genres-select'
          >
            <option value='Comedy'>Comedy</option>
            <option value='Drama'>Drama</option>
            <option value='Romance'>Romance</option>
          </Field>
          <ErrorMessage name='genres' component='div' aria-label='genreError'/>
        </div>

        <div className='modal-form__item'>
          <label>RUNTIME</label>
          <Field
            className='modal-form__item-input'
            type='number'
            name='runtime'
            placeholder='minutes'
            aria-label='runtime-input'
          />
          <ErrorMessage name='runtime' component='div' aria-label='runtimeError'/>
        </div>
      </div>

      <div className='modal-form__item'>
        <label>OVERVIEW</label>
        <Field
          className='modal-form__item-input'
          as='textarea'
          rows='6'
          name='overview'
          placeholder='movie description'
          aria-label='overview-input'
        />
        <ErrorMessage name='overview' component='div' aria-label='overviewError'/>
      </div>

      <div className='modal-buttons'>
        <button className='reset-btn' type='reset'>RESET</button>
        <button className='submit-btn' type='submit'>SUBMIT</button>
      </div>
    </Form>
  );
};