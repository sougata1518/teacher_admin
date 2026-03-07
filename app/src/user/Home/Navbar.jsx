const Navbar = () => {
  return (
    <div className="w-full bg-white border-b px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">MyPlatform</h1>

      <div className="flex gap-6 text-gray-700 font-medium">
        <span className="cursor-pointer hover:text-blue-600">Courses</span>
        <span className="cursor-pointer hover:text-blue-600">Jobs</span>
      </div>

      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
    </div>
  );
};

export default Navbar;
