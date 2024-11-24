import {useState, useEffect} from 'react';
import {addCategory, getCategories, Category} from '../../firebase/firestoreService';

function ManageCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#000000'); // Default color
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim() === '') return;
    await addCategory({name: categoryName, color: categoryColor});
    setCategoryName('');
    setCategoryColor('#000000'); // Reset to default color
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleAddCategory}>
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <input
          type="color"
          value={categoryColor}
          onChange={(e) => setCategoryColor(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <span style={{color: category.color}}>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCategories;
