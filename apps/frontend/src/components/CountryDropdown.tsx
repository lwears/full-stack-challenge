import { useState, useMemo } from 'react'
import { countryCodesData } from '../constants'
import type { CountryCodeData } from '../constants'

interface CountryDropdownProps {
  selectedCountry: CountryCodeData
  onSelectCountry: (country: CountryCodeData) => void
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  selectedCountry,
  onSelectCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCountries = useMemo(() => {
    return Object.entries(countryCodesData).filter(
      ([_code, country]) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.phoneCode.includes(searchTerm),
    )
  }, [searchTerm])

  return (
    <div className="dropdown dropdown-bottom join-item static ">
      <div
        tabIndex={0}
        role="button"
        className="btn join-item w-full border-naturalcycles-900 focus:border-naturalcycles-900 focus:outline-none "
        aria-label={`Selected country: ${selectedCountry.name}`}
      >
        <img
          src={`https://flagpedia.net/data/flags/icon/36x27/${selectedCountry.code.toLowerCase()}.png`}
          alt={`${selectedCountry.name} flag`}
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white rounded z-[1] p-2 shadow inset-x-0 flex flex-col max-h-80 overflow-y-auto flex-nowrap"
      >
        <li className="mb-2">
          <label className="input input-bordered input-ghost w-full border-t-0 border-x-0 border-gray-400 focus:border-gray-400 focus-within:outline-none flex justify-between rounded-none">
            <input
              type="text"
              placeholder="Search countries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 opacity-60"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </li>
        {filteredCountries.map(([code, country]) => (
          <li
            key={code}
            onClick={() => onSelectCountry(country)}
            className="hover:bg-gray-200 px-1 py-2 rounded hover:cursor-pointer flex flex-row space-between w-full"
          >
            <img
              className="w-5 h-4 p-0 rounded-none mr-4"
              src={`https://flagpedia.net/data/flags/icon/36x27/${code.toLowerCase()}.png`}
              alt={`${country.name} flag`}
            />
            <span className="p-0 mr-2">{country.name}</span>
            <span className="p-0">({country.phoneCode})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
