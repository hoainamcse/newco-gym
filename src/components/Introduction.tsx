import Link from 'next/link';

const Introduction = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4">
        Efficiency At Your Fingertips
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-lg lg:max-w-2xl">
        With SaaStream, efficiency becomes second nature, allowing you to focus on what truly
        matters in your business journey.
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link href="/connectors">
          <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-gray-300 transition duration-300">
            Get Started
          </button>
        </Link>
        <Link href="/mail">
          <button className="bg-transparent border border-white text-white py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300">
            View Demo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Introduction;
