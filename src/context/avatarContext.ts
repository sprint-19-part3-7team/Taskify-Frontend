import { createContext } from 'react';
import type { UserMe } from '@/types/user-me';

export const AvatarContext = createContext({} as UserMe);
