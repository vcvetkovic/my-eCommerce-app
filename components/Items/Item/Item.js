import { useContext } from 'react';

import ItemForm from './ItemForm';
import classes from './Item.module.css';
import CartContext from '../../../store/cart-context';

const Item = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      title: props.title,
      amount: amount,
      price: props.price
    });
  };

  return (
    <li className={classes.item}>
      <div>
        <h3>{props.title}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}$</div>
      </div>
      <div>
        <ItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default Item;
