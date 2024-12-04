# Text to PDF

This project is a simple web application for converting text to PDF.
It was created with the following modules:
- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- Axios

Also created a custom hook `usePdfHistory` which provide mechanisms for interacting with saved files (get/save/remove). It uses the `persistPdfToHistory` and `getPdfHistory` functions from the `storage` module to make this happen.

The project includes a simple test for the `convertTextToPdf` api request function, which is responsible for converting text into a PDF blob.

For a video example of how the application works, see [this video](https://github.com/yourbunnywizard/text-to-pdf/raw/refs/heads/main/video-example.mp4).

To run the application follow these steps:
1. Run `npm install`
2. Run `npm run build`
3. Run `npm run preview`
