import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DEFAULT_COUNTRY_OPTIONS = [
    { value: 'USA', label: 'United States', flag: '🇺🇸' },
    { value: 'CAN', label: 'Canada', flag: '🇨🇦' },
    { value: 'GBR', label: 'United Kingdom', flag: '🇬🇧' },
];

function CountrySelector() {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [countryOptions, setCountryOptions] = useState(DEFAULT_COUNTRY_OPTIONS);

    // useEffect(() => {
    //     fetch('https://restcountries.com/v3.1/all')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data[0]);
    //             const countries = data.map((country) => ({
    //                 value: country.name.common,
    //                 label: country.name.common,
    //                 flag: country.flag,
    //                 lat: country.latlng[0],
    //                 lng: country.latlng[1],
    //             }));
    //             console.log(countries);
    //             countries.sort((a, b) => (a.label > b.label ? 1 : -1));
    //             setCountryOptions(countries);
    //         });
    // });

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
            width: '400px',
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
        setSelectedCountries(selectedOptions);
    };

    return (
        <div>
            <Select
                isMulti
                isSearchable
                name='countries'
                options={countryOptions}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handleChange}
                value={selectedCountries}
                formatOptionLabel={formatOptionLabel}
                styles={customStyles}
            />
        </div>
    );
}

export default CountrySelector;
