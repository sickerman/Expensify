'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '@/components/Button';

export const PlaidLink =()=>{
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/create-link-token', {
        method: 'POST',
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken) => {
    await fetch('/api/exchange-public-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
    router.push('/plaid');
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <div className='p-6'>
      <Button onClick={()=> open()} className='bg-gray-900'>
        <strong>Link account</strong>
      </Button>
    </div>
    
  );
}