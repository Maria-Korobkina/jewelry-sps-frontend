export interface User { id: number; email: string; first_name: string; last_name: string; date_joined: string }
export interface LoginInput { email: string; password: string }
export interface RegisterInput extends LoginInput { first_name?: string }
export interface Tokens { access: string; refresh?: string }
export interface AuthResponse { user: User; access: string; refresh: string }
import type { DesignSnapshot, SimilarSnapshot } from './resultContracts.ts'
export interface SavedRouteSummary { id: string; run_id: string; scenario: string; scenario_title: string; steps_count: number; kind: 'steps' | 'design' | 'similar_products'; created_at: string; updated_at: string }
export interface RouteLink { label: string; kind: string; target: string }
export interface RouteStep { number: string; title: string; body: string; links: RouteLink[] }
export interface SavedRoute { id: string; run_id: string; scenario: string; scenario_title: string; schema_version: number; is_saved: boolean; kind: 'steps' | 'design' | 'similar_products'; steps: RouteStep[]; result: DesignSnapshot | SimilarSnapshot | null }
export interface Page<T> { count: number; next: string | null; previous: string | null; results: T[] }
export interface ApiConfig { enabled: boolean; baseUrl: string }
export interface AuthState { status: 'disabled' | 'anonymous' | 'restoring' | 'authenticated'; user: User | null; message: string }
