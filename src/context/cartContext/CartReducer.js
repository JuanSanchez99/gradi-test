export function CartReducer(cart, action) {
    switch (action.type) {
      case 'add-cart': {
        return [...cart, action.cartItem];
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }