import { describe, expect, test } from '@jest/globals';
import { Database } from '@/database/map-store';

describe('map-store', () => {
  describe('when we request the next upload id', () => {
    const database = new Database(new Map());

    test('should get the first upload id ', () => {
      const uploadId = database.getNextUploadId;
      expect('1').toBe(uploadId);
    });

    test('should increment the upload id on the second call ', () => {
      const uploadId = database.getNextUploadId;
      expect('2').toBe(uploadId);
    });
  });

  describe('when we add the next upload', () => {
    const fileLoadMap = new Map();
    const database = new Database(fileLoadMap);

    test('should get the upload progress added to the map', () => {
      const uploadId = '1';
      database.updateUploadStatus(uploadId, 2, 1);
      const progress = fileLoadMap.get(uploadId);
      expect(progress).toBe('50%');
    });
  });

  describe('when we add the next upload', () => {
    const fileLoadMap = new Map();
    const database = new Database(fileLoadMap);

    test('should get the upload progress added to the map', () => {
      const uploadId = '1';
      database.updateUploadStatus(uploadId, 2, 1);
      const progress = fileLoadMap.get(uploadId);
      expect(progress).toBe('50%');
    });
  });

  describe('when we retrieve the status of an upload that exists', () => {
    const fileLoadMap = new Map();
    const uploadId = '1';
    fileLoadMap.set(uploadId, '75%');
    const database = new Database(fileLoadMap);

    test('should retrieve the progress', () => {
      const progress = database.getUploadProgress(uploadId);
      expect(progress).toBe('75%');
    });
  });

  describe('when we retrieve the status of an upload that doesnt exist', () => {
    const fileLoadMap = new Map();
    const uploadId = '1';
    const database = new Database(fileLoadMap);

    test('should retrieve the progress', () => {
      const progress = database.getUploadProgress(uploadId);
      expect(progress).toBeUndefined();
    });
  });
});
