import { createApiClient, readApiConfig } from './client.ts'


export const apiClient = createApiClient(readApiConfig(import.meta.env ?? {}))
