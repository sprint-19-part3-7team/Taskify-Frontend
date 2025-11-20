import { Link } from 'react-router';
import ArrowLeft from '@/assets/icons/dashboard/ic-arrow-left.svg';
import ArrowRight from '@/assets/icons/dashboard/ic-arrow-right.svg';
import { cn } from '@/utils/cn';

type PageNationProps = {
  prev?: string;
  next?: string;
  className?: string;
};

const baseButtonStyle =
  'flex h-10 w-10 items-center justify-center border text-gray-300 transition-colors hover:border-gray-300 hover:bg-violet-500/10 hover:text-primary';

export function PageNation({ prev, next, className }: PageNationProps) {
  return (
    <div className={cn('mt-8 flex h-10 w-20 items-center justify-between', className)}>
      {/* 이전 버튼 */}
      {prev ? (
        <Link to={prev} className={cn(baseButtonStyle, 'rounded-tl-[4px] rounded-bl-[4px]')}>
          <ArrowLeft className='h-6 w-6' aria-label='이전 페이지' />
        </Link>
      ) : (
        <div className='h-10 w-10' /> //fallback
      )}

      {/* 다음 버튼 */}
      {next ? (
        <Link to={next} className={cn(baseButtonStyle, 'rounded-tr-[4px] rounded-br-[4px]')}>
          <ArrowRight className='h-6 w-6' aria-label='다음 페이지' />
        </Link>
      ) : (
        <div className='h-10 w-10' /> //fallback
      )}
    </div>
  );
}
