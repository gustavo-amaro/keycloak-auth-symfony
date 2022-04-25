import * as React from 'react'
import { useCallback } from 'react'

import { useKeycloak } from '@react-keycloak/web'

import { useAxios } from '../utils/hooks'

interface UserInfo {
  name: string
  email: string
}

export default () => {
  const { keycloak } = useKeycloak()

  const axiosInstance = useAxios('http://localhost:8000/api') // see https://github.com/panz3r/jwt-checker-server for a quick implementation
  const callApi = useCallback(() => {
    !!axiosInstance.current && axiosInstance.current.get('/products')
  }, [axiosInstance])

  const [userInfo, setUserInfo] = React.useState<UserInfo>()
  React.useEffect(() => {
    if (!!keycloak?.authenticated) {
      keycloak.loadUserInfo().then(() => {
        setUserInfo(keycloak?.userInfo)
        console.log(keycloak?.idToken)

        keycloak.loadUserProfile().then(() => {
          console.log(keycloak?.profile)
        })

        console.log(keycloak.hasRealmRole('symfony_client'))
      })
    }
  }, [])
  return (
    <div>
      <div>User is {!keycloak?.authenticated ? 'NOT ' : ''} authenticated</div>

      {userInfo && <p>Username: {userInfo.name}</p>}
      {!!keycloak?.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}

      <button type="button" onClick={callApi}>
        Call API
      </button>
    </div>
  )
}
