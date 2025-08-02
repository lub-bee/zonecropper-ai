import React from 'react';
import { generatePrompt } from '../utils/promptGenerator';

const PromptOutput = ({ zones }) => {
    if (!zones || zones.length === 0) return null;

    const lines = zones.map((_, i) => `${i + 1}. [zone_${i + 1}.png]`);
    const promptText = generatePrompt(lines);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        alert('Translate each zone faithfully in the given order. Do not reorganize or reword.');
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Prompt</h2>
            <textarea
                readOnly
                value={promptText}
                rows={Math.max(6, zones.length + 3)}
                style={{ width: '100%', fontFamily: 'monospace', padding: '0.5rem' }}
            />
            <button onClick={handleCopy} style={{ marginTop: '0.5rem' }}>
                Copy
            </button>
        </div>
    );
};

export default PromptOutput;
