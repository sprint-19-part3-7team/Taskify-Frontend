import { useEffect, useRef } from 'react';
import Icons from '@/assets/icons';
import useDropdownMenuContext from '@/hooks/useDropdownMenuContext';
import { cn } from '@/utils/cn';

interface DropdownMenuSearchTriggerProps {
  placeholder: string;
  name: string;
}

export default function DropdownMenuSearchTrigger({
  placeholder,
  name,
}: DropdownMenuSearchTriggerProps) {
  const { isOpen, setIsOpen, searchQuery, setSearchQuery, selectedNode } = useDropdownMenuContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };

  return (
    <div
      role='combobox'
      aria-expanded={isOpen}
      aria-haspopup='listbox'
      aria-label='검색 및 선택'
      tabIndex={0}
      className='flex h-[48px] w-full cursor-pointer justify-between rounded-md border border-gray-300 bg-gray-0 px-[16px] py-[11px] focus-within:border-primary'
      onClick={handleTriggerClick}>
      {isOpen ? (
        <input
          ref={inputRef}
          type='text'
          name={name}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className='w-full focus:outline-0'
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <>
          {selectedNode ? (
            <div className='flex items-center gap-2'>{selectedNode}</div>
          ) : (
            <span className='text-gray-400'>{placeholder}</span>
          )}
        </>
      )}
      <Icons.ArrowDropdown
        className={cn('text-gray-700', {
          'rotate-180': isOpen,
        })}
      />
    </div>
  );
}
