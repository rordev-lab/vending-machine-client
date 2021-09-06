const isUserAuthenticated = () => {
  const result = localStorage.getItem('authToken');
  if (result) return true;
  else return false;
};

const isSellerUser = () => {
  const result = localStorage.getItem('role');
  if (result === 'seller') return true;
  else return false;
};

export { isUserAuthenticated, isSellerUser };
