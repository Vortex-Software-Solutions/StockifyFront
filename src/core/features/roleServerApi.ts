import { RoleCreateDto } from "../models/dtos/roles/roleCreateDto";
import { RoleUpdateDto } from "../models/dtos/roles/roleUpdateDto";
import { RoleResponse } from "../models/responses/role.response";
import { serverApi } from "../serverApi";

export const roleServerApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({

        listRoles: builder.query<RoleResponse, void>({
            query: () => `Roles`,
            providesTags:["Role"]
        }),

        getRole: builder.query<RoleResponse, string>({
            query: (id) => `Roles/${id}`,
            providesTags:["Role"]

        }),
        
        createRole: builder.mutation<RoleResponse, RoleCreateDto>({
            query: (newRole) => ({
                url: '/Roles',
                method: 'POST',
                body: newRole,
            }),
            invalidatesTags:["Role"]
        }),

        updateRole: builder.mutation<RoleResponse, RoleUpdateDto>({
            query: (updatedRole) => ({
                url: `/Roles`,
                method: 'PUT',
                body: updatedRole,
            }),
            invalidatesTags:["Role"]

        }),

        softDeleteRole: builder.mutation<RoleResponse, string>({
            query: (id) => ({
                url: `/Roles/softdelete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:["Role"]

        }),
    
    }),
    overrideExisting: false,
})

export const {
    useListRolesQuery,
    useGetRoleQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useSoftDeleteRoleMutation
} = roleServerApi;
