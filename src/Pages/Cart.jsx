import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const CART_KEY = 'cart';
const TAX_RATE = 0.1;

const normalizeCartItems = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => item && item.id != null)
    .map((item) => ({
      id: item.id,
      title: item.title || 'Untitled Book',
      url: item.url || '',
      price: Number(item.price ?? item.salePrice ?? item.originalPrice ?? 0),
      quantity: Math.max(1, Number(item.quantity ?? 1) || 1),
    }));
};

const Cart = () => {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(CART_KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      return normalizeCartItems(parsed);
    } catch {
      return [];
    }
  });

  const loadCart = () => {
    const raw = localStorage.getItem(CART_KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      const normalized = normalizeCartItems(parsed);
      setItems(normalized);
      localStorage.setItem(CART_KEY, JSON.stringify(normalized));
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    const handleCartUpdated = () => loadCart();
    window.addEventListener('storage', handleCartUpdated);
    window.addEventListener('cart-updated', handleCartUpdated);

    return () => {
      window.removeEventListener('storage', handleCartUpdated);
      window.removeEventListener('cart-updated', handleCartUpdated);
    };
  }, []);

  const save = (nextItems) => {
    const normalized = normalizeCartItems(nextItems);
    setItems(normalized);
    localStorage.setItem(CART_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateQty = (id, qty) => {
    const safeQty = Number.isFinite(qty) ? Math.max(1, qty) : 1;
    const nextItems = items.map((item) =>
      String(item.id) === String(id) ? { ...item, quantity: safeQty } : item
    );
    save(nextItems);
  };

  const removeItem = (id) => {
    const nextItems = items.filter((item) => String(item.id) !== String(id));
    save(nextItems);
  };

  const clearCart = () => save([]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [items]
  );

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  if (items.length === 0) {
    return (
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row">
              <h2>Your cart is empty</h2>
              <Link to="/books" className="book__link">
                Browse Books
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <h2 className="section__title">Shopping Cart</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 320px',
                gap: '24px',
                alignItems: 'start',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 96px 90px auto',
                    gap: '12px',
                    alignItems: 'center',
                    marginBottom: '12px',
                    color: '#2b6cb0',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ gridColumn: 'span 2' }}>Books</span>
                  <span style={{ justifySelf: 'center' }}>Quantity</span>
                  <span style={{ justifySelf: 'end' }}>Total</span>
                  <span />
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr 96px 90px auto',
                      gap: '12px',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <img src={item.url} alt={item.title} style={{ width: '80px' }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 600 }}>{item.title}</p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => updateQty(item.id, Number(event.target.value))}
                      style={{ width: '64px', justifySelf: 'center' }}
                    />
                    <div style={{ justifySelf: 'end', textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 600 }}>
                        ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#718096' }}>
                        ${Number(item.price || 0).toFixed(2)} each
                      </p>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button type="button" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <Link to="/books" className="book__link">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              <aside
                style={{
                  border: '1px solid #d6d6d6',
                  borderRadius: '8px',
                  padding: '16px',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '16px' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#2b6cb0',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Proceed to Checkout
                </button>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
              