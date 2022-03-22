import { baseApi as api } from "./base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}` }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/user/${queryArg.id}`,
        method: "PUT",
        body: queryArg.user,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}`, method: "DELETE" }),
    }),
    getVolunteerById: build.query<
      GetVolunteerByIdApiResponse,
      GetVolunteerByIdApiArg
    >({
      query: (queryArg) => ({ url: `/volunteer/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as volunteerHubApi };
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
export type SigninApiResponse = /** status 200 successful operation */ {
  id: number;
  token: string;
};
export type SigninApiArg = {
  /** Params to login */
  userSigninData: UserSigninData;
};
export type SignoutUserApiResponse = unknown;
export type SignoutUserApiArg = void;
export type SignupApiResponse = /** status 200 successful operation */ {
  id?: number;
};
export type SignupApiArg = {
  /** Params to login */
  userSignupData: UserSignupData;
};
export type ValidateTokenApiResponse = /** status 200 successful operation */ {
  valid?: boolean;
};
export type ValidateTokenApiArg = {
  /** The token to be validated */
  token: string;
};
export type GetUserByIdApiResponse =
  /** status 200 successful operation */ User;
export type GetUserByIdApiArg = {
  /** The user id to proceed the retrieving operation. */
  id: number;
};
export type UpdateUserApiResponse = unknown;
export type UpdateUserApiArg = {
  /** The user id that need to be updated */
  id: number;
  /** Updated user object */
  user: User;
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  /** The user id that needs to be deleted */
  id: number;
};
export type GetVolunteerByIdApiResponse =
  /** status 200 successful operation */ Volunteer;
export type GetVolunteerByIdApiArg = {
  /** The volunteer id to proceed the retrieving operation. */
  id: number;
};
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
export type Volunteer = {
  preferedSupportLanguages: string;
  preferedSupportType: "PRESENTIAL" | "REMOTE" | "BOTH";
  title?: string;
  coverLetter?: string;
  photo?: string;
  phone?: string;
};
export const {
  useCreateUserMutation,
  useCreateUsersWithArrayInputMutation,
  useCreateUsersWithListInputMutation,
  useSigninMutation,
  useSignoutUserQuery,
  useSignupMutation,
  useValidateTokenQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetVolunteerByIdQuery,
  useLazyValidateTokenQuery,
  useLazyGetUserByIdQuery,
  useLazyGetVolunteerByIdQuery
} = injectedRtkApi;
