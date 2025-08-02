import { useState } from 'react'
import './App.css'

import DocumentLoader from './components/DocumentLoader.jsx'
import CanvasEditor from './components/CanvasEditor.jsx'
import ExportPanel from './components/ExportPanel.jsx'

function App() {
    const [image, setImage] = useState(null);
    const [zones, setZones] = useState([]);

    return (
        <div className="app-container">
            <h1>AI-ZoneCropper</h1>
            
            <DocumentLoader onImageLoad={setImage}/>

            {image && (
                <>
                    <CanvasEditor image={image} zones={zones} setZones={setZones}/>
                    <ExportPanel image={image} zones={zones}/>
                </>
            )}
        </div>
    )
}

export default App
