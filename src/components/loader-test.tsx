import Loader from './ui/loader';

export default function LoaderTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">Loader Test</h1>
        <Loader />
        <p className="mt-4 text-gray-600">Testing the styled-components loader</p>
      </div>
    </div>
  );
}
