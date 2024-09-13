import { AxiosResponse } from 'axios';

export const formatDateHelper = (
  dateString: string,
  dateStyle: 'full' | 'long' | 'medium' | 'short'
) => {
  // Konversi tanggal ke WITA (UTC+8)
  const date = new Date(dateString);
  const utcOffset = date.getTimezoneOffset();
  const WITAOffset = 480; // WITA adalah UTC+8, offsetnya adalah 480 menit
  const adjustedDate = new Date(
    date.getTime() + (WITAOffset - utcOffset) * 60000
  );
  return adjustedDate.toLocaleString('id-ID', { dateStyle: dateStyle });
};

export const formatDateNormalHelper = (
  dateString: string,
  dateStyle: 'full' | 'long' | 'medium' | 'short'
) => {
  // Konversi tanggal ke WITA (UTC+8)
  const date = new Date(dateString);

  return date.toLocaleString('id-ID', { dateStyle: dateStyle });
};

export const formatDateRosterHelper = (
  dateString: string,
  dateStyle: 'full' | 'long' | 'medium' | 'short'
) => {
  // Konversi tanggal ke WITA (UTC+8)
  const date = new Date(dateString);
  const utcOffset = date.getTimezoneOffset();
  const WITAOffset = 480; // WITA adalah UTC+8, offsetnya adalah 480 menit
  const adjustedDate = new Date(
    date.getTime() + (utcOffset - WITAOffset) * 60000
  );
  // const adjustedDate = new Date(
  //   date.getTime() + (WITAOffset - utcOffset) * 60000
  // );
  return adjustedDate.toLocaleString('id-ID', { dateStyle: dateStyle });
};

// Fungsi untuk mendapatkan nama file dari respons headers
export const getFileNameFromResponse = (response: AxiosResponse) => {
  const contentDisposition = response.headers['content-disposition'];
  const fileNameMatch =
    contentDisposition && contentDisposition.match(/filename="(.+)"/);
  return fileNameMatch ? fileNameMatch[1] : 'file.pdf'; // Default 'file.pdf' jika tidak ditemukan nama file
};

export const capitalizeNameHelper = (name: string) => {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
};
