import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { EmptyLocationModel, LocationModel } from '../models'

export const useLocation = (locationName: string) => {
  const apiKey = process.env.REACT_APP_GEOLOCATION_API_KEY
  const geocodeBaseUrl = process.env.REACT_APP_GEOLOCATION_GEOCODE_BASEURL

  const [location, setLocation] = useState<LocationModel>(EmptyLocationModel)
  const handleError = (e: any) => console.error(e)

  const getLocationDetails = useCallback((position: GeolocationPosition) => {
    axios
      .get(
        `${geocodeBaseUrl}?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=locality&key=${apiKey}`,
      )
      .then((res: any) => {
        if (res.data && res.data.results[0]) {
          const formattedAddress = res.data.results[0].formatted_address.split(',')
          setLocation({
            position: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            locality: formattedAddress[0].replace(/\s/g, ''),
            country: formattedAddress[1].replace(/\s/g, ''),
          })
        }
      })
      .catch((error) => {
        handleError(error)
      })
  }, [])

  const getCoordsByLocationName = useCallback(
    (locationName: string) => {
      axios
        .get(`${geocodeBaseUrl}?address=${locationName}&key=${apiKey}`)
        .then((res: any) => {
          if (res.data && res.data.results[0]) {
            const location = res.data.results[0].geometry.location
            const formattedAddress = res.data.results[0].formatted_address.split(',')
            setLocation({
              position: {
                latitude: location.lat,
                longitude: location.lng,
              },
              locality: formattedAddress[0].replace(/\s/g, ''),
              country: formattedAddress[1].replace(/\s/g, ''),
            })
          }
        })
        .catch((error) => {
          handleError(error)
        })
    },
    [apiKey, geocodeBaseUrl],
  )

  useEffect(() => {
    if (locationName === '') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            getLocationDetails(pos)
          },
          () => {
            handleError({
              message: 'Location - Please enable access location in the browser',
            })
          },
        )
      }
    } else {
      getCoordsByLocationName(locationName)
    }
  }, [getCoordsByLocationName, getLocationDetails, locationName])

  return {
    location,
  }
}
