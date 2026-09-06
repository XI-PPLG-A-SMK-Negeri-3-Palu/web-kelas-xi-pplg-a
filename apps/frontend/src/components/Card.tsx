import { Link } from 'react-router-dom';

interface CardProps {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  href?: string;
}

function CardBody({ imageUrl, title, subtitle }: Omit<CardProps, 'href'>) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary-500 transition-colors">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full aspect-square object-cover" />
      ) : (
        <div className="w-full aspect-square bg-primary-100 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary-600">{title.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-title">{title}</h3>
        {subtitle && <p className="text-sm text-subtitle mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function Card({ href, ...props }: CardProps) {
  if (href) {
    return (
      <Link to={href} className="block">
        <CardBody {...props} />
      </Link>
    );
  }
  return <CardBody {...props} />;
}
