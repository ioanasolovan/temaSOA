import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import axios from 'axios';


const ElementShow = ({ element, results }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      elementId: element.id,
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });
  console.log(results.response.docs);
  return (
    <div>
      <h1>{element.title}</h1>
      <h4>Price: {element.price}</h4>
      {errors}
      <button onClick={doRequest} className="btn btn-primary">
        Purchase
      </button>

      <h5>Articles containing: {element.title}</h5>
      <ul>
        {results.response.docs.map((doc) => {
        return (
            <li>
              <h6>
                Title: {doc.headline.main} -- 
                <a target="_blank" href={doc.web_url}> See Article</a>
              </h6>
            </li>
        );
        })}
      </ul>
    </div>
  );
};

ElementShow.getInitialProps = async (context, client) => {
  const { elementId } = context.query;
  const { data } = await client.get(`/api/elements/${elementId}`);
  const results = await Aici(data.title);
  return { element: data, results: results };
};

async function Aici(title){
  const query_string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=RPP74pL5tEj4NXIFVzenhUr0oD0eD6im&q=' + title
  const { data }  = await axios.get(query_string);
  return data;
}
export default ElementShow;
