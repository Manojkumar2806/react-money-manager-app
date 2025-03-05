import './index.css'

const TransactionItem = props => {
  const {eachTrans, onDelete} = props
  const {id, title, amount, option} = eachTrans

  const deleteTransaction = () => {
    onDelete(id, amount, option)
  }

  return (
    <li className="header">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{option}</p>

      <button data-testid="delete" onClick={deleteTransaction}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="deletebtn"
        />
      </button>
    </li>
  )
}

export default TransactionItem
