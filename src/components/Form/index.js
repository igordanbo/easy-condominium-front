import './Form.css';
export default function Form({ onSubmit, children }) {
  return <form className="container-form-easy" onSubmit={onSubmit}>{children}</form>;
}
