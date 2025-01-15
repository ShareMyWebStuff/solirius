export class Database {
  private nextUploadId = 1;
  private readonly mapStore: Map<string, string>;

  // Default the datastore for running, a map can be passed in for testing
  constructor(mapStore: Map<string, string>) {
    this.mapStore = mapStore;
  }

  // Returns the next uploadId and increments it
  get getNextUploadId(): string {
    const uploadId = this.nextUploadId.toString();
    this.nextUploadId++;
    return uploadId;
  }

  // Private function to set the percentage complete e.g. "10%"
  private calculatePercentage(partial: number, total: number): string {
    return ((100 * partial) / total).toString() + '%';
  }

  // Maintains the store
  updateUploadStatus(uploadId: string, noRecords: number, noProcessedRecords: number): string {
    const progress = this.calculatePercentage(noProcessedRecords, noRecords);
    this.mapStore.set(uploadId, progress);
    return uploadId;
  }

  // Retrieves the progress for the uploadId.
  getUploadProgress(uploadId: string): string | undefined {
    return this.mapStore.get(uploadId);
  }
}

export const database = new Database(new Map());
