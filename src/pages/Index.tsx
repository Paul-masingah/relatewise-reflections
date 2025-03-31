
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading Relatewise...</h1>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-relationship-main animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-relationship-main animate-pulse animation-delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-relationship-main animate-pulse animation-delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
