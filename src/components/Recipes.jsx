import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Loading from './Loading'
import Searchbar from './SearchBar'
import RecipeCard from './RecipeCard'
import { fetchRecipes } from '../utils'
import Button from './Button'

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('Vegan')
    const [limit, setLimit] = useState(30)
    const [loading, setLaoding] = useState(false)

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const fetchRecipe = async () => {
        try {
            const data = await fetchRecipes({ query, limit })

            setRecipes(data)

            setLaoding(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLaoding(false)
        }
    }

    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        fetchRecipe()
    }

    const showMore = () => {
        setLimit(prev => prev + 10)
        fetchRecipe()
    }

    useEffect(() => {
        setLaoding(true)

        fetchRecipe()

    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full lg:w-1/5 flex items-center justify-center'>
        <form className='w-full flex items-center justify-center' onSubmit={handleSearchedRecipe}>
          <Searchbar
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={<BiSearchAlt2 className='text-gray-600' onClick={handleSearchedRecipe} />}
          />
        </form>
      </div>

      {loading ? (
        <Loading />
      ) : recipes?.length > 0 ? (
        <>
          <div className='w-full flex flex-wrap justify-center gap-10'>
            {recipes?.map((item, index) => (
              <RecipeCard recipe={item} key={index} />
            ))}
          </div>

          <div className='flex items-center justify-center py-10'>
            <Button
              title="Show More"
              containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
              handleClick={showMore}
            />
          </div>
        </>
      ) : (
        <div className='text-white w-full items-center justify-center py-10'>
          <p className='text-center'>No Recipe Found</p>
        </div>
      )}
    </div>
    )
}

export default Recipes