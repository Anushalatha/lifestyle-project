import { useState } from 'react'
import Layout from '../components/Layout'

/**
 * Grocery & Meal Planner Component
 * Manage grocery lists and get meal suggestions
 */
const MealPlanner = () => {
  const [groceryList, setGroceryList] = useState([
    { id: 1, name: 'Chicken Breast', category: 'Protein', checked: false },
    { id: 2, name: 'Salmon', category: 'Protein', checked: false },
    { id: 3, name: 'Spinach', category: 'Vegetables', checked: false },
    { id: 4, name: 'Broccoli', category: 'Vegetables', checked: false },
    { id: 5, name: 'Brown Rice', category: 'Grains', checked: false },
    { id: 6, name: 'Quinoa', category: 'Grains', checked: false },
  ])

  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Vegetables')

  // Mock meal suggestions based on groceries
  const mealSuggestions = [
    {
      id: 1,
      name: 'Grilled Chicken Salad',
      description: 'Fresh mixed greens with grilled chicken, cherry tomatoes, and balsamic vinaigrette',
      tags: ['High Protein', 'Low Carb', 'Gluten Free'],
      ingredients: ['Chicken Breast', 'Spinach', 'Broccoli'],
      calories: 350,
    },
    {
      id: 2,
      name: 'Salmon with Quinoa',
      description: 'Pan-seared salmon served over quinoa with steamed vegetables',
      tags: ['High Protein', 'Omega-3', 'High Fiber'],
      ingredients: ['Salmon', 'Quinoa', 'Broccoli'],
      calories: 420,
    },
    {
      id: 3,
      name: 'Chicken and Rice Bowl',
      description: 'Grilled chicken over brown rice with mixed vegetables',
      tags: ['High Protein', 'Balanced', 'Meal Prep'],
      ingredients: ['Chicken Breast', 'Brown Rice', 'Spinach'],
      calories: 480,
    },
  ]

  const addGroceryItem = () => {
    if (newItem.trim()) {
      const item = {
        id: Date.now(),
        name: newItem,
        category: newCategory,
        checked: false,
      }
      setGroceryList([...groceryList, item])
      setNewItem('')
    }
  }

  const toggleGroceryItem = (id) => {
    setGroceryList(groceryList.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const removeGroceryItem = (id) => {
    setGroceryList(groceryList.filter(item => item.id !== id))
  }

  const getMealSuggestion = () => {
    const availableIngredients = groceryList
      .filter(item => !item.checked)
      .map(item => item.name)
    
    return mealSuggestions.find(meal =>
      meal.ingredients.every(ing => availableIngredients.includes(ing))
    ) || mealSuggestions[0]
  }

  const suggestedMeal = getMealSuggestion()

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Meal Planner</h1>
          <p className="text-gray-600">Plan your meals and manage your grocery list</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grocery List */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Grocery List</h2>
            
            {/* Add Item Form */}
            <div className="mb-4 flex space-x-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGroceryItem()}
                placeholder="Add grocery item..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option>Protein</option>
                <option>Vegetables</option>
                <option>Grains</option>
                <option>Dairy</option>
                <option>Fruits</option>
                <option>Other</option>
              </select>
              <button
                onClick={addGroceryItem}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Grocery Items */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {groceryList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleGroceryItem(item.id)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <div className={`font-medium ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                  <button
                    onClick={() => removeGroceryItem(item.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {groceryList.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Your grocery list is empty. Add items to get started!
              </div>
            )}
          </div>

          {/* Meal Suggestions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Meal Suggestions</h2>
            
            {/* Featured Suggestion */}
            <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Today's Recommendation</h3>
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{suggestedMeal.name}</h4>
              <p className="text-gray-700 mb-3">{suggestedMeal.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestedMeal.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Calories:</strong> {suggestedMeal.calories} kcal
              </div>
            </div>

            {/* All Meal Suggestions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">More Meal Ideas</h3>
              {mealSuggestions.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{meal.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MealPlanner

