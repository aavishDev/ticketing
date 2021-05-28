import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';


const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <>
    <Header currentUser={currentUser}/>
    <Component {...pageProps} />
  </>
}

AppComponent.getInitialProps = async ({ Component, ctx }) => {

  const client = buildClient(ctx);

  const { data } = await client.get('/api/users/currentuser');


  let pageProps = {};

  if (Component && Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return {
    pageProps,
    currentUser: data.currentUser
  };
}

export default AppComponent;
