import buildClient from '../api/buildClient';


function HomePage({ currentUser }) {
  return(
    <>
      <h1>Welcome {currentUser && currentUser.email} to Ticketing!</h1>
    </>
  )
}

HomePage.getInitialProps = async (context) => {

  const client = buildClient(context);

  const response = await client.get('/api/users/currentuser');
  return response.data;
}


export default HomePage;