export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const accessToken = JSON.parse(localStorage.getItem('accessToken') as string);

  if (user && accessToken) {
    return { Authorization: `Bearer ${accessToken}` }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  }
  return {};
}
