import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from '../Admin/components/AdminPanel'

function AdminRouters() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<AdminPanel/>}></Route>
        
      </Routes>
    </div>
  )
}

export default AdminRouters
