import axios from 'axios';

export async function convertTextToPdf(text: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-pdf?apiKey=${import.meta.env.VITE_API_KEY}`,
      { text },
      {
        responseType: 'blob',
      }
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    return blob;
  } catch (error) {
    console.error('Error when trying get PDF:', error);
  }
}
