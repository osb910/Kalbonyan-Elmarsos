import {useContext} from 'react';
import styled from 'styled-components';
import CartContext from '../../store/cart-context';
import LanguageContext from '../../store/language-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import data from '../../store/content/Cart';
import {arCount, formatNum} from '../../store/utils';

const StyledCart = styled.section`
  .cart-items {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 20rem;
    overflow: auto;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1em 0.2em;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .actions button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #8a2b06;
    padding: 0.4em 1.5em;
    border-radius: 25px;
    margin-inline: 0.5em;
  }

  .actions button:last-child {
    margin-inline-end: 0;
  }

  .actions button:hover,
  .actions button:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }

  .actions .button--alt {
    color: #8a2b06;
  }

  .actions .button {
    background-color: #8a2b06;
    color: white;
  }
`;

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const {lang} = useContext(LanguageContext);
  const content = data[lang];

  const formattedTotal =
    lang === 'ar'
      ? arCount(Math.abs(cartCtx.total), {
          sng: 'دولار',
          pair: 'دولاران',
          plr: 'دولارات',
          zero: 'صفر',
        })
      : `$${Math.abs(cartCtx.total).toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className='cart-items'>
      {cartCtx.items.map(item => (
        <CartItem
          {...item}
          key={item.id}
          onAdd={cartCtx.onAddItem}
          onRemove={cartCtx.onRemoveItem}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  return (
    <Modal clickHandler={cartCtx.onCartClose}>
      <StyledCart>
        {cartItems}
        <div className='total'>
          <span>{content.totalDisplay}</span>
          <span>
            {cartCtx.total === 0 && lang === 'ar' ? 'صفر' : formattedTotal}
          </span>
        </div>
        <div className='actions'>
          <button className='button--alt' onClick={cartCtx.onCartClose}>
            {content.closeDisplay}
          </button>
          {hasItems && (
            <button className='button'>{content.orderDisplay}</button>
          )}
        </div>
      </StyledCart>
    </Modal>
  );
};

export default Cart;
