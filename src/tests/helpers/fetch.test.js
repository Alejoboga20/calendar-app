import { fetchWithoutToken } from '../../helpers/fetch';

describe('Fetch helper tests', () => {
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

    expect(response instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
  });
});
