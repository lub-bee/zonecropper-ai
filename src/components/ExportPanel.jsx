import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generatePrompt } from '../utils/promptGenerator';
import { cropImageZone } from '../utils/zoneHelpers';

const ExportPanel = ({ 
    image, 
    zones,
    fileName,
    customZipName,
    includePrompt,
    setIncludePrompt,
}) => {
    const handleExport = async () => {
        
        if (!image || zones.length === 0) {
            alert('Aucune zone à exporter.');
            return;
        }

        const zip = new JSZip();
        const promptLines = [];

        const imageElement = new Image();
        imageElement.src = image;

        await new Promise((res) => (imageElement.onload = res));

        for (let i = 0; i < zones.length; i++) {
            const zone = zones[i];
            const dataUrl = cropImageZone(imageElement, zone);
            const base64 = dataUrl.split(',')[1];

            const filename = `zone_${i + 1}.png`;
            zip.file(filename, base64, { base64: true });

            promptLines.push(`${i + 1}. [${filename}]`);
        }

        // Add prompt file if checked
        if (includePrompt) {
            const promptText = generatePrompt(promptLines);
            zip.file('prompt.txt', promptText);
        }

        // Generate final zip name
        const finalName = (customZipName || `${fileName}_zoneCropperAI`).replace(/\s+/g, '_');


        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, `${finalName}_zones.zip`);
    };

    return (
        <div style={{ marginTop: '1rem' }}>

            {/* ------ OPTIONS ------ */}
            <div style={{ marginBottom: '1rem' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={includePrompt}
                        onChange={(e) => setIncludePrompt(e.target.checked)}
                        style={{ marginRight: '0.5rem' }}
                    />
                    Inclure le fichier texte de consigne (prompt.txt)
                </label>
            </div>

            {/* ------ EXPORT BUTTON ------ */}
            <button onClick={handleExport}>📦 Exporter les zones</button>
        </div>
    );
};

export default ExportPanel;
