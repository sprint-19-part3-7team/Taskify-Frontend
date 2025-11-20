import { COLORS } from '@/constants/color';

export const getMonogram = (nickname: string) => {
  if (!nickname) {
    return '';
  }
  return nickname[0];
};

export const getProfileColorForId = (userId: number) => {
  const idx = userId % COLORS.length;
  return COLORS[idx];
};
