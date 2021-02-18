import Link from 'next/link';


const LandingPage = ({ currentUser, elements }) => {
  console.log(elements);

  const elementList = elements.map((element) => {
    return (
      <tr key={element.id}>
        <td>{element.title}</td>
        <td>{element.price}</td>
        <td>
          <Link href="/elements/[elementId]" as={`/elements/${element.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Elements</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{elementList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/elements');

  return { elements: data };
};

export default LandingPage;
