import './DeleteAccount.css';

const DeleteAccount = props => {
  return (
    <div className="delete-confirmation-container">
      <h1 className="text-center">Delete Confirmation</h1>
      <p className="text-center">
        Once you delete your account, all of your information will be delete
        forever. We will not be able to restore your account. Are you sure you
        want to proceed?
      </p>
      <p className="text-center text-bold">
        Confirm by typing <span className="text-primary-dark">abc</span> below
      </p>
      <input
        // ref={inputRef}
        placeholder="Secret"
        onPaste={e => e.preventDefault()}
        className="input-field"
      />
      <button
        //   onClick={userAccountDeleteHandler}
        className="btn error"
      >
        DELETE
      </button>
    </div>
  );
};
export { DeleteAccount };
