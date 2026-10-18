function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, qty) {
  if (qty <= 0) {
    throw new RangeError('Количество должно быть положительным');
  }

  const existing = cart.find((item) => item.id === product.id);
  const currentQty = existing ? existing.quantity : 0;

  if (currentQty + qty > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + qty }
        : item,
    );
  }

  return [...cart, { ...product, quantity: qty }];
}

function changeQuantity(cart, id, newQty) {
    if (newQty <= 0) {
    throw new RangeError('Количество должно быть положительным');
  }

  const item = cart.find((i) => i.id === id);
  if (!item) return cart;

  if (newQty > item.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  return cart.map((i) =>
    i.id === id ? { ...i, quantity: newQty } : i,
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  const discount =
    promoCode === 'SAVE10' && subtotal >= 20000
      ? Math.round(subtotal * 0.1)
      : 0;

  const delivery = subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
