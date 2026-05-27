import { join } from 'node:path';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDateString(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
}

export function getReportMonthFolderName(date) {
  return `${MONTH_NAMES[date.getMonth()]}-${date.getFullYear()}`;
}

export function getReportPath({ reportsDir, requestedDomain, queryDate, sanitizeFileName }) {
  const dateString = formatDateString(queryDate);
  const monthFolder = getReportMonthFolderName(queryDate);
  const fileName = `${sanitizeFileName(requestedDomain)}-${dateString}.json`;
  return join(reportsDir, monthFolder, fileName);
}
