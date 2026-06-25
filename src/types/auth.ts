
export interface User {
  id: string;
  email: string;
  role: 'advertiser' | 'service_provider';
  full_name: string;
  is_agency: boolean;
  agency_name?: string;
  team_member_count?: number;
  agency_description?: string;
  work_channels?: string[];
  created_at: string;
  email_verified: boolean;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  role: 'advertiser' | 'service_provider';
  is_agency: boolean;
  agency_name?: string;
  team_member_count?: number | undefined;
  agency_description?: string;
  work_channels?: string[];
}