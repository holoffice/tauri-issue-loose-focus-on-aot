import { LogicalSize, appWindow } from "@tauri-apps/api/window"
import "./App.css";
import { createSignal } from "solid-js";

function App() {
  const [timer, setTimer] = createSignal<number | null>(null)
  let alwaysOnTop = false

  function in3sec(action: () => void) {
    setTimer(3)
    setTimeout(() => setTimer(2), 1000)
    setTimeout(() => setTimer(1), 2000)
    setTimeout(() => {
      action()
      setTimer(null)
    }, 3000)
  }

  function resize() {
    in3sec(() => {
      const size = new LogicalSize(
        (Math.random() * 50 + 200) | 0,
        (Math.random() * 50 + 300) | 0
      )
      appWindow.setSize(size)
    })
  }

  function aot() {
    in3sec(() => {
      appWindow.setAlwaysOnTop(!alwaysOnTop)
        .then(() => alwaysOnTop = !alwaysOnTop)
    })
  }

  function show() {
    in3sec(() => appWindow.show())
  }

  async function position() {
    const position = await appWindow.innerPosition()
    in3sec(() => {
      position.x += 2
      position.y += 2
      appWindow.setPosition(position)
    })
  }

  function unminimize() {
    in3sec(() => appWindow.unminimize())
  }

  return <div>
    <input placeholder="Test input" />
    <button disabled={timer() !== null} onClick={show}>Show in 3s</button>
    {/* <button disabled={timer() !== null} onClick={resize}>Resize in 3s</button>
    <button disabled={timer() !== null} onClick={aot}>Always on top in 3s</button>
    <button disabled={timer() !== null} onClick={position}>Reposition in 3s</button>
    <button disabled={timer() !== null} onClick={unminimize}>Unminimize in 3s</button> */}
    {timer() !== null ? <h1>{timer()}</h1> : undefined}
  </div>
}

export default App;
