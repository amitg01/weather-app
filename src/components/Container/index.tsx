import { useEffect, useState } from 'react'

import Header from '../Header'
import Loading from '../common/Loading'
import './container.scss'
import { CurrentWeatherModel, EmptyCurrentWeather, SettingsModel } from '../../models'
import { useWeather } from '../../hooks/useWeather'
import CurrentWeather from '../CurrentWeather'
import CurrentWeatherDetails from '../CurrentWeatherDetails'

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

  useEffect(() => {
    setCurrentWeatherSelectedItem(currentWeather)
  }, [currentWeather])

  const hourlyItemClickHandler = (current: CurrentWeatherModel) => {
    setCurrentWeatherSelectedItem(current)
  }

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
          <CurrentWeather settings={settings} data={currentWeatherSelectedItem} />
          <CurrentWeatherDetails data={currentWeatherSelectedItem.details} />
        </div>
      </Loading>
    </div>
  )
}

export default Container
