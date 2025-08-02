# ZoneCropper4AI – Visual Translation Assistant

**ZoneCropper4AI** is a lightweight, local-first React tool designed to help extract and export annotated zones from screenshots, diagrams, PDFs, and other visual documents. The goal is to facilitate precise, context-aware translation workflows by breaking complex visuals into clearly defined sub-images.

---

## Features

### Core

- Load images (`.png`, `.jpg`) or PDFs (first page only for now)
- Display image in a canvas with zoom-fit
- Draw custom rectangular zones with click-and-drag
- Unique color for each zone (20+ predefined rotating colors)
- Zones are numbered and overlaid directly on the canvas
- Export zones as individual cropped images
- Generate prompt file (plain text) to guide translation

### Export

- Live preview list of each cropped zone
- Delete zone, download zone image, or copy to clipboard (per zone)
- Export all zones + prompt file in a single `.zip`
- Filename customizable (default: `originalFileName_zoneCropperAI.zip`)
- Optional: include or exclude prompt file in export

### Prompt display

- Read-only text area displaying generated instructions
- Button to copy the prompt to clipboard

---

## Tech Stack

- React + Vite
- Native Canvas API (no Konva)
- `pdfjs-dist` for rendering PDFs
- `jszip` for `.zip` export
- `file-saver` for download support

---

## Project Structure

```
/src/
├── App.jsx                         # État global : image, zones, nom fichier
├── main.jsx                        # Point d’entrée React
│
├── components/
│   ├── CanvasEditor.jsx            # Affiche l’image et permet de dessiner les zones (canvas)
│   ├── DocumentLoader.jsx          # Upload PNG / PDF + preview 1re page
│   ├── ZoneList.jsx                # Liste des zones avec preview, delete, DL
│   ├── PromptOutput.jsx            # Affiche le prompt généré + bouton de copie
│   └── ExportPanel.jsx             # Bloc d’export ZIP avec options et nom d’archive
│
├── utils/
│   ├── colors.js                   # Palette unique de 20 couleurs pour les zones
│   ├── promptGenerator.js          # Génère le texte de consigne de traduction
│   └── zoneHelpers.js              # Crop d’image, toDataURL, etc.
│
├── styles/
│   └── main.css                    # Styles de base (optionnel ou remplacé par Tailwind)
│
└── assets/                         # (Optionnel) fichiers exemple
```

---

## Prompt Output Example

```

Translate each zone faithfully in the given order. Do not reorganize or reword.

1. \[zone\_1.png]
2. \[zone\_2.png]
3. \[zone\_3.png]

```

---

## Usage Flow

1. Upload an image
2. Draw zones over elements to be translated
3. View and manage each cropped zone in the preview panel
4. Customize export options
5. Download all zones and prompt as a ZIP

---

## Why use this?

Machine translation tools often fail to handle dense visual documents (such as diagrams, presentations, or screenshots). ZoneCropper4AI puts human control back into the process by letting you define exactly what to translate — and in what order — while still leveraging the efficiency of batch processing or AI-assisted workflows.

---

## License

This is an internal or private tool. You are free to use, adapt, or extend it for in-house or professional use. No guarantees, no tracking, no server-side processing.

---


## Changelog

### v1.0
- Select a picture (PNG/JPG)
- Click and slide to generate zones
- Automatically generate on download a cropped image of the zones and a prompt to translate it.

### v1.1
- [X] Unique color for each zone (20+ predefined rotating colors)
- [X] Live preview list of each cropped zone
- [X] Delete zone
- [X] Download zone image
- [X] Copy to clipboard (per zone)
- [X] Filename customizable (default: `originalFileName_zoneCropperAI.zip`)
- [X] Display a warning when around zone <= 15 to inform near max limit
- [X] Move the Archive Name near the Download button
- [X] Read-only text area displaying generated instructions
- [X] Optional: include or exclude prompt file in export
- [X] Button to copy the prompt to clipboard

---

## Bug Known

- Selected Zone - Copy doesn't work on Firefox / Safari
- The initial document name is not loaded in the "Archive Name"

---

## Todo

- [ ] Support PDF file (and not just the first page)
- [ ] Display a warning for Firefox / Safari users to inform that the images can't be put in clipboard
- [ ] Add the option to manually add one color for the area (for visibility purpose)
- [ ] Add the option to change manual or random color for the zones (default : random)