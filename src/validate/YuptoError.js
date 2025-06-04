export function yupToError(err) {
  const errObj = {};

  err.inner.forEach((error) => {
    errObj[error.path] = error.message;
  });
  return errObj;
}
