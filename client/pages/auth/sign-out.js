import useRequest from '../../hooks/use-request';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default () => {

  const router = useRouter();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => router.push('/')
  });

  useEffect(async () => {
    await doRequest();
  }, []);

  return <div>Signing you out...</div>
}