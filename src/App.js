import { ProductCard } from './Components/ProductCard';
import { ProductList } from './Components/ProductList';
import { ProductFilter } from './Components/ProductFilter';
import { products as productsData } from './data/products';
import { useState } from 'react';
import { Fragment } from 'react';
import './App.css';

const style ={
  listDivider: {borderColor:'slategrey'},
  productlist:{
    margin: "8px 0"
  }
}

function App() {

  const [products, setProducts] = useState(productsData)

  const [filters, setFilters] = useState({
    price:{
      min:0,
      max:999
    },
    other: "Other value"
  })

  const [favorites, setFavorites] = useState([])

  function handlePurchase(productId, stockCount) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, stockCount } : product
      )
    );
  }

  function handleFilter(key, value) {
    setFilters((prevFilters)=>({
      ...prevFilters,
      price:{
        ...prevFilters.price,
        [key]:value
      }
    }))
  }

  function handelFavorite(productId){
    if(favorites.includes(productId)){
      // remove it
      setFavorites((prevFavorites)=> prevFavorites.filter(id => id !== productId))
    } else {
      // add it
      setFavorites((prevFavorites) => [...prevFavorites, productId])
    }
  }

  return (
    <div className="App">
      <ProductList>
        {products.map((product) => (
          <ProductCard 
            key={product.title} 
            product={product} 
            isFavorite={favorites.includes(product.id)}
            onPurchase={handlePurchase} 
            onFavorite={handelFavorite}
          />
        ))}
      </ProductList>

      <h2> Product filtered by Price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter} />
      {products
        .filter(({price})=> price >= filters.price.min && price <= filters.price.max)
        .map(({title, price})=>(
        <Fragment key={title}>
          <hr style={style.listDivider}/>
          <p style={style.productlist}>
            {title} cost ${price}
          </p>
        </Fragment>
      ))}
      
    </div>
  );
}

export default App;
