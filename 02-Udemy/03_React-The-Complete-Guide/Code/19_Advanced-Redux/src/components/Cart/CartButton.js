import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const CartButton = props => {
  const cartQty = useSelector(state => state.cart.totalQty);
  const dispatch = useDispatch();
  const toggleCart = () => dispatch(uiActions.toggle());
  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  );
};

export default CartButton;
