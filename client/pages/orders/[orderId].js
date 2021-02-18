const OrderShow = ( {order} ) => {
  return (
    <div>
      <h1>Order Details</h1>
      <h4>You just bought a/an {order.element.title} with {order.element.price} RON. </h4>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
