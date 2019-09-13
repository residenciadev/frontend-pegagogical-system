export function getQrcodeRequest(subcategoryId) {
  return {
    type: '@qrcode/GET_QRCODE_REQUEST',
    payload: { subcategoryId },
  };
}

export function getQrcodeSuccess(data) {
  return {
    type: '@qrcode/GET_QRCODE_SUCCESS',
    payload: { data },
  };
}
