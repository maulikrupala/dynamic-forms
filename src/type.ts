export interface FieldOption {
  label: string;
  value: string;
}

export interface Field {
  type: "text" | "number" | "textarea" | "radio" | "checkbox" | "dropdown" | "slider";
  label: string;
  name: string;
  placeholder?: string;
  options?: FieldOption[]; // Use a consistent type for options
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}
