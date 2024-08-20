import { FaCheckCircle } from 'react-icons/fa';

const pricingPlans = [
  {
    title: 'Basic',
    price: '$99',
    features: ['24/7 AI driven assistance', 'Basic issue resolution support'],
  },
  {
    title: 'Premium',
    price: '$299',
    features: [
      '24/7 AI driven assistance',
      'Basic issue resolution support',
      'Advanced reporting',
      'Priority Analytics',
    ],
  },
  {
    title: 'Advanced',
    price: '$499',
    features: [
      '24/7 AI driven assistance',
      'Basic issue resolution support',
      'Dedicated Access',
      'Priority access to new features',
    ],
  },
];

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

const PricingCard = ({ title, price, features }: PricingCardProps) => (
  <div className="flex flex-col bg-gray-900 p-6 md:p-8 rounded-lg shadow-md">
    <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
    <div className="text-3xl md:text-4xl font-bold mb-4">
      {price}
      <span className="text-base md:text-xl font-medium">/Month</span>
    </div>
    <ul className="flex-1 text-gray-400 mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <FaCheckCircle className="text-indigo-400" />
          <span className="ml-2">{feature}</span>
        </li>
      ))}
    </ul>
    <button className="bg-white text-black py-2 px-6 rounded-full hover:bg-gray-300 transition duration-300">
      Get Started
    </button>
  </div>
);

const Pricing = () => (
  <div className="container mx-auto p-6 md:p-12">
    <div className="text-center mt-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Plans & Billing</h1>
      <p className="text-base md:text-lg text-gray-400 mb-12">
        Explore our diverse plans tailored to meet the dynamic needs of modern businesses.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pricingPlans.map((plan, index) => (
        <PricingCard key={index} title={plan.title} price={plan.price} features={plan.features} />
      ))}
    </div>
  </div>
);

export default Pricing;
