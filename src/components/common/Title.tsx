/**
 * Title 컴포넌트
 *
 * Tailwind 기반의 공통 타이틀 컴포넌트입니다.
 * h2~h6 태그 선택 가능하며, size, weight, color prop으로 스타일링 가능합니다.
 *
 * @example
 * <Title as="h3" size="2xl" weight="medium" color="--color-violet-500">
 *   보라색 타이틀
 * </Title>
 *
 */

interface TitleProps {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
  size?: '3xl' | '2xl' | 'xl' | '2lg' | 'lg' | 'md' | 'sm' | 'xs';
  weight?: 'bold' | 'semibold' | 'medium' | 'regular';
  color?: string;
}

function Title({
  as: Component = 'h2',
  children,
  className = '',
  size = '2xl',
  weight = 'regular',
  color = '--color-gray-700',
}: TitleProps) {
  const twClass = `font-${size}-${weight} ${className}`;
  return (
    <Component className={twClass} style={{ color: `var(${color})` }}>
      {children}
    </Component>
  );
}

export default Title;
