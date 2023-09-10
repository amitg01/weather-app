import { useState } from 'react'

import Header from '../Header'
import Loading from '../common/Loading'
import './container.scss'
import { EmptyCurrentWeather, SettingsModel } from '../../models'
import { useWeather } from '../../hooks/useWeather'

type ContainerProps = {
  settings: SettingsModel
  changeSettings: (newSettings: object) => void
}

const Container = ({ settings, changeSettings }: ContainerProps) => {
  const [currentLocationName, setCurrentLocationName] = useState<string>('')
  const [currentWeatherSelectedItem, setCurrentWeatherSelectedItem] = useState(EmptyCurrentWeather)
  const useMockData: boolean = false

  const { isLoading, location, currentWeather, hourlyWeather, dailyWeather } = useWeather(
    currentLocationName,
    settings.unit,
    useMockData,
  )

  const changeLocationHandler = (location: string) => {
    setCurrentLocationName(location)
  }
  return (
    <div className='container'>
      <Loading isLoading={false}>
        <div className='grid-container'>
          <Header
            locality={location.locality}
            country={location.country}
            data={currentWeatherSelectedItem}
            settings={settings}
            changeSettings={changeSettings}
            changeLocation={changeLocationHandler}
          />
        </div>
      </Loading>
    </div>
  )
}

export default Container
