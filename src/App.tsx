import { createEffect, createMemo, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from '@solidjs/router'
import HomePage from './HomePage'
import Categories from './Categories'
import Product from './Product'
import Products from './Products'

function App() {

  return (
    <Router>
      <div class="bg-gray-300 w-full min-h-screen h-full">
        <Routes>
          <Route path="/" component={HomePage} />
          <Route path="/categories" component={Categories} />
          <Route path="/categories/:name/products">
            <Route path="/" component={Products} />
            <Route path="/:productName" component={Product} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
