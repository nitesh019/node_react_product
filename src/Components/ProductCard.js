import styles from './ProductCard.module.css'
import { useState } from 'react';

export function ProductCard({product, bgc = 'orange', onPurchase, onFavorite, isFavorite}){

  const [showMore, setShowMore] = useState(true);
  // const [stockCount, setStockCount] = useState(product.stockCount);

  function handleClick() {
    onPurchase(product.id, product.stockCount-1);
  }

  function handleTwoClick(){
    onPurchase(product.id, product.stockCount-2);
  }

  return (  
    <article className={styles.Container} style={{background: bgc}}>
      <button 
        className={styles.Favorite} 
        onClick={()=> onFavorite(product.id)} >
        {isFavorite ? "❤️" : "🤍" }
        </button>
      <h2>{product.title}</h2>
      <img
        src={product.imageSrc}
        alt="iPhone 15 pro"
        width="128px"
        height="128px"
      />
      
      <p>Specifications {': '}
        <button onClick={()=>setShowMore(!showMore)}>{showMore?"Hide":"Show"}</button> 
      </p> 
      
      {showMore && <ul className={styles.list}>
        {product.specification.map((spc, index)=>(<li key={index}>{spc}</li>) )}
      </ul>}
      
      <Status stockCount={product.stockCount} />
     
      {product.stockCount>0 && (
        <>
        <p>Price : ${product.price} </p>
         <button onClick={handleClick} >Buy </button>
         </>
      )}
      
      {product.stockCount>1 && (
        <button onClick={handleTwoClick}>buy 2</button>
      )}
    
    </article>
  )
}

function Status({stockCount}){
  const notAvailableTemplate = (<p className={styles.notAvailableStatus}>Not Available</p>);
  const availableTemplate = (<p className={styles.availableStatus}>{stockCount} item Available</p>)

  return stockCount === 0 ? notAvailableTemplate :availableTemplate ;
}



