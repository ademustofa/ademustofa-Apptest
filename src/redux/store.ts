import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface FormProps {
  firstName: string;
  lastName: string;
  age: string;
  photo?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo?: string;
}

export const ContactApi: any = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://simple-contact-crud.herokuapp.com/',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getContact: builder.query<Contact[], void>({
      query: () => 'contact',
      providesTags: ['Contact'],
    }),
    getContactById: builder.query<Contact, void>({
      query: id => `contact/${id}`,
    }),
    addContact: builder.mutation<Contact, Contact>({
      query: body => ({
        url: 'contact',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<Contact, {id: string; data: Contact}>({
      query: body => ({
        url: `contact/${body.id}`,
        method: 'PUT',
        body: body.data,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<Contact, Contact>({
      query: body => ({
        url: `contact/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});
