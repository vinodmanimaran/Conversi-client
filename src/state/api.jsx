import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API using createApi
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // Set the base URL using import.meta.env.VITE_BASE_URL
  reducerPath: 'main', // Set the reducer path
  tagTypes: [], // Define tag types if needed
  endpoints: (build) => ({
    // Define the API endpoints
    postAiText: build.mutation({
      query: (payload) => ({
        url: 'openai/text',
        method: 'POST',
        body: payload,
      }),
    }),
    postAiCode: build.mutation({
      query: (payload) => ({
        url: 'openai/code',
        method: 'POST',
        body: payload,
      }),
    }),
    postAiAssist: build.mutation({
      query: (payload) => ({
        url: 'openai/assist',
        method: 'POST',
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: 'auth/signup',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

// Export individual hooks for each mutation
export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api;
