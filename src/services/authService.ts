import { DEMO_USERS } from './auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in demo users
    const user = DEMO_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Generate mock token
    const token = btoa(`${user.id}-${Date.now()}`);
    
    const authUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      token
    };
    
    // localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(authUser));
    
    return authUser;
  },
  
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    if (!userStr || !token) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
};
