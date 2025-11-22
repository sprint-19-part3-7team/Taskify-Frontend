import { useMemo } from 'react';
import DropdownMenuCheckItem from '@/components/dashboard/dropdown/DropdownMenuCheckItem';
import DropdownMenuCheckList from '@/components/dashboard/dropdown/DropdownMenuCheckList';
import DropdownMenuItem from '@/components/dashboard/dropdown/DropdownMenuItem';
import DropdownMenuList from '@/components/dashboard/dropdown/DropdownMenuList';
import DropdownMenuSearchTrigger from '@/components/dashboard/dropdown/DropdownMenuSearchTrigger';
import DropdownMenuTrigger from '@/components/dashboard/dropdown/DropdownMenuTrigger';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';
import useDropdownMenuState from '@/hooks/useDropdownMenuState';
import { cn } from '@/utils/cn';

interface DropdownMenuProps {
  children: React.ReactNode;
  value?: string;
  onChangeValue?: (value: string) => void;
  className?: string;
}

/**
 * DropdownMenu 컴포넌트는 드롭다운 UI의 루트 컨테이너입니다.
 *
 * 내부에서 드롭다운의 열림/닫힘 상태, 검색어, 선택된 값 등을 관리하며
 * 하위 컴포넌트에 Context 형태로 전달합니다.
 * 기본 width가 full로 설정되어 있어서 메뉴 리스트의 위치가 잘못 렌더링되고 있다면,
 * className props에 `w-fit`을 추가해주세요!
 *
 * @example
 * <DropdownMenu className={'w-fit'}>
 *   <DropdownMenu.Trigger>
 *     <Icons.KebabMore />
 *   </DropdownMenu.Trigger>
 *   <DropdownMenu.List>
 *     <DropdownMenu.Item onClick={() => console.log('편집')}>편집</DropdownMenu.Item>
 *     <DropdownMenu.Item onClick={() => console.log('삭제')}>삭제</DropdownMenu.Item>
 *   </DropdownMenu.List>
 * </DropdownMenu>
 */

export default function DropdownMenu({
  children,
  value,
  onChangeValue,
  className,
}: DropdownMenuProps) {
  const dropdownState = useDropdownMenuState();

  const contextValue = useMemo(
    () => ({
      selectedValue: value,
      setSelectedValue: onChangeValue,
      ...dropdownState,
    }),
    [value, onChangeValue, dropdownState]
  );

  return (
    <DropdownMenuContext value={contextValue}>
      <div className={cn('relative w-full', className)}>{children}</div>
    </DropdownMenuContext>
  );
}
/**
 * 드롭다운 메뉴 트리거 컴포넌트 입니다.
 * 
 * 클릭하면 드롭다운 메뉴 리스트가 보여집니다.
 * 
 * @example
 *  <DropdownMenu.Trigger ariaLabel='더보기 메뉴'>
      <Icons.KebabMore />
    </DropdownMenu.Trigger>
 */
DropdownMenu.Trigger = DropdownMenuTrigger;

/**
 * 드롭다운 메뉴 검색 트리거 컴포넌트 입니다.
 *
 * - 선택된 값이 없으면: placeholder 표시됩니다.
 * - 선택된 값이 있고 리스트가 닫혀있으면: 선택된 아이템의 children이 표시됩니다.
 * - 리스트가 열려있으면: 검색 가능한 input으로 변경됩니다.
 */
DropdownMenu.SearchTrigger = DropdownMenuSearchTrigger;

/**
 * 드롭다운 메뉴 리스트 컴포넌트입니다.
 * 
 * 내부에는 반드시 `DropdownMenu.Item` 컴포넌트만 자식으로 전달해야 합니다.
 * 
 * @example
 *  <DropdownMenu.List>
      <DropdownMenu.Item>...</DropdownMenu.Item>
    </DropdownMenu.List>
 */
DropdownMenu.List = DropdownMenuList;

/**
 * 드롭다운 메뉴 아이템 컴포넌트입니다.
 *
 * 메뉴명, 메뉴를 클릭했을 때 실행할 함수를 전달합니다.
 *
 * @example
 *  <DropdownMenu.Item onClick={함수}>메뉴명</DropdownMenu.Item>
 */
DropdownMenu.Item = DropdownMenuItem;

/**
 * 드롭다운 메뉴에서 체크 가능한 아이템들을 감싸는 리스트 컴포넌트입니다.
 *
 * 내부에는 반드시 `DropdownMenu.CheckItem` 컴포넌트만 자식으로 전달해야 합니다.
 *
 * @example
 *  <DropdownMenu.CheckList>
 *    <DropdownMenu.CheckItem value="홍길동">...</DropdownMenu.CheckItem>
 *  </DropdownMenu.CheckList>
 */
DropdownMenu.CheckList = DropdownMenuCheckList;

/**
 * 드롭다운 메뉴에서 선택 가능한 체크 아이템 컴포넌트입니다.
 *
 * 선택 시 부모 `DropdownMenu`에 설정된 value/onValueChange를 통해 선택 값이 반영됩니다.
 *
 * @example
 *  <DropdownMenu.CheckItem value="홍길동">
 *    홍길동
 *  </DropdownMenu.CheckItem>
 */
DropdownMenu.CheckItem = DropdownMenuCheckItem;
