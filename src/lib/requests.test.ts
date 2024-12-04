import { convertTextToPdf } from '@/lib/requests';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('axios');

describe('convertTextToPdf function', () => {
  const text = 'Convert me to pdf, pls';

  beforeEach(() => {
    vi.mocked(axios.post).mockReset();
  });

  it('check if VITE_API_URL and VITE_API_KEY is set', () => {
    expect(import.meta.env.VITE_API_URL).toBeDefined();
    expect(import.meta.env.VITE_API_KEY).toBeDefined();
  });

  it('should call convert pdf query and log an error if the request fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    vi.mocked(axios.post).mockRejectedValueOnce(new Error('Request failed'));

    const result = await convertTextToPdf(text);

    expect(result).toBeUndefined();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error when trying get PDF:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('should call convert pdf query and return blob', async () => {
    const mockPdfData = new Uint8Array([]).buffer;
    const mockResponse: AxiosResponse<ArrayBuffer> = {
      data: mockPdfData,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    };

    vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);

    const result: Blob | undefined = await convertTextToPdf(text);

    expect(result).toBeInstanceOf(Blob);
    expect(result?.type).toBe('application/pdf');

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/create-pdf?apiKey=${import.meta.env.VITE_API_KEY}`,
      { text },
      { responseType: 'blob' }
    );
  });
});
