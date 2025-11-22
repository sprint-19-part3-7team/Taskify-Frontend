import ModalPortal from '@/components/common/BaseModal/ModalPortal';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

type BaseModalFrameProps = {
  size?: 'Login' | 'Account'; // Login: 로그인 페이지 Account: 계정 관리 페이지
  children: string;
  className?: string;

  setOnModal: (state: boolean) => void;
};
/**
 * BaseModalFrame 컴포넌트 (공통 모달)
 *
 * - size Prop으로 "Login" / "Account" 타입을 선택할 수 있으며, 크기와 스타일이 달라집니다.
 * - children Prop으로 모달 내부에 표시할 내용을 전달할 수 있습니다.
 * - setOnModal Prop으로 부모에서 모달 열림/닫힘 상태를 제어합니다.
 *
 * 사용 예시:
 *   const [onModal, setOnModal] = useState(false);
 *
 *   {isModalOpen && (
 *     <BaseModalFrame size="Login" setOnModal={setOnModal}>
 *       로그인 하시겠습니까?
 *     </BaseModalFrame>
 *   )}
 *
 *   <Button onClick={() => setOnModal(true)}>모달 열기</Button>
 */
export default function BaseModalFrame({
  size = 'Login',
  children,
  setOnModal,
}: BaseModalFrameProps) {
  return (
    <ModalPortal>
      <div className='fixed inset-0 flex items-center justify-center bg-gray-900/70'>
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-8 bg-gray-200 text-center text-gray-700',
            size === 'Login'
              && 'h-[220px] w-[327px] rounded-lg font-lg-medium sm:h-[192px] sm:w-[368px] sm:rounded-2xl sm:font-xl-medium',
            size === 'Account'
              && 'h-[164px] w-[272px] rounded-2xl font-lg-medium sm:h-[192px] sm:w-[368px] sm:font-xl-medium'
          )}>
          {children}
          <Button
            theme='primary'
            disabled={false}
            className={cn(
              'flex-none',
              size === 'Login'
                && 'h-[42px] w-[138px] font-md-semibold sm:h-[48px] sm:w-[240px] sm:font-lg-semibold',
              size === 'Account'
                && 'h-[42px] w-[192px] font-md-semibold sm:h-[48px] sm:w-[240px] sm:font-lg-semibold'
            )}
            onClick={() => setOnModal(false)}>
            확인
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
}
