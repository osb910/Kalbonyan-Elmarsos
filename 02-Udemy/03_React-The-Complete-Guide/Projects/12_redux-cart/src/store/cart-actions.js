import {uiActions} from './ui-slice';
import {cartActions} from './cart-slice';

export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const res = await fetch(
        'https://react-http-44a9f-default-rtdb.firebaseio.com/cart.json'
      );

      if (!res.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await res.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replace({
          items: cartData.items || [],
          totalQty: cartData.totalQty,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        'https://react-http-44a9f-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQty: cart.totalQty,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Sending cart data failed.`);
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
