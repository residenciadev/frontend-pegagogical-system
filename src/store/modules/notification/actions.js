export function getNotificationRequest(page, limit) {
  return {
    type: '@notification/GET_NOTIFICATION_REQUEST',
    payload: { page, limit },
  };
}

export function getNotificationSuccess(data) {
  return {
    type: '@notification/GET_NOTIFICATION_SUCCESS',
    payload: { data },
  };
}

export function notificationFailure() {
  return {
    type: '@notification/NOTIFICATION_FAILURE',
  };
}
