import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, List, Grid, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

const PhoneList: React.FC = () => {
  const { phoneModels } = useData();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPhones = phoneModels.filter(phone =>
    phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePhoneClick = (phoneName: string) => {
    navigate(`/phone/${encodeURIComponent(phoneName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Modelos de Teléfonos
        </h1>
        
        {/* Search and View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {filteredPhones.length === 0 ? (
        <div className="text-center py-12">
          <Smartphone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No se encontraron modelos' : 'No hay modelos disponibles'}
          </h3>
          <p className="text-gray-500">
            {searchTerm 
              ? 'Intenta con otro término de búsqueda'
              : 'Carga un archivo Excel para ver los modelos disponibles'
            }
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredPhones.map((phone) => (
            <div
              key={phone.name}
              onClick={() => handlePhoneClick(phone.name)}
              className={`
                bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer
                ${viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center space-x-4'}
              `}
            >
              <div className={viewMode === 'grid' ? 'text-center' : 'flex items-center space-x-4'}>
                <div className={`${viewMode === 'grid' ? 'mx-auto mb-4' : ''}`}>
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                
                <div className={viewMode === 'grid' ? 'text-center' : 'flex-1'}>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {phone.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {phone.operators.length} operador{phone.operators.length !== 1 ? 'es' : ''} disponible{phone.operators.length !== 1 ? 's' : ''}
                  </p>
                  
                  {viewMode === 'list' && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {phone.operators.map((operator, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {operator.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {viewMode === 'grid' && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {phone.operators.slice(0, 3).map((operator, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {operator.name}
                        </span>
                      ))}
                      {phone.operators.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          +{phone.operators.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneList; 