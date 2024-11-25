export type DocumentDto = {
  _id: string;
  documentKey: string;
  documentUrl: string;
  metadata: Record<string, any>;
  isDeleted?: boolean;
  isActive?: boolean;
};
