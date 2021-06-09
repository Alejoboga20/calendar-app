import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Fetch helper tests', () => {
  let token = '';

  test('should fetchWithOutToken', async () => {
    const response = await fetchWithoutToken(
      'auth',
      {
        email: 'alejotest@email.com',
        password: '123456'
      },
      'POST'
    );

    const body = await response.json();
    token = body.token;

    expect(response instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
  });

  test('should fetchWithToken', async () => {
    localStorage.setItem('token', token);

    const response = await fetchWithToken('event');
    const body = await response.json();

    expect(response instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
  });
});
