# ZoneCropper4AI – Visual Translation Assistant

**ZoneCropper4AI** is a lightweight, local-first React tool designed to help extract and export annotated zones from screenshots, diagrams, PDFs, and other visual documents. The goal is to facilitate precise, context-aware translation workflows by breaking complex visuals into clearly defined sub-images.

---

## Features

### Core

- Load images (`.png`, `.jpg`) or PDFs (first page only for now)
- Display image in a canvas with zoom-fit
- Draw custom rectangular zones with click-and-drag
- [Todo] Unique color for each zone (20+ predefined rotating colors)
- Zones are numbered and overlaid directly on the canvas
- Export zones as individual cropped images
- Generate prompt file (plain text) to guide translation

### Export

- [Todo] Live preview list of each cropped zone
- [Todo] Delete zone, download zone image, or copy to clipboard (per zone)
- Export all zones + prompt file in a single `.zip`
- [Todo] Filename customizable (default: `originalFileName_zoneCropperAI.zip`)
- [Todo] Optional: include or exclude prompt file in export

### Prompt display

- [Todo] Read-only text area displaying generated instructions
- [Todo] Button to copy the prompt to clipboard

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
├── App.jsx
├── components/
│   ├── DocumentLoader.jsx      # Loads image or PDF
│   ├── CanvasEditor.jsx        # Canvas drawing and zone logic
│   ├── ExportPanel.jsx         # Export options, ZIP generation
│   ├── PromptOutput.jsx        # Displays generated prompt
│   └── ZoneList.jsx            # Displays list of zones + actions
├── utils/
│   ├── zoneHelpers.js          # Cropping and export helpers
│   └── promptGenerator.js      # Prompt construction logic
├── styles/
│   └── main.css

```

---

## Prompt Output Example

```

Please translate each zone faithfully in the given order. Do not reorganize or reword.

1. \[zone\_1.png]
2. \[zone\_2.png]
3. \[zone\_3.png]

```

---

## Usage Flow

1. Upload an image [Todo] or a PDF file
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