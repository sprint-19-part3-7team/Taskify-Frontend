import { useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/dashboard/ic-close.svg';
import PlusIcon from '@/assets/icons/dashboard/ic-plus.svg';
import { cn } from '@/utils/cn';

type ImageUploadProps = {
  size?: 'Small' | 'Large'; // 버튼 크기 선택
};

/**
 * ImageUpload 컴포넌트
 *
 * 단일 이미지 업로드용 버튼 컴포넌트입니다.
 * Small / Large 크기 선택 가능하며, 이미지가 선택되면 버튼 배경에 미리보기가 표시됩니다.
 * 이미지를 제거할 수도 있으며, 닫기 버튼은 업로드된 이미지 위에 표시됩니다.
 *
 * @example
 * <ImageUpload size="Small" />
 * <ImageUpload size="Large" />
 */

export function ImageUpload({ size = 'Small' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null); // 선택한 이미지의 URL 저장

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => inputRef.current?.click();

  // 파일 선택 후 실행
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  // 파일 제거 버튼
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버튼 클릭이 부모 클릭으로 전달되는 것 방지
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = ''; // 파일 input 값 리셋
    }
  };

  // 버튼 크기 스타일 정의
  const buttonSizes = {
    Small: 'w-19 h-19 p-0',
    Large: 'w-45 h-45 p-0',
  };

  return (
    <div className={cn('relative inline-block')}>
      {/* 이미지 선택 버튼 */}
      <button
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-md bg-gray-200',
          buttonSizes[size]
        )}
        onClick={handleButtonClick}
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {!preview && <PlusIcon className={cn('h-7 w-7 text-violet-500')} />}
      </button>

      {/* 이미지가 있으면 닫기 버튼 표시 */}
      {preview && (
        <button
          onClick={handleRemoveImage}
          className={cn(
            'absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600'
          )}>
          <CloseIcon className={cn('text-white h-4 w-4 text-gray-0')} />
        </button>
      )}

      {/* 실제 파일 input (화면에는 숨김) */}
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
