// import SkeletonTable from "../../shared/components/SkeletonTable.tsx";
// import React, { useEffect, useState } from 'react';
// import { TypedUseQuery} from "@reduxjs/toolkit/query/react";
//
// type WithPaginationProps<N> = {
//     normalizedData: N[];
// };
//
// const WithPagination = <T,N>(
//     WrappedComponent: React.ComponentType<WithPaginationProps<N>>,
//     usePaginatedQuery: (page: number) => TypedUseQuery<T, number, any>
// ) => {
//     const [normalizedData, setNormalizedData] = useState<N[]>([]);
//     const [page, setPage] = useState<number>(1);
//
//     const { data, isFetching } = usePaginatedQuery(page);
//
//     const nextPage = () => {
//         setPage((prev) => prev + 1);
//     };
//
//     const prevPage = () => {
//         setPage((prev) => (prev > 1 ? prev - 1 : 1)); // No baja de 1
//     };
//
//     useEffect(() => {
//         if (data && !isFetching) {
//             setNormalizedData(data.listDataObject as unknown as N[]); // Asumiendo que la respuesta tiene una propiedad 'data'
//         }
//     }, [data, isFetching]);
//
//     if (isFetching) return <SkeletonTable />
//
//     return (
//         <>
//             <WrappedComponent normalizedData={normalizedData} />
//
//             <div className="flex mt-10 gap-5 justify-center">
//                 <button onClick={prevPage} disabled={page === 1}>
//                     Anterior
//                 </button>
//                 <button onClick={nextPage}>Siguiente</button>
//             </div>
//         </>
//     );
// };
//
// export default WithPagination;
//
