import { FaArrowRight } from "react-icons/fa";

const features = [
  {
    title: "Customizable Workflows",
    description:
      "Easily create and modify workflows to match your unique business processes, empowering you to adapt to changing requirements with ease. Utilize drag-and-drop functionality and customizable templates to design workflows that perfectly align with your team's workflow preferences.",
  },
  {
    title: "Real-time Collaborations",
    description:
      "Collaborate seamlessly with real-time updates, fostering a culture of transparency and accountability.",
  },
  {
    title: "Timely Data Insights",
    description:
      "Gain deep insights into your business operations with customizable analytics dashboards, providing actionable data to drive informed decision-making and identify areas for improvement. Via Visualization of key performance indicators (KPIs) to mitigate problems.",
  },
  {
    title: "Intelligent Automation",
    description:
      "Utilize AI algorithms to identify opportunities for automation and optimize workflows & productivity.",
  },
];

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="bg-gray-900 p-6 rounded-lg">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-400 mb-4">{description}</p>
    <a href="#" className="text-indigo-400 flex items-center">
      <span className="mr-1">
        Explore More
      </span>
      <FaArrowRight />
    </a>
  </div>
);

const Features = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Diverse Features
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-12">
          Explore our diverse features tailored to meet the dynamic needs of
          modern businesses.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
