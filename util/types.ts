export type PhotoDocument = {
  id: string;
  name: string;
  path: string;
  owner: string;
  ref: string;
  sharedWith: string[];
  downloadedBy: string[];
};
