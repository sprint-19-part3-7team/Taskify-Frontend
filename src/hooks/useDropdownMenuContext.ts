import { useContext } from 'react';
import { DropdownMenuContext, type DropdownMenuContextType } from '@/context/dropdownMenuContext';

const useDropdownMenuContext = (): DropdownMenuContextType => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error('DropdownMenuContext 안에서 사용하세요.');
  }

  return context;
};

export default useDropdownMenuContext;
