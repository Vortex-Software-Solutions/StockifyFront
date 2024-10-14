import {serverApi} from "../serverApi.ts";
import {CompanyResponse} from "../models/responses/company.response.ts";
import {CompanyCreateDto} from "../models/dtos/companies/companyCreateDto.ts";
import {RegisterCompanyDto} from "../models/dtos/companies/registerCompanyDto.ts";

const companyServerApi = serverApi.injectEndpoints({
    endpoints: builder => ({

        // Para listas con paginacion
        listCompanies: builder.query<CompanyResponse, number>({
            query: (page) => `companies?page=${page}`,
            providesTags: ["Company"]
        }),

        // Para listas con busqueda y paginacion
        searchCompany: builder.query<CompanyResponse, { page: number, term: string }>({
            query: ({page, term}) => `companies?page=${page}&search=${term}`,
            providesTags: ["Company"]
        }),

        // Para busquedas en formularios y selects
        miniSearchCompany: builder.query<CompanyResponse, string>({
            query: (term) => `companies/${term}`,
            providesTags: ["Company"]
        }),

        getCompany: builder.query<CompanyResponse, string>({
            query: (id) => `companies/${id}`,
            providesTags: ["Company"]
        }),

        createCompany: builder.mutation<CompanyResponse, CompanyCreateDto>({
            query: (newCompany) => ({
                url: '/companies',
                method: 'POST',
                body: newCompany,
            }),
            invalidatesTags: ["Company"]
        }),

        updateCompany: builder.mutation<CompanyResponse, CompanyCreateDto>({
            query: (updatedCompany) => ({
                url: `/companies`,
                method: 'PUT',
                body: updatedCompany,
            }),
            invalidatesTags: ["Company"]
        }),

        softDeleteCompany: builder.mutation<CompanyResponse, string>({
            query: (id) => ({
                url: `/companies/softdelete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Company"]
        }),

        enableCompany: builder.mutation<CompanyResponse, string>({
            query: (id) => ({
                url: `/companies/enable/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ["Company"]
        }),

        disableCompany: builder.mutation<CompanyResponse, string>({
            query: (id) => ({
                url: `/companies/disable/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ["Company"]
        }),

        registerCompany: builder.mutation<CompanyResponse, RegisterCompanyDto>({
            query: (registerCompany) => ({
                url: '/companies/register',
                method: 'POST',
                body: registerCompany,
            }),
            invalidatesTags: ["Company"]
        }),
    }),

    overrideExisting: false,
})

export const {
    useListCompaniesQuery,
    useSearchCompanyQuery,
    useMiniSearchCompanyQuery,
    useGetCompanyQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useSoftDeleteCompanyMutation,
    useEnableCompanyMutation,
    useDisableCompanyMutation,
    useRegisterCompanyMutation
} = companyServerApi