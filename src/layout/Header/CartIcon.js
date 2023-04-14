import { useCart } from '../../utils/useCart'
import { useSecondCart } from '../../utils/useSecondCart'
import { ReactComponent as HeaderCartIcon } from '../../images/svg/cart.svg'

function CartIcon(props) {
  const firstCart = useCart()
  const secondCart = useSecondCart()

  return (
    <button type="button" className="btn header_btn_cart">
      <HeaderCartIcon className="header_cart" />
      <span className="four_color">
        {firstCart.cart.totalItems + secondCart.cart.totalItems}
      </span>
    </button>
  )
}

export default CartIcon
