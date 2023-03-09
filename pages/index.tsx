import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomePage from '../components/UI/homePages/homePage'

import BaseLayout from '../components/layout/baseLayout'

const Home: NextPage = () => {

  return (
    <BaseLayout>

      <HomePage />

    </BaseLayout>
  )
}

export default Home
