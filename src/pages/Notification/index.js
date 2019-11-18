import React from 'react';

import { Container, ListNotification } from './styles';

export default function Notification() {
  return (
    <Container>
      <h1>Suas Notificações</h1>
      <hr />
      <ListNotification>
        <li className="read">
          <p>Professor - name corrigiu a title do módulo nameModule.</p>
          <small>18/11/2019 16:30</small>
        </li>

        <li>
          <p>Professor - name corrigiu a title do módulo nameModule.</p>
          <small>18/11/2019 16:30</small>
        </li>
      </ListNotification>
    </Container>
  );
}
