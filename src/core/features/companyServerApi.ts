import {serverApi} from "../serverApi.ts";
import {CompanyResponse} from "../models/responses/company.response.ts";
import {CompanyCreateDto} from "../models/dtos/companies/companyCreateDto.ts";
import {RegisterCompanyDto} from "../models/dtos/companies/registerCompanyDto.ts";

const companyServerApi = serverApi.injectEndpoints({
    endpoints: builder => ({

        // Para listas con paginacion
        listCompanies: builder.query<CompanyResponse, number>({
            query: (page) => `companies?page=${page}`
        }),

        // Para listas con busqueda y paginacion
        searchCompany: builder.query<CompanyResponse, { page: number, term: string }>({
            query: ({page, term}) => `companies?page=${page}&search=${term}`
        }),

        // Para busquedas en formularios y selects
        miniSearchCompany: builder.query<CompanyResponse, string>({
            query: (term) => `companies/${term}`
        }),

        getCompany: builder.query<CompanyResponse, string>({
            query: (id) => `companies/${id}`
        }),

        createCompany: builder.mutation<CompanyResponse, CompanyCreateDto>({
            query: (newCompany) => ({
                url: '/companies',
                method: 'POST',
                body: newCompany,
            }),
        }),

        updateCompany: builder.mutation<CompanyResponse, CompanyCreateDto>({
            query: (updatedCompany) => ({
                url: `/companies`,
                method: 'PUT',
                body: updatedCompany,
            }),
        }),

        softDeleteCompany: builder.mutation<CompanyResponse, string>({
            query: (id) => ({
                url: `/companies/softdelete/${id}`,
                method: 'DELETE',
            }),
        }),

        enableCompany: builder.mutation<CompanyResponse, string>({
            query: (id) => ({
                url: `/companies/enable/${id}`,
                method: 'POST',
            }),
        }),

        disableCompany: builder.mutation<CompanyResponse, string>({
            query: (id) => ({
                url: `/companies/disable/${id}`,
                method: 'POST',
            }),
        }),

        registerCompany: builder.mutation<CompanyResponse, RegisterCompanyDto>({
            query: (registerCompany) => ({
                url: '/companies/register',
                method: 'POST',
                body: registerCompany,
            }),
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