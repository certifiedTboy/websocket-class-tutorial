interface ErrorProps {
  errorMessage: string;
}

const Error = ({ errorMessage }: ErrorProps) => {
  return (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  );
};

export default Error;
