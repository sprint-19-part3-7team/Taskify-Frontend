import { useContext } from 'react';
import { AvatarContext } from '@/context/avatarContext';

export default function AvatarImg() {
  const { profileImageUrl, nickname } = useContext(AvatarContext);
  return (
    <img
      className='h-full w-full object-cover'
      src={profileImageUrl as string}
      alt={`${nickname}님의 프로필`}
    />
  );
}
