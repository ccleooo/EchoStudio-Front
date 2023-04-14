import React, { useState, useContext, createContext } from 'react'

const FilterContext = createContext(null)

export const FilterProvider = ({ children }) => {
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [filterColor, setFilterColor] = useState([])
  const [priceRange, setPriceRange] = useState([])
  const [categoryName, setCategoryName] = useState('熱門商品')
  const [specName, setSpecName] = useState([])

  return (
    <FilterContext.Provider
      value={{
        filterProduct,
        setFilterProduct,
        category,
        setCategory,
        filterColor,
        setFilterColor,
        priceRange,
        setPriceRange,
        categoryName,
        setCategoryName,
        specName,
        setSpecName,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
