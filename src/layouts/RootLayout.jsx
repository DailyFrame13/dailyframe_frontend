import { Outlet } from "react-router-dom"
import "../assets/scss/section/common/_main.scss"

const RootLayout = () => {
  return (
    <div className="body">
      <main className="page-container">
        <Outlet/> 
      </main>
    </div>
  )
}

export default RootLayout