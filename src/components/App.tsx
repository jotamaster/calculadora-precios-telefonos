import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from '../context/DataContext';
import ExcelUploader from './ExcelUploader';
import PhoneList from './PhoneList';
import PhoneDetail from './PhoneDetail';
import { Smartphone } from 'lucide-react';

const AppContent: React.FC = () => {
  const { hasData } = useData();

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Smartphone className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Calculadora de Precios con Plan
            </h1>
            <p className="text-lg text-gray-600">
              Herramienta para promotores de telefonía celular
            </p>
          </div>
          <ExcelUploader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<PhoneList />} />
        <Route path="/phone/:phoneName" element={<PhoneDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </Router>
  );
};

export default App; 