import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import Item from './Item/Item';
import classes from './AvailableItems.module.css';

const AvailableItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
        const products = responseData.products;
        const loadedItems = [];
        console.log(products)
  
        for (const key in products) {
          loadedItems.push({
            id: key,
            title: products[key].title,
            description: products[key].description,
            price: products[key].price,
          });
        }
  
        setItems(loadedItems);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
  
    fetchItems();
  }, []);

  
  if (isLoading) {
    return (
      <section className={classes.ItemsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.ItemsError}>
        <p>{httpError}</p>
      </section>
    );
  }


  const itemsList = items.map((item) => (
    <Item
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <section className={classes.items}>
      <Card>
        <ul>{itemsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableItems;
