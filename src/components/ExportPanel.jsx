import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generatePrompt } from '../utils/promptGenerator';
import { cropImageZone } from '../utils/zoneHelpers';

const ExportPanel = ({ image, zones }) => {
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

        const promptText = generatePrompt(promptLines);
        zip.file('prompt.txt', promptText);

        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, 'export_zones.zip');
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <button onClick={handleExport}>📦 Exporter les zones</button>
        </div>
    );
};

export default ExportPanel;
