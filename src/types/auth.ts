import type { User } from '@supabase/supabase-js';
import type { AppRole } from './database.types';

export interface AppUserSession {
  user: User;
  roles?: AppRole[];
  centreIds?: string[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
