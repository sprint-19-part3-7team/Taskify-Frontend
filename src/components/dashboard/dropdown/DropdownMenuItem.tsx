import useDropdownMenuContext from '@/hooks/useDropdownMenuContext';

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function DropdownMenuItem({ children, onClick }: DropdownMenuItemProps) {
  const { isOpen, setIsOpen } = useDropdownMenuContext();

  const handleClickMenuItem = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <li
      role='menuitem'
      tabIndex={0}
      className='dropdown-menu-item-base py-1 text-center font-md-regular hover:bg-violet-500-8 hover:text-violet-500'
      onClick={handleClickMenuItem}>
      {children}
    </li>
  );
}
