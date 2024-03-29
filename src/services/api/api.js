import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({

    reducerPath: 'test',
    tagTypes: ['getGastronimia','putAudit','putAudit2'],
    baseQuery: fetchBaseQuery({
        // 192.168.65.110
        // 192.168.100.10
        // 192.168.100.23
        baseUrl:'https://auditodb-production.up.railway.app',
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
                        media:data.media,
                        total:data.total,
                        author_id:data.author_id,
                        author_name:data.author_name,
                        local_id:data.local_id,
                        local_name:data.local_name,
                        observaciones:data.observaciones,
                        incidents:data.incidents,
                        image:data.image
                    })
                }),
                invalidatesTags : ['getGastronimia']
            }),
        getGastronomia : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.sessionId}/${data.local_name}/${data.listId}`
            }),
            providesTags : ['getGastronimia','putAudit']
        }),   
        getAllLists : builder.query({
            query: () => "/lists",
            providesTags : ['getGastronimia','putAudit']
        }),  
        getListbyId : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.listId}`
            }),
            providesTags : ['getGastronimia','putAudit']
        }),      
        getListsByLocal: builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.sessionId}/${data.local_name}`
            }),
            providesTags : ['getGastronimia','putAudit']
        }),
        getGastronomiaId : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/lists/${data.sessionId}`
            }),
            providesTags : ['getGastronimia','putAudit']
        }),  
        getIncidents : builder.query({
            query:(data)=>({
                method: 'GET',
                url:`/incidents/${data.name}`
            }),
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
        }),
        postLocal: builder.mutation({
            query:(data)=>({
                method: 'POST',
                url:'/locals',
                body:({
                    name:data.name,
                    location:data.location,
                    provincia:data.provincia,
                    localidad:data.localidad,
                    item:data.item
                })
            })
        }),
        postAccount: builder.mutation({
            query:(data)=>({
                method: 'POST',
                url:'/users',
                body:({
                    name:data.name,
                    email:data.email,
                    password:data.password,
                    type:data.type,
                })
            })
        }),
        sendComment: builder.mutation({
            query:(data)=>({
                method: 'PUT',
                url:'/lists',
                body:({
                    listId:data.listId,
                    comment:data.comment,
                    toChange:data.toChange,
                    change:data.change,
                    image:data.image
                })
            }),
            invalidatesTags : ['putAudit']
        }),
        putIncidents: builder.mutation({
            query:(data)=>({
                method: 'PUT',
                url:`/lists/${data.sessionId}/${data.local_name}/${data.listId}`,
                body:({
                    incidents:data.incidents,
                    change:data.change,
                    total:data.total,
                    media:data.media,
                })
            }),
            invalidatesTags : ['putAudit']
        }),      
        })

}) 

export const {useGetLocalsQuery,usePostGastronomiaMutation,useLazyLoginQuery,
            useGetGastronomiaQuery,useGetGastronomiaIdQuery,useGetLocalsbyIdQuery,
            useGetListsByLocalQuery,useGetAllListsQuery,useGetListbyIdQuery,
            useSendCommentMutation,usePutIncidentsMutation,useGetIncidentsQuery,
            usePostLocalMutation,usePostAccountMutation} = api