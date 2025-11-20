import { useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/dashboard/ic-close.svg';
import PlusIcon from '@/assets/icons/dashboard/ic-plus.svg';
import { cn } from '@/utils/cn';

type ImageUploadProps = {
  size?: 'Small' | 'Large'; // 버튼 크기 선택
};

export function ImageUpload({ size = 'Small' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null); // 선택한 이미지의 URL 저장

  // 파일 제거 버튼
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => inputRef.current?.click();

  // 파일 선택 후 실행
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0]; // 선택된 파일 중 첫 번째 파일만 사용
    const url = URL.createObjectURL(file); // 브라우저에서 보여줄 URL 생성
    setPreview(url);
  };

  // 버튼 크기 스타일 정의
  const buttonSizes = {
    Small: 'w-19 h-19 p-0',
    Large: 'w-45 h-45 p-0',
  };

  return (
    <div>
      {/* 이미지 선택 버튼 */}
      <button
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-md bg-gray-200', // 버튼 기본 스타일
          buttonSizes[size] // 버튼 크기 적용
        )}
        onClick={handleButtonClick} // 클릭 시 파일 선택
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined, // 선택된 이미지가 있으면 배경으로 표시
          backgroundSize: 'cover', // 배경 이미지를 버튼에 꽉 차게 맞춤
          backgroundPosition: 'center', // 이미지 중앙 정렬
        }}>
        {/* 이미지가 없을 때만 + 아이콘 표시 */}
        {!preview && <PlusIcon className={cn('h-7 w-7 text-violet-500')} />}
      </button>

      {/* 닫기 버튼*/}
      {preview && (
        <button onClick={handleRemoveImage} className={cn('h-4 w-4 rounded-full bg-gray-600')}>
          <CloseIcon className={cn('h-4 w-4 flex-shrink-0 text-gray-0')} />
        </button>
      )}

      {/* 실제 파일 input은 화면에 표시하지 않고 숨김 */}
      <input
        type='file'
        accept='image/*' // 이미지 파일만 선택 가능
        ref={inputRef} // 버튼 클릭 시 접근
        onChange={handleFileChange} // 파일 선택 시 실행
        className='hidden' // 화면에는 표시하지 않음
      />
    </div>
  );
}
