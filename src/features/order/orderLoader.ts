import { LoaderFunction, LoaderFunctionArgs } from 'react-router';
import { getOrder } from '../../services/apiRestaurant';

export const orderLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  if (!params || !params.orderId) {
    throw new Error('orderId is missing in route params');
  }

  const order = await getOrder(params.orderId);
  return order;
};
