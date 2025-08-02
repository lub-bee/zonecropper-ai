import React from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

const DocumentLoader = ({ onImageLoad }) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (event) => {
            const result = event.target.result;

            if (file.type === 'application/pdf') {
                try {
                    const loadingTask = pdfjsLib.getDocument({ data: result });
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(1);

                    const viewport = page.getViewport({ scale: 2 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };

                    await page.render(renderContext).promise;
                    const dataUrl = canvas.toDataURL();

                    onImageLoad(dataUrl, file.name);
                } catch (err) {
                    console.error('Erreur de rendu PDF :', err);
                    alert('Erreur lors du chargement du PDF.');
                }
            } else if (file.type.startsWith('image/')) {
                const imgReader = new FileReader();
                imgReader.onload = (ev) => onImageLoad(ev.target.result);
                imgReader.readAsDataURL(file);
            } else {
                alert('Format non supporté. Veuillez sélectionner une image ou un PDF.');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="loader">
        <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
        </div>
    );
};

export default DocumentLoader;
