import { ActionFunction, ActionFunctionArgs } from 'react-router';
import { updateOrder } from '../../services/apiRestaurant';

export const updateOrderAction: ActionFunction = async ({
  params,
}: ActionFunctionArgs) => {
  const data = { priority: true };
  if (!params || !params.orderId) {
    throw new Error('orderId is missing in route params');
  }

  await updateOrder(params.orderId, data);

  return null;
};
