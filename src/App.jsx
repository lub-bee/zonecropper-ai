import { useState } from 'react'
import './App.css'

import DocumentLoader from './components/DocumentLoader.jsx'
import CanvasEditor from './components/CanvasEditor.jsx'
import ExportPanel from './components/ExportPanel.jsx'
import ZoneList from './components/ZoneList.jsx';
import PromptOutput from './components/PromptOutput.jsx';


function App() {
    const [image, setImage] = useState(null);
    const [zones, setZones] = useState([]);

    const [fileName, setFileName] = useState('document');
    const [includePrompt, setIncludePrompt] = useState(true);
    const [customZipName, setCustomZipName] = useState('');

    const handleImageLoad = (dataUrl, name) => {
        setImage(dataUrl);
        setFileName(name?.split('.')?.[0] || 'document');
        setZones([]);
    };

    const handleDeleteZone = (index) => {
        setZones((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="app-container">
            <h1>AI-ZoneCropper</h1>
            
            <DocumentLoader onImageLoad={handleImageLoad}/>

            {image && (
                <>
                    <div style={{ margin: '1rem 0' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Nom de l’archive :</label>
                        <input
                            type="text"
                            value={customZipName}
                            onChange={(e) => setCustomZipName(e.target.value)}
                            placeholder="Nom du fichier exporté"
                            style={{ width: '100%', maxWidth: '400px', padding: '0.5rem' }}
                        />
                    </div>

                    <CanvasEditor image={image} zones={zones} setZones={setZones} />
                    <ZoneList image={image} zones={zones} onDelete={handleDeleteZone} />
                    <PromptOutput zones={zones} />
                    <ExportPanel
                        image={image}
                        zones={zones}
                        fileName={fileName}
                        customZipName={customZipName}
                        includePrompt={includePrompt}
                        setIncludePrompt={setIncludePrompt}
                        setCustomZipName={setCustomZipName}
                    />
                </>
            )}
        </div>
    )
}

export default App
