const error = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-4 text-gray-700">
            There was an issue loading your profile. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default error;
