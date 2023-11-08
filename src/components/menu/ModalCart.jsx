import { Button, Modal, Container } from "react-bootstrap";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalCart({
  cart,
  cartCount,
  setCart,
  setCartCount,
  showModal,
  setShowModal,
}) {
  const closeModal = () => {
    setShowModal(false);
  };

  const calcularTotal = () => {
    const total = cart.reduce((acc, item) => {
      if (typeof item.price === "number" && typeof item.quantity === "number") {
        return acc + item.price * item.quantity;
      } else {
        console.log("Item com valor inválido:", item);
        return acc;
      }
    }, 0);

    return total;
  };

  const incrementQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity++;
      }
      return cartItem;
    });

    setCart(updatedCart);
    setCartCount(cartCount + 1);
  };

  const decrementQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          // Se a quantidade se tornar 0, remova o item do carrinho
          return null;
        }
      }
      return cartItem;
    });

    const filteredCart = updatedCart.filter((item) => item !== null);

    setCartCount(cartCount - 1);
    setCart(filteredCart);
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
  };

  return (
    <Modal show={showModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Carrinho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>R${item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => decrementQuantity(item)}
                      className="p-1 custom-rounded-button"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="secondary"
                      onClick={() => incrementQuantity(item)}
                      className="p-1 custom-rounded-button"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-carrinho mt-3">
            <strong>Total: R${calcularTotal().toFixed(2)}</strong>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={clearCart}>
          Finalizar Pedido
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCart;
