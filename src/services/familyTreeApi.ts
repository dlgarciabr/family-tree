import { baseApi as api } from "./base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRule: build.query<GetRuleApiResponse, GetRuleApiArg>({
      query: () => ({ url: `/rule` }),
    }),
    postRule: build.mutation<PostRuleApiResponse, PostRuleApiArg>({
      query: (queryArg) => ({
        url: `/rule`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    createTreeNode: build.mutation<
      CreateTreeNodeApiResponse,
      CreateTreeNodeApiArg
    >({
      query: (queryArg) => ({
        url: `/treeNode`,
        method: "POST",
        body: queryArg.treeNode,
      }),
    }),
    updateTreeNode: build.mutation<
      UpdateTreeNodeApiResponse,
      UpdateTreeNodeApiArg
    >({
      query: (queryArg) => ({
        url: `/treeNode`,
        method: "PUT",
        body: queryArg.treeNode,
      }),
    }),
    getTreeNodeById: build.query<
      GetTreeNodeByIdApiResponse,
      GetTreeNodeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/treeNode/${queryArg.treeNodeId}` }),
    }),
    deleteTreeNode: build.mutation<
      DeleteTreeNodeApiResponse,
      DeleteTreeNodeApiArg
    >({
      query: (queryArg) => ({
        url: `/treeNode/${queryArg.treeNodeId}`,
        method: "DELETE",
        headers: { api_key: queryArg.apiKey },
      }),
    }),
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
    loginUser: build.query<LoginUserApiResponse, LoginUserApiArg>({
      query: (queryArg) => ({
        url: `/user/login`,
        params: { email: queryArg.email, password: queryArg.password },
      }),
    }),
    logoutUser: build.query<LogoutUserApiResponse, LogoutUserApiArg>({
      query: () => ({ url: `/user/logout` }),
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
export { injectedRtkApi as familyTreeApi };
export type GetRuleApiResponse =
  /** status 200 successful operation */ InlineResponse200;
export type GetRuleApiArg = void;
export type PostRuleApiResponse =
  /** status 200 successful operation */ InlineResponse2001;
export type PostRuleApiArg = {
  body: RuleToPersist[];
};
export type CreateTreeNodeApiResponse = unknown;
export type CreateTreeNodeApiArg = {
  /** TreeNode object that needs to be added to the store */
  treeNode: TreeNode;
};
export type UpdateTreeNodeApiResponse = unknown;
export type UpdateTreeNodeApiArg = {
  /** TreeNode object that needs to be added to the store */
  treeNode: TreeNode;
};
export type GetTreeNodeByIdApiResponse =
  /** status 200 successful operation */ TreeNode;
export type GetTreeNodeByIdApiArg = {
  /** ID of treeNode to return */
  treeNodeId: number;
};
export type DeleteTreeNodeApiResponse = unknown;
export type DeleteTreeNodeApiArg = {
  apiKey?: string;
  /** TreeNode id to delete */
  treeNodeId: number;
};
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
export type LoginUserApiResponse =
  /** status 200 successful operation */ InlineResponse2002;
export type LoginUserApiArg = {
  /** The user name for login */
  email: string;
  /** The password for login in clear text */
  password: string;
};
export type LogoutUserApiResponse = unknown;
export type LogoutUserApiArg = void;
export type ValidateTokenApiResponse =
  /** status 200 successful operation */ InlineResponse2003;
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
export type Rule = {
  id?: number;
  menuCode: string;
  groupName: string;
};
export type InlineResponse200 = {
  status?: number;
  message?: string;
  data?: Rule[];
};
export type InlineResponse2001 = {
  status?: number;
  message?: string;
};
export type RuleToPersist = {
  id?: number;
  menuCode?: string;
  groupName?: string;
  deleted?: boolean;
};
export type TreeNode = {
  id?: number;
  name?: string;
};
export type User = {
  id?: number;
  username?: string;
};
export type InlineResponse2002 = {
  id?: number;
  token?: string;
};
export type InlineResponse2003 = {
  valid?: boolean;
};
export const {
  useGetRuleQuery,
  usePostRuleMutation,
  useCreateTreeNodeMutation,
  useUpdateTreeNodeMutation,
  useGetTreeNodeByIdQuery,
  useDeleteTreeNodeMutation,
  useGetUserQuery,
  useCreateUserMutation,
  useCreateUsersWithArrayInputMutation,
  useCreateUsersWithListInputMutation,
  useLoginUserQuery,
  useLogoutUserQuery,
  useValidateTokenQuery,
  useGetUserByNameQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = injectedRtkApi;
