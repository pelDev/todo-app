import { useCallback, useState } from "react";
import { FormError, Validator } from "../react-app-env";

export const getDefaultFormErrors = <T extends object>(initialState: T) => {
    const result: Record<string, null> = {};

    Object.keys(initialState).forEach((key) => {
        result[key] = null;
        return;
    });

    return result as FormError<T>;
};

interface Props<T extends object> {
    initialState: T;
    validators?: Validator<T>
}

export const useForm = <T extends object>(props: Props<T>) => {
    const { initialState, validators } = props;

    const [form, setForm] = useState<T>(initialState);

    const [formErrors, setFormErrors] = useState<FormError<T>>(
		getDefaultFormErrors<T>(initialState)
	);

    const onChange = useCallback((name: keyof T, value: T[keyof T]) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const reset = () => {
		setForm(initialState);
		setFormErrors(getDefaultFormErrors<T>(initialState));
	};

    const resetFormErrors = (key?: keyof T) => {
		if (!key) {
			setFormErrors(getDefaultFormErrors<T>(initialState));
		} else {
			setFormErrors((prev) => ({ ...prev, key: null }));
		}
	};

    const validate = (): string | null => {
        if (validators) {
            const keys = Object.keys(validators);
            
            for (const key of keys) {
                const validator = validators[key as keyof T];

                if (validator && typeof validator === "function") {
                    const error = validator(form[key as keyof T], form);

                    if (error) return error;
                }
            }
        }

        return null;
	};

    return { ...form, formErrors, onChange, reset, resetFormErrors, validate };
}