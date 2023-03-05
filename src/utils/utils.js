export function verifyType(value) {
  let response = '';
  switch (value) {
    case '':
      response = 'No type';
      break;
    default:
      response = value;
      break;
  }

  return response;
}
