import Head from 'next/head'
import Header from '../components/home/layouts/Header'
import Hero from '../components/home/Hero'
import Testimonials from '../components/home/Testimonials'
import Pricing from '../components/home/Pricing'
import Footer from '../components/home/layouts/Footer'
import Dashboard from '@/components/dashboard/dashboard'
import HomePage from './home/page'

export default function Home() {
  return (
    <HomePage/>
  )
}