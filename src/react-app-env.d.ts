/// <reference types="react-scripts" />

export type Validator<T extends object> = {
	[Prop in keyof T]?: (arg: T[Prop], form?: any) => string | null;
};

export type FormError<T extends object> = {
	[Prop in keyof T]: string | null;
};

export interface Todo {
    id: number;
    title: string;
    date: string;
    start: string;
    end: string;
}

export type FormInput = Omit<Todo, "id">;