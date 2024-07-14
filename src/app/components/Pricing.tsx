import { FaCheckCircle } from 'react-icons/fa';

const pricingPlans = [
  {
    title: "Basic",
    price: "$99",
    features: ["24/7 AI driven assistance", "Basic issue resolution support"],
  },
  {
    title: "Premium",
    price: "$299",
    features: [
      "24/7 AI driven assistance",
      "Basic issue resolution support",
      "Advanced reporting",
      "Priority Analytics",
    ],
  },
  {
    title: "Advanced",
    price: "$499",
    features: [
      "24/7 AI driven assistance",
      "Basic issue resolution support",
      "Dedicated Access",
      "Priority access to new features",
    ],
  },
];

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

const PricingCard = ({ title, price, features }: PricingCardProps) => (
  <div className="flex flex-col bg-gray-900 p-8 rounded-lg">
    <h2 className="shrink-0 text-2xl font-semibold mb-4">{title}</h2>
    <div className="text-4xl font-bold mb-4">
      {price}
      <span className="text-xl font-medium">/Month</span>
    </div>
    <ul className="grow-1 h-full text-gray-400 mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <FaCheckCircle />
          <span className="ml-1">
            {feature}
          </span>
        </li>
      ))}
    </ul>
    <button className="shrink-0 w-full bg-white text-black py-2 font-medium rounded-full hover:bg-gray-300">
      Get Started
    </button>
  </div>
);

const Pricing = () => (
  <div className="container mx-auto p-6">
    <div className="text-center mt-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Plans & Billing</h1>
      <p className="text-lg md:text-xl text-gray-400 mb-12">
        Explore our diverse features tailored to meet the dynamic needs of
        modern businesses.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pricingPlans.map((plan, index) => (
        <PricingCard
          key={index}
          title={plan.title}
          price={plan.price}
          features={plan.features}
        />
      ))}
    </div>
  </div>
);

export default Pricing;

