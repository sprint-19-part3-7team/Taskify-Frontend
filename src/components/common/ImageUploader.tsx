import type { ComponentPropsWithoutRef } from 'react';
import PlusIcon from '@/assets/icons/dashboard/ic-plus.svg'; // SVG import
import { cn } from '@/utils/cn';

type ButtonProps = {
  size?: 'Small' | 'Large';
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

const sizeStyles: Record<'Small' | 'Large', string> = {
  Small: 'w-[76px] h-[76px] p-[24px]',
  Large: 'w-[182px] h-[182px] p-[76px]',
};

const iconStyle = 'w-7 h-7 text-violet-500';
const buttonStyle = 'bg-gray-200 rounded-md flex items-center justify-center';

export function Button({ size = 'Small', className, ...rest }: ButtonProps) {
  return (
    <button className={cn(buttonStyle, sizeStyles[size], className)} {...rest}>
      <PlusIcon className={cn(iconStyle)} />
    </button>
  );
}
