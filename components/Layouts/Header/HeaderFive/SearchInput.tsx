import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISearchFilter } from '../../../../interfaces/SearchFilter';

const SearchInput = ({ className = '' }) => {
    const router = useRouter();
    const validationSchema = useMemo(
        () =>
            yup.object({

            }),
        [],
    );

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<ISearchFilter>({
        resolver: yupResolver(validationSchema),
    });

    const handleSearchFilter = async (data: ISearchFilter) => {
        // router.push('/courses?search=' + data.search);
        window.location.href = '/courses?search=' + data.search;
    };

    return (
        <form
            onSubmit={handleSubmit(handleSearchFilter)}
            autoComplete='off'
            className={`${className} search-input`}
        >
            <input
                name="search"
                type="text"
                placeholder="Tìm kiếm..."
                {...register('search')}
            />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.24988 12.5C10.1494 12.5 12.4999 10.1495 12.4999 7.25C12.4999 4.35051 10.1494 2 7.24988 2C4.35038 2 1.99988 4.35051 1.99988 7.25C1.99988 10.1495 4.35038 12.5 7.24988 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.962 10.9625L13.9995 14.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </form>
    )
}

export default SearchInput;