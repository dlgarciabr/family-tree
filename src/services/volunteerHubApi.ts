import { baseApi as api } from "./base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: () => ({ url: `/user` }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/user`,
        method: "POST",
        body: queryArg.user,
      }),
    }),
    createUsersWithArrayInput: build.mutation<
      CreateUsersWithArrayInputApiResponse,
      CreateUsersWithArrayInputApiArg
    >({
      query: (queryArg) => ({
        url: `/user/createWithArray`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    createUsersWithListInput: build.mutation<
      CreateUsersWithListInputApiResponse,
      CreateUsersWithListInputApiArg
    >({
      query: (queryArg) => ({
        url: `/user/createWithList`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    signin: build.mutation<SigninApiResponse, SigninApiArg>({
      query: (queryArg) => ({
        url: `/user/signin`,
        method: "POST",
        body: queryArg.userSigninData,
      }),
    }),
    signoutUser: build.query<SignoutUserApiResponse, SignoutUserApiArg>({
      query: () => ({ url: `/user/signout` }),
    }),
    signup: build.mutation<SignupApiResponse, SignupApiArg>({
      query: (queryArg) => ({
        url: `/user/signup`,
        method: "POST",
        body: queryArg.userSignupData,
      }),
    }),
    validateToken: build.query<ValidateTokenApiResponse, ValidateTokenApiArg>({
      query: (queryArg) => ({
        url: `/user/validateToken`,
        params: { token: queryArg.token },
      }),
    }),
    getUserByName: build.query<GetUserByNameApiResponse, GetUserByNameApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.username}` }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/user/${queryArg.username}`,
        method: "PUT",
        body: queryArg.user,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/user/${queryArg.username}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as volunteerHubApi };
export type GetUserApiResponse = /** status 200 successful operation */ User;
export type GetUserApiArg = void;
export type CreateUserApiResponse = unknown;
export type CreateUserApiArg = {
  /** Created user object */
  user: User;
};
export type CreateUsersWithArrayInputApiResponse = unknown;
export type CreateUsersWithArrayInputApiArg = {
  /** List of user object */
  body: User[];
};
export type CreateUsersWithListInputApiResponse = unknown;
export type CreateUsersWithListInputApiArg = {
  /** List of user object */
  body: User[];
};
export type SigninApiResponse =
  /** status 200 successful operation */ InlineResponse200;
export type SigninApiArg = {
  /** Params to login */
  userSigninData: UserSigninData;
};
export type SignoutUserApiResponse = unknown;
export type SignoutUserApiArg = void;
export type SignupApiResponse =
  /** status 200 successful operation */ InlineResponse200;
export type SignupApiArg = {
  /** Params to login */
  userSignupData: UserSignupData;
};
export type ValidateTokenApiResponse =
  /** status 200 successful operation */ InlineResponse2001;
export type ValidateTokenApiArg = {
  /** The token to be validated */
  token: string;
};
export type GetUserByNameApiResponse =
  /** status 200 successful operation */ User;
export type GetUserByNameApiArg = {
  /** The name that needs to be fetched. Use user1 for testing. */
  username: string;
};
export type UpdateUserApiResponse = unknown;
export type UpdateUserApiArg = {
  /** name that need to be updated */
  username: string;
  /** Updated user object */
  user: User;
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  /** The name that needs to be deleted */
  username: string;
};
export type User = {
  id?: number;
  username?: string;
};
export type InlineResponse200 = {
  id?: number;
  token?: string;
};
export type UserSigninData = {
  email?: string;
  password?: string;
};
export type UserSignupData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
export type InlineResponse2001 = {
  valid?: boolean;
};
export const {
  useGetUserQuery,
  useCreateUserMutation,
  useCreateUsersWithArrayInputMutation,
  useCreateUsersWithListInputMutation,
  useSigninMutation,
  useSignoutUserQuery,
  useSignupMutation,
  useValidateTokenQuery,
  useLazyValidateTokenQuery,
  useGetUserByNameQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = injectedRtkApi;
