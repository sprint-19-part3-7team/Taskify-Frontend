import { useRef, useState, useEffect } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';

type ImageUploadProps = {
  size?: 'Small' | 'Large';
  onFileChange?: (file: File | null) => void;
};

/**
 * 이미지 폼 공통 컴포넌트
 *
 * Small / Large 크기 선택 가능합니다.
 * 이미지를 제거할 수도 있으며, 닫기 버튼은 업로드된 이미지 위에 표시됩니다.
 *
 * @example
 * <ImageUpload size="Small" />
 * <ImageUpload size="Large" />
 */

export default function ImageUpload({ size = 'Small', onFileChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleButtonClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onFileChange?.(selectedFile);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onFileChange?.(null);
  };

  // Blob URL 생성 및 클린업
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!file) {
        setPreview(null);
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
    }, 0);

    return () => clearTimeout(timeout);
  }, [file]);

  return (
    <div className='relative inline-block'>
      <button
        className={cn(
          'flex cursor-pointer items-center justify-center overflow-hidden rounded-md bg-gray-200',
          size === 'Small' && 'h-[58px] w-[58px] sm:h-[76px] sm:w-[76px]',
          size === 'Large' && 'h-[100px] w-[100px] sm:h-[182px] sm:w-[182px]'
        )}
        onClick={handleButtonClick}
        type='button'
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {!preview && <Icons.Plus className='h-7 w-7 text-violet-500' />}
      </button>

      {preview && (
        <button
          onClick={handleRemoveImage}
          type='button'
          className='absolute top-1 right-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-600'>
          <Icons.Close className='text-white h-4 w-4 text-gray-0' />
        </button>
      )}

      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  );
}
