/**
 * Title 컴포넌트
 *
 * Tailwind 기반의 공통 타이틀 컴포넌트입니다.
 * h2~h6 태그 선택 가능하며, size, weight, color prop으로 스타일링 가능합니다.
 *
 * Tailwind는 동적 문자열 클래스는 적용되지 않기 때문에
 * size와 weight에 따라 정적 매핑을 사용합니다.
 *
 * @example
 * <Title as="h3" size="2xl" weight="medium" color="--color-violet-500">
 *   보라색 타이틀
 * </Title>
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
  // Tailwind @utility 클래스명을 정적 매핑
  const classMap: Record<string, string> = {
    '3xl-bold': 'font-3xl-bold',
    '3xl-semibold': 'font-3xl-semibold',
    '3xl-medium': 'font-3xl-medium',
    '3xl-regular': 'font-3xl-regular',

    '2xl-bold': 'font-2xl-bold',
    '2xl-semibold': 'font-2xl-semibold',
    '2xl-medium': 'font-2xl-medium',
    '2xl-regular': 'font-2xl-regular',

    'xl-bold': 'font-xl-bold',
    'xl-semibold': 'font-xl-semibold',
    'xl-medium': 'font-xl-medium',
    'xl-regular': 'font-xl-regular',

    '2lg-bold': 'font-2lg-bold',
    '2lg-semibold': 'font-2lg-semibold',
    '2lg-medium': 'font-2lg-medium',
    '2lg-regular': 'font-2lg-regular',

    'lg-bold': 'font-lg-bold',
    'lg-semibold': 'font-lg-semibold',
    'lg-medium': 'font-lg-medium',
    'lg-regular': 'font-lg-regular',

    'md-bold': 'font-md-bold',
    'md-semibold': 'font-md-semibold',
    'md-medium': 'font-md-medium',
    'md-regular': 'font-md-regular',

    'sm-semibold': 'font-sm-semibold',
    'sm-medium': 'font-sm-medium',

    'xs-semibold': 'font-xs-semibold',
    'xs-medium': 'font-xs-medium',
    'xs-regular': 'font-xs-regular',
  };

  const appliedClass = classMap[`${size}-${weight}`] || '';

  return (
    <Component className={`${appliedClass} ${className}`} style={{ color: `var(${color})` }}>
      {children}
    </Component>
  );
}

export default Title;
