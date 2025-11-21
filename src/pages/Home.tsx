import ImageUpload from '@/components/common/ImageUploader';
export default function App() {
  return (
    <div className='flex flex-col gap-8 p-8'>
      <div>
        <ImageUpload size='Small' />
      </div>

      <div>
        <ImageUpload size='Large' />
      </div>
      <div className='flex flex-col gap-5 bg-base p-8'>
        <ImageUpload />
      </div>
    </div>
  );
}
