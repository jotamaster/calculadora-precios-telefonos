export interface PhoneData {
  INICIO: string;
  FIN: string;
  OPERADOR: string;
  SKU_PLAN: string;
  DESCRIPCION_PLAN: string;
  DTO: number;
  MARCA: string;
  EQUIPO: string;
}

export interface PhoneModel {
  name: string;
  operators: Operator[];
}

export interface Operator {
  name: string;
  discount: number;
  planDescription: string;
  skuPlan: string;
  startDate: string;
  endDate: string;
}

export interface PriceCalculation {
  basePrice: number;
  selectedOperator: Operator | null;
  finalPrice: number;
} 