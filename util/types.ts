export type PhotoDocument = {
  id: string;
  name: string;
  path: string;
  owner: string;
  sharedWith: string[];
  downloadedBy: string[];
};
