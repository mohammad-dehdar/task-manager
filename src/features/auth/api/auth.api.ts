import { api } from '@/utils';

import type { AuthResponse, LoginDto, RegisterDto } from '../types';

export const authApi = {
  login: (dto: LoginDto) =>
    api.post<AuthResponse>('/auth/login', dto).then((r) => r.data),

  register: (dto: RegisterDto) =>
    api.post<AuthResponse>('/auth/register', dto).then((r) => r.data),

  logout: () => api.post('/auth/logout'),

  refreshToken: (token: string) =>
    api.post<AuthResponse>('/auth/refresh', { token }).then((r) => r.data),

  getMe: () => api.get('/auth/me').then((r) => r.data),
};
