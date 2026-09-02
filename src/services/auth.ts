import { apiRequest } from './api'
import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from '../types/auth'

export function registerUser(
  data: RegisterRequest,
) {
  return apiRequest<unknown>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function loginUser(
  data: LoginRequest,
) {
  return apiRequest<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}