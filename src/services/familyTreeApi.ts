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
  name?: string;
  groups?: string[];
};
export const {
  useGetRuleQuery,
  usePostRuleMutation,
  useCreateTreeNodeMutation,
  useUpdateTreeNodeMutation,
  useGetTreeNodeByIdQuery,
  useDeleteTreeNodeMutation,
  useGetUserQuery,
} = injectedRtkApi;
