import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, AlertCircle } from 'lucide-react';
import { PhoneData, PhoneModel, Operator } from '../types';
import { useData } from '../context/DataContext';

const ExcelUploader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setPhoneModels, setHasData } = useData();

  const processExcelData = (data: PhoneData[]): PhoneModel[] => {
    const phoneMap = new Map<string, PhoneModel>();

    data.forEach((row) => {
      const phoneName = row.EQUIPO.trim();
      
      if (!phoneMap.has(phoneName)) {
        phoneMap.set(phoneName, {
          name: phoneName,
          operators: []
        });
      }

      const operator: Operator = {
        name: row.OPERADOR,
        discount: row.DTO,
        planDescription: row.DESCRIPCION_PLAN,
        skuPlan: row.SKU_PLAN,
        startDate: row.INICIO,
        endDate: row.FIN
      };

      phoneMap.get(phoneName)!.operators.push(operator);
    });

    return Array.from(phoneMap.values());
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await readExcelFile(file);
      const phoneModels = processExcelData(data);
      
      setPhoneModels(phoneModels);
      setHasData(true);
      
      console.log('Datos procesados:', phoneModels);
    } catch (err) {
      setError('Error al procesar el archivo Excel. Asegúrate de que el formato sea correcto.');
      console.error('Error processing Excel:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const readExcelFile = (file: File): Promise<PhoneData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convertir a JSON con encabezados
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          // Encontrar la fila de encabezados (buscar la fila que contenga "INICIO")
          let headerRowIndex = 0;
          for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i] as string[];
            if (row.some(cell => cell && cell.toString().includes('INICIO'))) {
              headerRowIndex = i;
              break;
            }
          }

          const headers = jsonData[headerRowIndex] as string[];
          const dataRows = jsonData.slice(headerRowIndex + 1) as any[][];

          const processedData: PhoneData[] = dataRows
            .filter(row => row.length > 0 && row.some(cell => cell))
            .map(row => {
              const rowData: any = {};
              headers.forEach((header, index) => {
                if (header && row[index] !== undefined) {
                  // Normalizar nombres de columnas
                  const normalizedHeader = header
                    .replace(/\s+/g, '_')
                    .replace(/\./g, '')
                    .toUpperCase();
                  
                  rowData[normalizedHeader] = row[index];
                }
              });

              return {
                INICIO: rowData.INICIO || '',
                FIN: rowData.FIN || '',
                OPERADOR: rowData.OPERADOR || '',
                SKU_PLAN: rowData.SKU_PLAN || rowData.SKUPLAN || '',
                DESCRIPCION_PLAN: rowData.DESCRIPCION_PLAN || rowData.DESCRIPCIONPLAN || '',
                DTO: parseFloat(rowData.DTO || rowData.DTO || '0'),
                MARCA: rowData.MARCA || '',
                EQUIPO: rowData.EQUIPO || ''
              };
            });

          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <FileSpreadsheet className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Carga el Excel MSM
          </h2>
          <p className="text-gray-600">
            Sube tu archivo Excel con los datos de promociones
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="sr-only">Seleccionar archivo Excel</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </label>

          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Procesando archivo...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            <p>Formatos soportados: .xlsx, .xls</p>
            <p>El archivo debe contener columnas: INICIO, FIN, OPERADOR, SKU PLAN, DESCRIPCION PLAN, DTO., MARCA, EQUIPO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelUploader; 