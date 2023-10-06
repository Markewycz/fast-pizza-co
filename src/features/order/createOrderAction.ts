import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import { clearCart } from '../cart/cartSlice';
import store from '../../store';
// import { isValidPhone } from '../../utils/helpers';

export const createOrderAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    address: data.address as string,
    phone: data.phone as string,
    customer: data.customer as string,
    position: data.position as string,
    cart: JSON.parse(formData.get('cart') as string),
    priority: data.priority === 'true',
  };

  const errors = {};
  // if (!isValidPhone(order.phone))
  //   errors.phone =
  //     'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};
