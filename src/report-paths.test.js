import test from 'node:test';
import assert from 'node:assert/strict';

import { formatDateString, getReportMonthFolderName, getReportPath } from './report-paths.js';

test('formatDateString returns DD-MM-YYYY', () => {
  const value = formatDateString(new Date('2026-05-27T12:00:00.000Z'));
  assert.equal(value, '27-05-2026');
});

test('getReportMonthFolderName returns Mon-YYYY', () => {
  const value = getReportMonthFolderName(new Date('2026-04-21T12:00:00.000Z'));
  assert.equal(value, 'Apr-2026');
});

test('getReportPath nests reports under the month folder', () => {
  const reportPath = getReportPath({
    reportsDir: '/tmp/backlink-reports',
    requestedDomain: 'www.example.com',
    queryDate: new Date('2026-05-27T12:00:00.000Z'),
    sanitizeFileName: (value) => value.replace(/[^a-z0-9.-]+/gi, '_')
  });

  assert.equal(reportPath, '/tmp/backlink-reports/May-2026/www.example.com-27-05-2026.json');
});
