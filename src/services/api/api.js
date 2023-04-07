import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({

    reducerPath: 'test',
    tagTypes: ['getGastronimia'],
    baseQuery: fetchBaseQuery({
        baseUrl:'https://auditoriadeimagen-production.up.railway.app',
    }),
    endpoints: (builder) => ({
        getLocals: builder.query({
            query: () => "/locals",
          }),
        getLocalsbyId: builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/locals/${data.local_name}`
            }),
          }),
        postGastronomia: builder.mutation({
            query: (data) => ({
                    method: 'POST',
                    url:'/lists',
                    body:({
                        fecha:data.fecha,
                        horario:data.horario,
                        uso_marca_carteleria:data.uso_marca_carteleria,
                        visibilidad_marca:data.visibilidad_marca,
                        señales_informativas:data.señales_informativas,
                        cartel_horarios:data.cartel_horarios,
                        equipamiento_mobiliario:data.equipamiento_mobiliario,
                        muebles:data.muebles,
                        carta:data.carta,
                        iluminacion:data.iluminacion,
                        fachada:data.fachada,
                        pintura:data.pintura,
                        techos:data.techos,
                        pisos:data.pisos,
                        veredas:data.veredas,
                        mural:data.mural,
                        vidrieras:data.vidrieras,
                        resultado_suma:data.total,
                        resultado_media:data.total/15,
                        author_id:data.author_id,
                        author_name:data.author_name,
                        local_id:data.local_id,
                        local_name:data.local_name,
                        observaciones:data.observaciones
                    })
                }),
                invalidatesTags : ['getGastronimia']
            }),
        getGastronomia : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.sessionId}/${data.local_name}/${data.listId}`
            }),
            providesTags : ['getGastronimia']
        }),   
        getAllLists : builder.query({
            query: () => "/lists",
            providesTags : ['getGastronimia']
        }),  
        getListbyId : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.listId}`
            }),
            providesTags : ['getGastronimia']
        }),      
        getGastronomiabyLocal : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.sessionId}/${data.local_name}`
            }),
            providesTags : ['getGastronimia']
        }),
        getGastronomiaId : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.sessionId}`
            }),
            providesTags : ['getGastronimia']
        }),  
        login: builder.query({
            query:(data)=>({
                method: 'POST',
                url:'/users/login',
                body:({
                    email:data.email,
                    password:data.password
                })
            })
        })    
        })

}) 

export const {useGetLocalsQuery,usePostGastronomiaMutation,useLazyLoginQuery,
            useGetGastronomiaQuery,useGetGastronomiaIdQuery,useGetLocalsbyIdQuery,
            useGetGastronomiabyLocalQuery,useGetAllListsQuery,useGetListbyIdQuery} = api