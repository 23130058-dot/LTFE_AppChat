import type { ReactNode } from 'react';
import { FormProvider as ReactHookFormProvider, type FieldValues, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

type Props<T extends FieldValues> = {
    children: ReactNode;
    methods: UseFormReturn<T, any, T>;
    onSubmit: (data: T) => void | Promise<void>;
};

export default function FormProvider<T extends FieldValues>({ children, methods, onSubmit }: Props<T>) {
    const submit: SubmitHandler<T> = (data) => { void onSubmit(data); };
    return <ReactHookFormProvider {...methods}><form onSubmit={methods.handleSubmit(submit)} noValidate>{children}</form></ReactHookFormProvider>;
}
