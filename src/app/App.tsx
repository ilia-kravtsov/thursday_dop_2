import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { useAppSelector } from '../app/store'
import { LinearLoader } from '../common/components/Loader/LinearLoader'
import { selectAppStatus } from '../app/app-selectors'
import { ReactNode } from 'react'

export const App = () => {

  const appStatus = useAppSelector(selectAppStatus)

  return (
    <div>
      <List item={['html', 'css']} renderItem={(item: string) => item.toUpperCase()}/>
      <List item={[1.123, 2.123]} renderItem={(item: number) => item.toFixed()}/>
      <List item={[{name: 'Brendan'}]} renderItem={(item) => item.name}/>
      {appStatus === 'loading' && <LinearLoader/>}
      <Decks />
      <GlobalError />
    </div>
  )
}

type ListProps<T> = {
  item: T[]
  renderItem: (item: T) => ReactNode
}

function List<T>(props: ListProps<T>) {
  return (
    <ul>
      {
        props.item.map((item,index) => (
          <li key={index}>{props.renderItem(item)}</li>
        ))
      }
    </ul>
  )
}