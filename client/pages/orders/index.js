const OrderIndex = ({ orders }) => {
    return (
      <div>
        <h2>Your Orders: </h2>
        <ul>
            {orders.map((order) => {
            return (
                <li key={order.id}>
                Name: {order.element.title} - Price: {order.element.price}
                </li>
            );
            })}
        </ul>
      </div>
    );
  };
  
  OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');
  
    return { orders: data };
  };
  
  export default OrderIndex;
  