import Icons from '@/assets/icons';
import useDropdownMenuContext from '@/hooks/useDropdownMenuContext';

export interface DropdownMenuCheckItemProps {
  children: React.ReactNode;
  value: string;
}

export default function DropdownMenuCheckItem({ children, value }: DropdownMenuCheckItemProps) {
  const { selectedValue, setSelectedValue, setIsOpen, setSearchQuery, setSelectedNode } =
    useDropdownMenuContext();

  const isSelected = selectedValue === value;

  const handleListClick = () => {
    if (isSelected) {
      setSelectedValue?.('');
      setSelectedNode(null);
    } else {
      setSelectedValue?.(value);
      setSelectedNode(children);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <li
      className='relative flex h-12 dropdown-menu-item-base items-center gap-2 pl-[46px] hover:bg-gray-100'
      onClick={handleListClick}>
      {isSelected && (
        <Icons.Check width={22} height={22} className='absolute left-4 text-gray-500' />
      )}
      {children}
    </li>
  );
}
