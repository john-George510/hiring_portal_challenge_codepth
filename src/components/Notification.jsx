import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { requestForToken, onMessageListener } from '../firebase.config'

function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' })

  const notify = () => toast(notification.body);

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])

  requestForToken();

  onMessageListener()
    .then(payload => {
      console.log("payload", payload)
      const { title, body } = payload.notification
      setNotification({ title, body })
    })
    .catch(err => console.log('failed: ', err))

  return <Toaster />
}

export default Notification