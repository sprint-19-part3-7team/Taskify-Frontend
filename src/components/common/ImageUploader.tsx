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

export function ImageUpload({ size = 'Small', onFileChange }: ImageUploadProps) {
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
    let url: string | null = null;
    let id: number;

    if (file) {
      url = URL.createObjectURL(file);

      // setPreview를 비동기적으로 처리
      id = setTimeout(() => setPreview(url), 0);
    } else {
      // file이 null이면 preview도 null, 비동기 처리
      id = setTimeout(() => setPreview(null), 0);
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  return (
    <div className='relative inline-block'>
      <button
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-md bg-gray-200',
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
          className={cn(
            'absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600'
          )}>
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
