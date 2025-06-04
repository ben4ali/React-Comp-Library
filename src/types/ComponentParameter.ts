export interface ComponentParameter {
  property: string;
  type: string;
  default: string;
  description: string;
  inputType?: 'text' | 'number' | 'checkbox' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}
