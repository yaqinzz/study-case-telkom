import logo from './logo.svg'
import './App.css'
import VirtualAssistantChat from './pages/VirtualAssistantChat'

function App() {
  // const ada = process.env.REACT_APP_URL
  // console.log(process.env.REACT_APP_URSL)
  return (
    <div>
      <main>
        {/* {process.env.REACT_APP_PUBLIC_OPENAI_KEY} */}
        <VirtualAssistantChat />
      </main>
    </div>
  )
}

export default App
