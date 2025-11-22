import React from 'react';
import AvatarFallback from '@/components/common/Avatar/AvatarFallback';
import AvatarImg from '@/components/common/Avatar/AvatarImg';
import { AvatarContext } from '@/context/avatarContext';
import type { UserMe } from '@/types/user-me';
import { cn } from '@/utils/cn';

interface AvatarProps {
  children: React.ReactNode;
  size: 's' | 'm';
  user: UserMe;
}

/**
 * @example
 * <Avatar size="s" user={user}>
 *  <AvatarImg />
 *  <AvatarFallback />
 * </Avatar>
 */

export default function Avatar({ children, size, user }: AvatarProps) {
  const AvatarStyle = cn('rounded-full overflow-hidden', {
    'w-[24px] h-[24px] ': size === 's',
    'w-[38px] h-[38px] border-2 border-gray-0': size === 'm',
  });
  //children 중 AvatarImg 태그
  const img = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarImg
  );
  //children 중 AvatarFallback 태그
  const fallback = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarFallback
  );
  return (
    <AvatarContext value={user}>
      <div className={AvatarStyle}>{user.profileImageUrl ? img : fallback}</div>
    </AvatarContext>
  );
}

Avatar.AvatarImg = AvatarImg;

Avatar.AvatarFallback = AvatarFallback;

//TODO: 이미지에 오류가 생겼을 때 AvatarFallback 노출하기
