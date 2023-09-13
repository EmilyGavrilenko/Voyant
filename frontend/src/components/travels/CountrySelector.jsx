import React, { useMemo, memo } from 'react';
import Select from 'react-select';

function CountrySelector({ countryOptions, selectedCountries, setSelectedCountries }) {
    const memoizedOptions = useMemo(() => countryOptions, [countryOptions]);

    const formatOptionLabel = ({ label, flag }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{flag}</span>
            <span style={{ marginLeft: '8px' }}>{label}</span>
        </div>
    );

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: '10px 15px',
            color: state.isSelected ? '#333' : '#333',
            backgroundColor: state.isSelected ? '#007BFF' : 'transparent',
            '&:hover': {
                backgroundColor: '#e9ecef',
            },
        }),
        control: (provided) => ({
            ...provided,
            borderRadius: '4px',
            borderColor: '#ced4da',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#ced4da',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#000',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#000',
            '&:hover': {
                backgroundColor: '#ced4da',
                color: '#fff',
            },
        }),
    };

    const handleChange = (selectedOptions) => {
        console.log('selectedOptions', selectedOptions);
        console.log('memoizedOptions', memoizedOptions);
        setSelectedCountries(selectedOptions);
    };

    console.log('countryOptions', countryOptions.length);

    return (
        <Select
            isMulti
            isSearchable
            name='countries'
            placeholder='United States, Canada, United Kingdom...'
            options={memoizedOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleChange}
            value={selectedCountries}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
        />
    );
}

export default memo(CountrySelector);
