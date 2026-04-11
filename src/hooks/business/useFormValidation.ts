import { useState, useCallback } from 'react';
import { validateField, ValidationRule } from '../../utils/form/validation';

interface UseFormValidationOptions<T> {
  initialData: T;
  rules: Record<keyof T, ValidationRule>;
  fieldNames?: Record<keyof T, string>;
  onSubmit?: (data: T) => Promise<void> | void;
}

export const useFormValidation = <T extends Record<string, any>>({
  initialData,
  rules,
  fieldNames,
  onSubmit
}: UseFormValidationOptions<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((field: keyof T, value: any) => {
    const fieldRule = rules[field];
    if (!fieldRule) return null;

    const fieldName = fieldNames?.[field] || String(field);
    const result = validateField(value, fieldRule, fieldName);
    
    return result.isValid ? null : result.errors[0];
  }, [rules, fieldNames]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const error = validateField(field as keyof T, data[field]);
      if (error) {
        newErrors[field as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [data, rules, validateField]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // 清除該欄位錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const handleBlur = useCallback((field: keyof T) => {
    setFieldTouched(field, true);
    
    const error = validateField(field, data[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [data, validateField, setFieldTouched]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // 標記所有欄位為已觸碰
    const allTouched = Object.keys(rules).reduce((acc, field) => ({
      ...acc,
      [field]: true
    }), {});
    setTouched(allTouched);

    if (!validateForm()) {
      return false;
    }

    if (!onSubmit) {
      return true;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data);
      return true;
    } catch (error) {
      console.error('表單提交錯誤:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [data, rules, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialData]);

  const getFieldProps = useCallback((field: keyof T) => ({
    value: data[field] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(field, e.target.value);
    },
    onBlur: () => handleBlur(field),
    error: touched[field] ? errors[field] : undefined
  }), [data, errors, touched, setFieldValue, handleBlur]);

  return {
    data,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    reset,
    getFieldProps,
    isValid: Object.keys(errors).length === 0
  };
};