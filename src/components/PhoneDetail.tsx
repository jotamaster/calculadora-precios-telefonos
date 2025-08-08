import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Smartphone, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Operator } from '../types';

const PhoneDetail: React.FC = () => {
  const { phoneName } = useParams<{ phoneName: string }>();
  const { phoneModels } = useData();
  const navigate = useNavigate();
  
  const [basePrice, setBasePrice] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  // Function to get company colors
  const getCompanyColors = (companyName: string) => {
    const normalizedName = companyName.toUpperCase();
    switch (normalizedName) {
      case 'CLARO':
        return { bg: '#da291c', text: 'white' };
      case 'ENTEL':
        return { bg: '#002eff', text: 'white' };
      case 'WOM':
        return { bg: '#4d008c', text: 'white' };
      default:
        return { bg: '#6b7280', text: 'white' };
    }
  };

  const phone = phoneModels.find(p => p.name === decodeURIComponent(phoneName || ''));

  useEffect(() => {
    if (basePrice && selectedOperator) {
      // Extract numeric value from formatted CLP string (remove all non-digits)
      const base = parseFloat(basePrice.replace(/[^\d]/g, ''));
      const discount = selectedOperator.discount;
      const final = base - discount;
      setFinalPrice(final);
    } else {
      setFinalPrice(null);
    }
  }, [basePrice, selectedOperator]);

  if (!phone) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Teléfono no encontrado
          </h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 mt-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </button>
        
        <div className="flex items-center space-x-4">
          <Smartphone className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            {phone.name}
          </h1>
        </div>
        <p className="text-gray-600 mt-2">
          {phone.operators.length} compañía{phone.operators.length !== 1 ? 's' : ''} disponible{phone.operators.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Calculadora de Precio
            </h2>
          </div>

          <div className="space-y-6">
            {/* Base Price Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Base *
              </label>
              <div className="input-with-icon">
                <span className="icon">$</span>
                <input
                  type="text"
                  value={basePrice}
                  onChange={(e) => {
                    // Remove all non-numeric characters except decimal point
                    const value = e.target.value.replace(/[^\d.]/g, '');
                    setBasePrice(value);
                  }}
                  onBlur={(e) => {
                    // Format as CLP on blur
                    const numValue = parseFloat(e.target.value.replace(/[^\d.]/g, ''));
                    if (!isNaN(numValue)) {
                      const formatted = new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: 'CLP',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(numValue);
                      setBasePrice(formatted);
                    }
                  }}
                  placeholder="Ingresa el precio base"
                  className="w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Operator Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona compañía
              </label>
              <select
                value={selectedOperator?.name || ''}
                onChange={(e) => {
                  const operator = phone.operators.find(op => op.name === e.target.value);
                  setSelectedOperator(operator || null);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una compañía</option>
                {phone.operators.map((operator, index) => (
                                     <option key={index} value={operator.name}>
                     {operator.name} - Descuento: {new Intl.NumberFormat('es-CL', {
                       style: 'currency',
                       currency: 'CLP',
                       minimumFractionDigits: 0,
                       maximumFractionDigits: 0
                     }).format(operator.discount)}
                   </option>
                ))}
              </select>
            </div>

            {/* Final Price Display */}
            {finalPrice !== null && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Precio Final</p>
                    <p className="text-2xl font-bold text-green-900">
                      {new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: 'CLP',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(finalPrice)}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                                 {selectedOperator && (
                   <div className="mt-3 text-sm text-green-700">
                                           <p>Precio base: {new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: 'CLP',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(parseFloat(basePrice.replace(/[^\d]/g, '')))}</p>
                     <p>Descuento: -{new Intl.NumberFormat('es-CL', {
                       style: 'currency',
                       currency: 'CLP',
                       minimumFractionDigits: 0,
                       maximumFractionDigits: 0
                     }).format(selectedOperator.discount)}</p>
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>

        {/* Operator Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Detalles de Compañías
          </h2>
          
          <div className="space-y-4">
            {phone.operators.map((operator, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedOperator?.name === operator.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedOperator(operator)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{
                        backgroundColor: getCompanyColors(operator.name).bg
                      }}
                    >
                      {operator.name}
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {operator.name}
                    </h3>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    -{new Intl.NumberFormat('es-CL', {
                      style: 'currency',
                      currency: 'CLP',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(operator.discount)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {operator.planDescription}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>SKU: {operator.skuPlan}</span>
                  <span>
                    {operator.startDate} - {operator.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetail; 