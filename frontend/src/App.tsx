import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <Routes>
      {/* <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
