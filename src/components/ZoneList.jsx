import React from 'react';
import { cropImageZone } from '../utils/zoneHelpers';
import { ZONE_COLORS } from '../utils/color';

const ZoneItem = ({ imageElement, zone, index, onDelete }) => {
    const preview = cropImageZone(imageElement, zone);
    const color = ZONE_COLORS[index % ZONE_COLORS.length];


    const handleCopy = () => {
        navigator.clipboard.writeText(preview);
        alert(`Zone ${index + 1} copiée (base64)`);
    };

    return (
    <div
        style={{
            border: '1px solid #ccc',
            padding: '0.5rem',
            width: 120,
            textAlign: 'center',
        }}
    >
        <div 
            style={{ 
                fontSize: '12px', 
                marginBottom: '0.25rem',
                border: '1px solid #ccc',
                padding: '0.5rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                borderLeft: `3px solid ${color}`,
                borderRight: `3px solid ${color}`,
                borderRadius: '4px',
            }}
        >
            Zone {index + 1}
        </div>
        <img
            src={preview}
            alt={`zone-${index + 1}`}
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <button onClick={() => onDelete(index)}>🗑️</button>
            <button onClick={handleCopy}>📋</button>
            <a href={preview} download={`zone_${index + 1}.png`}>
            💾
            </a>
        </div>
    </div>
    );
};

const ZoneList = ({ image, zones, onDelete }) => {
    if (!image || zones.length === 0) return null;

    const imageElement = new Image();
    imageElement.src = image;

    return (
        <div style={{ marginTop: '1rem' }}>
            <h2>Zones sélectionnées ({zones.length})</h2>

            {zones.length >= 20 ? (
                <div style={{ color: '#b55', fontSize: '0.9rem' }}>
                    ⚠️ You like to live dangerously… So be it.
                </div>
            ) : zones.length > 10 && (
                <div style={{ color: '#b55', fontSize: '0.9rem' }}>
                    ⚠️ Too many zones may reduce translation accuracy and cause mistakes the tool was made to avoid.
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {zones.map((zone, index) => (
                    <ZoneItem
                        key={index}
                        imageElement={imageElement}
                        zone={zone}
                        index={index}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ZoneList;
